import fs from "fs";

class file {
    constructor() {}

    /**
     * 指定したテキストファイルを読み込む
     * @param file_path ファイルのパス
     * @param encoding ファイルのエンコーディング。デフォルトは"utf8"
     * @returns ファイルの内容
     */
    static read(file_path: string) {
        try {
            const buffer: string = fs.readFileSync(file_path, "utf-8");
            return buffer;
        } catch (e) {
            throw `${file_path}を読み込めませんでした。`;
        }
    }

    /**
     * ファイルにテキストを書き込む
     * @param file_path ファイルのパス
     * @param content 書き込む内容
     */
    static write(file_path: string, content: string) {
        fs.writeFile(file_path, content, (err) => {
            if (err) throw err;
        });
    }
}

export { file };
