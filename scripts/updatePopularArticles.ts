import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { google } from "@google-analytics/data/build/protos/protos";
import fs from "fs";
import { checkEnvironmentType } from "../src/utils/checkEnvironmentType";

const getPreviousDate = (date: Date): Date => {
    const previousDate = new Date(date);
    previousDate.setUTCDate(previousDate.getUTCDate() - 1);
    return previousDate;
};

const getCurrentDate = (date: Date): Date => {
    return new Date(date);
};

const normalize = (values: number[]) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    return values.map((value) => (value - min) / (max - min));
};

const getReport = async (
    analyticsDataClient: BetaAnalyticsDataClient,
    propertyId: string,
    dateRange: google.analytics.data.v1beta.IDateRange
): Promise<google.analytics.data.v1beta.IRunReportResponse> => {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [dateRange],
        dimensions: [
            {
                name: "pagePath"
            }
        ],
        metrics: [
            {
                name: "screenPageViews"
            }
        ],
        orderBys: [
            {
                metric: {
                    metricName: "screenPageViews"
                },
                desc: true
            }
        ],
        limit: 300
    });

    return response;
};

const compareReports = (
    previousReport: google.analytics.data.v1beta.IRunReportResponse,
    latestReport: google.analytics.data.v1beta.IRunReportResponse
): string[] => {
    const previousRows = previousReport.rows || [];
    const latestRows = latestReport.rows || [];

    const previousData: { [key: string]: number } = {};
    const latestData: { [key: string]: number } = {};

    for (const row of previousRows) {
        if (!row.dimensionValues || !row.metricValues) continue;

        const path = row.dimensionValues[0].value;
        if (typeof path !== "string" || !path.startsWith("/article/")) continue;

        const cleanedSlug = path.replace(/^\/article\//, "").replace(/\/$/, "");
        // 記事一覧ページを除外
        if (!cleanedSlug) continue;
        const views = parseInt(row.metricValues[0].value || "0", 10);
        previousData[cleanedSlug] = views;
    }

    for (const row of latestRows) {
        if (!row.dimensionValues || !row.metricValues) continue;

        const path = row.dimensionValues[0].value;
        if (typeof path !== "string" || !path.startsWith("/article/")) continue;

        const cleanedSlug = path.replace(/^\/article\//, "").replace(/\/$/, "");
        // 記事一覧ページを除外
        if (!cleanedSlug) continue;
        const views = parseInt(row.metricValues[0].value || "0", 10);
        latestData[cleanedSlug] = views;
    }

    const scoredArticles: { path: string; score: number }[] = [];
    const increases: number[] = [];
    const increaseRates: number[] = [];
    const previousViewsArray: number[] = [];
    const latestViewsArray: number[] = [];

    for (const path in latestData) {
        const latestViews = latestData[path];
        const previousViews = previousData[path] || 0;

        previousViewsArray.push(previousViews);
        latestViewsArray.push(latestViews);
    }

    const normalizedPreviousViews = normalize(previousViewsArray);
    const normalizedLatestViews = normalize(latestViewsArray);

    for (let i = 0; i < normalizedLatestViews.length; i++) {
        const previousView = normalizedPreviousViews[i];
        const latestView = normalizedLatestViews[i];
        const increase = latestView - previousView;
        const increaseRate = previousView > 0 ? (increase / previousView) * 100 : 100;

        increases.push(increase);
        increaseRates.push(increaseRate);
    }

    const normalizedIncreases = normalize(increases);
    const normalizedIncreaseRates = normalize(increaseRates);

    let index = 0;
    for (const path in latestData) {
        const normalizedIncrease = normalizedIncreases[index];
        const normalizedIncreaseRate = normalizedIncreaseRates[index];
        const normalizedPreviousView = normalizedPreviousViews[index];
        const normalizedLatestView = normalizedLatestViews[index];
        index++;

        let weightIncrease = 0.1;
        let weightRate = 0.5;
        let weightPreviousView = 0.3;
        let weightLatestView = 0.1;

        if (normalizedPreviousView < 0.25) {
            weightIncrease = 0.3;
            weightRate = 0.1;
            weightPreviousView = 0.1;
            weightLatestView = 0.5;
        } else if (normalizedPreviousView < 0.75) {
            weightIncrease = 0.3;
            weightRate = 0.3;
            weightPreviousView = 0.2;
            weightLatestView = 0.2;
        } else {
            weightIncrease = 0.1;
            weightRate = 0.3;
            weightPreviousView = 0.3;
            weightLatestView = 0.3;
        }

        const score =
            normalizedIncrease * weightIncrease +
            normalizedIncreaseRate * weightRate +
            normalizedPreviousView * weightPreviousView +
            normalizedLatestView * weightLatestView;

        scoredArticles.push({ path, score });
    }

    scoredArticles.sort((a, b) => b.score - a.score);

    const trendingArticles = scoredArticles.slice(0, 5).map((article) => article.path);

    return trendingArticles;
};

const getTrendingArticles = async () => {
    const propertyId = "309465986";
    const analyticsDataClient = new BetaAnalyticsDataClient({
        // @ts-expect-error
        credentials: JSON.parse(process.env.GA_CREDENTIALS)
    });

    // UTC+9のタイムゾーンオフセット
    const timeZoneOffset = 9 * 60;
    const currentDate = new Date();
    const japanCurrentDate = new Date(currentDate.getTime() + timeZoneOffset * 60000);

    const currentHour = japanCurrentDate.getUTCHours();

    // 日本時間で15時より前なら前日のデータ、15時以降なら当日のデータを取得する
    const thresholdHour = 15;

    const startDateLatest =
        currentHour < thresholdHour ? getPreviousDate(japanCurrentDate) : getCurrentDate(japanCurrentDate);

    const startDatePrevious = getPreviousDate(startDateLatest);

    const dateRanges: google.analytics.data.v1beta.IDateRange[] = [
        {
            name: "last24Hours",
            // `Date.toISOString()`は常にUTC時刻を返すが、
            // UTC時刻自体を日本時間に合わせてずらしているので日本時間の日付を取得できる。
            // Google Analytics APIの`dateRanges`はレポートの時刻ロケール（日本時間）を指定する必要がある。
            startDate: startDateLatest.toISOString().split("T")[0],
            endDate: startDateLatest.toISOString().split("T")[0]
        },
        {
            name: "previous24Hours",
            startDate: startDatePrevious.toISOString().split("T")[0],
            endDate: startDatePrevious.toISOString().split("T")[0]
        }
    ] as const;

    const latestPeriodReport = await getReport(analyticsDataClient, propertyId, dateRanges[0]);
    const previousPeriodReport = await getReport(analyticsDataClient, propertyId, dateRanges[1]);

    const trendingArticles = compareReports(previousPeriodReport, latestPeriodReport);

    return trendingArticles;
};

const main = async () => {
    const environmentType = checkEnvironmentType();
    console.log(`[INFO] Start updating popular articles. Environment type: ${environmentType}.`);

    /**
     * 本番環境以外では実行しない。
     * Cloudflareのテスト環境でも実行しない。
     * テスト環境で実行しないのは、Google AnalyticsのAPIキーを窃取するPull Requestが送られてきた場合の対策。
     */
    if (environmentType !== "production") {
        console.log("[INFO] Skip updating popular articles.");
        return;
    }

    const popularArticles = await getTrendingArticles();
    const jsonData = {
        articles: popularArticles
    };
    fs.writeFileSync("./src/content/featuredArticles/popularArticles.json", JSON.stringify(jsonData, null, 4));
    console.log("[INFO] Finish updating popular articles.");
};

await main();
