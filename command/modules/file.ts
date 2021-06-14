const fs = require("fs");

module.exports = {
    /**
     * 指定したテキストファイルを読み込む
     * @param file_path ファイルのパス
     * @param encoding ファイルのエンコーディング。デフォルトは"utf8"
     * @returns ファイルの内容
     */
    read: function (file_path: string, encoding = "utf8") {
        try {
            const buffer: string = fs.readFileSync(file_path, encoding);
            return buffer;
        }
        catch (e) {
            throw `${file_path}を読み込めませんでした。`;
        }
    },

    /**
     * ファイルにテキストを書き込む
     * @param file_path ファイルのパス
     * @param content 書き込む内容
     */
    write: function (file_path: string, content: string) {
        fs.writeFile(file_path, content, (err: string) => {
            if (err) throw err;
        });
    }
};
