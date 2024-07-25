import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import unzipper from "unzipper";
import { checkEnvironmentType } from "../src/utils/checkEnvironmentType";

const CACHE_FLAG_FILE = "cache_restored.flag";

// AWS S3クライアントを初期化
const s3Client = new S3Client({
    endpoint: process.env.R2_ENDPOINT_URL,
    region: "auto",
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string
    }
});

// S3バケット名
const bucketName = process.env.R2_BUCKET_NAME as string;

// ファイルをダウンロードする関数
const downloadFile = async (key: string, downloadPath: string) => {
    const params = {
        Bucket: bucketName,
        Key: key
    };

    const startTime = Date.now();

    try {
        const data = await s3Client.send(new GetObjectCommand(params));
        const bodyContents = await streamToBuffer(data.Body);
        fs.writeFileSync(downloadPath, bodyContents);
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log(`[astro-cache-downloader] File downloaded successfully. ${key} in ${duration} seconds`);
    } catch (err) {
        console.error(`[astro-cache-downloader] Error downloading file: ${key}`, err);
    }
};

// ReadableStream を Buffer に変換する関数
const streamToBuffer = async (stream: any): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });
};

// ZIPファイルを展開する関数
const unzipFile = async (zipFilePath: string, extractTo: string) => {
    try {
        const startTime = Date.now();
        await fs
            .createReadStream(zipFilePath)
            .pipe(unzipper.Extract({ path: extractTo }))
            .promise();
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log(`[astro-cache-downloader] ZIP file extracted: ${zipFilePath} in ${duration} seconds`);
        fs.unlinkSync(zipFilePath); // ZIPファイルを削除
    } catch (err) {
        console.error(`[astro-cache-downloader] Error extracting ZIP file: ${zipFilePath}`, err);
    }
};

// S3バケット内の既存ファイルをリストアップする関数
const listS3Objects = async () => {
    const params = {
        Bucket: bucketName
    };

    const data = await s3Client.send(new ListObjectsV2Command(params));
    return data.Contents ? data.Contents.map((item) => item.Key) : [];
};

// メイン関数
const restoreDirectoryFromS3 = async (dir: string) => {
    if (fs.existsSync(dir) && fs.readdirSync(dir).length > 0) {
        console.log(`[astro-cache-downloader] Cache directory exists and is not empty. Skipping restore.`);
        return;
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(CACHE_FLAG_FILE, "");

    const s3Files = await listS3Objects();
    const downloadPromises: Promise<void>[] = [];

    for (const s3File of s3Files) {
        if (!s3File) continue;

        const downloadPath = path.join(dir, s3File);
        const downloadDir = path.dirname(downloadPath);

        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }

        downloadPromises.push(downloadFile(s3File, downloadPath));
    }

    await Promise.all(downloadPromises);

    // ZIPファイルを展開
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (filePath.endsWith(".zip")) {
            const extractTo = path.join(dir, path.basename(file, ".zip"));
            await unzipFile(filePath, extractTo);
        }
    }

    console.log(`[astro-cache-downloader] Restore completed.`);
};

const targetEnvironments: ReturnType<typeof checkEnvironmentType>[] = ["production", "test"] as const;
if (targetEnvironments.includes(checkEnvironmentType())) {
    // 実行
    restoreDirectoryFromS3("node_modules/.astro");
} else {
    console.log(`[astro-cache-downloader] Skipped. Environment is not ${targetEnvironments.join(" or ")}.`);
}
