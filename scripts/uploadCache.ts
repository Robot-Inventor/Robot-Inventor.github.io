import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import archiver from "archiver";
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

// ファイルをアップロードする関数
const uploadFile = async (filePath: string): Promise<void> => {
    const fileContent = fs.readFileSync(filePath);
    const relativePath = path.relative("node_modules/.astro", filePath);

    const params = {
        Bucket: bucketName,
        Key: relativePath,
        Body: fileContent
    };

    const startTime = Date.now();

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log(`[astro-cache-uploader] File uploaded successfully. ${relativePath} in ${duration} seconds`);
    } catch (err) {
        console.error(`[astro-cache-uploader] Error uploading file: ${relativePath}`, err);
    }
};

const zipAndUploadDirectory = async (dirPath: string): Promise<void> => {
    console.log(`[astro-cache-uploader] Start zipping directory: ${dirPath}`);
    const zipFilePath = `${dirPath}.zip`;
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 0 } });

    const startTime = Date.now();

    return new Promise<void>((resolve, reject) => {
        output.on("close", async () => {
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000;
            console.log(
                `[astro-cache-uploader] ZIP file created: ${zipFilePath} (${archive.pointer()} total bytes in ${duration} seconds)`
            );

            try {
                await uploadFile(zipFilePath);
                fs.unlinkSync(zipFilePath); // ZIPファイルを削除
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        archive.on("error", (err) => {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(dirPath, false);
        archive.finalize();
    });
};

// S3バケット内の既存ファイルをリストアップする関数
const listS3Objects = async (): Promise<string[]> => {
    const params = {
        Bucket: bucketName
    };

    const data = await s3Client.send(new ListObjectsV2Command(params));
    return data.Contents ? data.Contents.map((item) => item.Key).filter((key) => typeof key === "string") : [];
};

// S3からファイルを削除する関数
const deleteS3Object = async (key: string) => {
    const params = {
        Bucket: bucketName,
        Key: key
    };

    const startTime = Date.now();

    try {
        await s3Client.send(new DeleteObjectCommand(params));
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log(`[astro-cache-uploader] File deleted successfully. ${key} in ${duration} seconds`);
    } catch (err) {
        console.error(`Error deleting file: ${key}`, err);
    }
};

// メイン関数
const syncDirectoryWithS3 = async (dir) => {
    const startTime = Date.now();

    const localFiles: string[] = [];
    const files = fs.readdirSync(dir);
    const uploadPromises: Promise<void>[] = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const zipFilePath = `${filePath}.zip`;
            localFiles.push(path.relative("node_modules/.astro", zipFilePath));
            uploadPromises.push(zipAndUploadDirectory(filePath));
        } else if (!filePath.endsWith(".zip")) {
            localFiles.push(path.relative("node_modules/.astro", filePath));
            uploadPromises.push(uploadFile(filePath));
        }
    }

    await Promise.all(uploadPromises);

    const s3Files = await listS3Objects();
    const deletePromises = s3Files
        .filter((s3File) => s3File && !localFiles.includes(s3File))
        .map((s3File) => deleteS3Object(s3File));

    await Promise.all(deletePromises);

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log(`[astro-cache-uploader] Cache sync completed in ${duration} seconds`);
};

if (checkEnvironmentType() == "production") {
    if (fs.existsSync(CACHE_FLAG_FILE)) {
        console.log("[astro-cache-uploader] Restored cache found. Start uploading cache.");
        // 実行
        syncDirectoryWithS3("node_modules/.astro");
    } else {
        console.log("[astro-cache-uploader] No restored cache found. Skipping upload.");
    }
} else {
    console.log(`[astro-cache-uploader] Skipped. Environment is not production.`);
}
