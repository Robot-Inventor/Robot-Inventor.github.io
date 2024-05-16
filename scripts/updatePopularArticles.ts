import { BetaAnalyticsDataClient } from "@google-analytics/data";
import fs from "fs";

const propertyId = "309465986";
const analyticsDataClient = new BetaAnalyticsDataClient({
    // @ts-expect-error
    credentials: JSON.parse(process.env.GA_CREDENTIALS)
});

async function getPopularArticles() {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 9);
    const currentHour = currentDate.getHours();
    const startDate = currentHour < 12 ? getPreviousDate(currentDate) : getCurrentDate(currentDate);

    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: startDate.toISOString().split("T")[0],
                endDate: "today"
            }
        ],
        dimensions: [
            {
                name: "pagePath"
            }
        ],
        metrics: [
            {
                name: "activeUsers"
            }
        ],
        orderBys: [
            {
                metric: {
                    metricName: "activeUsers"
                },
                desc: true
            }
        ],
        limit: 5
    });

    function getPreviousDate(date: Date): Date {
        const previousDate = new Date(date);
        previousDate.setDate(previousDate.getDate() - 1);
        return previousDate;
    }

    function getCurrentDate(date: Date): Date {
        return new Date(date);
    }

    if (!response.rows) {
        throw new Error("No analytics data found.");
    }

    return response.rows.map((row) => {
        // @ts-expect-error
        return row.dimensionValues[0].value?.replace(/^\/article\//, "").replace(/\/$/, "");
    });
}

const main = async () => {
    const popularArticles = await getPopularArticles();
    const jsonData = {
        articles: popularArticles
    };
    fs.writeFileSync("./src/content/featuredArticles/popularArticles.json", JSON.stringify(jsonData, null, 4));
};

main();
