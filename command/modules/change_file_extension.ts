import path from "path";

/**
 * ファイルのパスを拡張子以外の部分と拡張子に分割する
 * @param string ファイルのパス
 * @returns 1つ目の要素を拡張子を除いたファイルのパス、2つ目の要素を拡張子とした配列
 */
function split_extension(string: string) {
    const parsed_path = path.parse(string);
    const extension = parsed_path.ext;
    const file_name =
        parsed_path.dir === ""
            ? parsed_path.name
            : `${parsed_path.dir}/${parsed_path.name}`;
    return [file_name, extension];
}

/**
 * ファイル名の拡張子を.mdから.htmlに変更する
 * @param markdown_name 変更元のファイル名
 * @return 拡張子を.mdから.htmlに変更したあとのファイル名
 */
const change_file_extension = (markdown_name: string) => {
    const input_file_name_and_extension = split_extension(markdown_name);
    const html_name =
        input_file_name_and_extension[1] === ".md"
            ? input_file_name_and_extension[0] + ".html"
            : markdown_name + ".html";
    return html_name;
};

export { change_file_extension };
