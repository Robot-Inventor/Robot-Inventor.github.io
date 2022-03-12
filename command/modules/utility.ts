import { file } from "./file";
import crypto_lib from "crypto";

/**
 * HTMLのテンプレートを読み込む
 * @param file_path ファイルのパス
 * @returns 読み込んだテンプレート
 */
const get_html_template = (file_path: string) => {
    return file.read(file_path);
};

/**
 * 日時を``yyyy-mm-ddThh:mm:ss:mm``形式に変換する
 * @param date Dateオブジェクト
 */
const get_date_time_string = (date: Date) => {
    const year = String(date.getFullYear()).padStart(4, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    const millisecond = date.getMilliseconds();

    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}`;
};

/**
 * ハッシュ値を計算する
 * @param input ハッシュ化したいターゲット
 * @returns ハッシュ値
 */
const get_hash = (input: string) => {
    const sha256 = crypto_lib.createHash("sha256");
    sha256.update(input);
    return sha256.digest("hex");
};

export { get_html_template, get_date_time_string, get_hash };
