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
    latestReport: google.analytics.data.v1beta.IRunReportResponse,
    latestReportWeight: number
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
        const views = parseInt(row.metricValues[0].value || "0", 10) * latestReportWeight;
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
        const increase = latestViews - previousViews;
        const increaseRate = previousViews > 0 ? (increase / previousViews) * 100 : 100;

        increases.push(increase);
        increaseRates.push(increaseRate);
        previousViewsArray.push(previousViews);
        latestViewsArray.push(latestViews);
    }

    const normalizedIncreases = normalize(increases);
    const normalizedIncreaseRates = normalize(increaseRates);
    const normalizedPreviousViews = normalize(previousViewsArray);
    const normalizedLatestViews = normalize(latestViewsArray);

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
            weightIncrease = 0.5;
            weightRate = 0.1;
            weightPreviousView = 0.1;
            weightLatestView = 0.3;
        } else if (normalizedPreviousView < 0.75) {
            weightIncrease = 0.3;
            weightRate = 0.3;
            weightPreviousView = 0.2;
            weightLatestView = 0.2;
        } else {
            weightIncrease = 0.1;
            weightRate = 0.5;
            weightPreviousView = 0.3;
            weightLatestView = 0.1;
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

    const timeZoneOffset = 9;
    const currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() + timeZoneOffset);
    const currentHour = currentDate.getUTCHours();

    // 日本時間で15時より前なら前日のデータ、15時以降なら当日のデータを取得する
    const thresholdHour = 15;

    const startDateLatest =
        currentHour < thresholdHour ? getPreviousDate(currentDate) : getCurrentDate(currentDate);

    const latestReportWeight =
        currentHour < thresholdHour
            ? 1
            : 2 - (currentHour - thresholdHour) / (24 - thresholdHour);

    const startDatePrevious = getPreviousDate(startDateLatest);

    const dateRanges: google.analytics.data.v1beta.IDateRange[] = [
        {
            name: "last24Hours",
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

    const trendingArticles = compareReports(previousPeriodReport, latestPeriodReport, latestReportWeight);

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
