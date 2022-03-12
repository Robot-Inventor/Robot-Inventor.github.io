/**
 * テンプレートの文字列中の指定されたものを変数で置き換えする
 * @param template テンプレートの文字列
 * @param template_values テンプレートの文字列をこの変数で指定されたものに置き換える。キーで指定されたものを対応する値に置き換える
 * @returns 置き換え済みの文字列
 * @example
 * const template = "${target} World!";
 * const values = {target: "Hello"};
 * console.log(insert_template(template, values););
 * // Hello World!
 */
const insert_template = (template: string, template_values: object) => {
    const keys = Object.keys(template_values) as Array<
        keyof typeof template_values
    >;

    for (const key of keys) {
        const template_regex = new RegExp("\\$\\{" + key + "\\}", "g");
        template = template.replace(template_regex, template_values[key]);
    }

    return template;
};

export { insert_template };
