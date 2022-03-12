import readline from "readline";
import { file } from "./modules/file";
import { get_date_time_string } from "./modules/utility";

const console_color = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    default: "\x1b[0m",
} as const;

const question = (question: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};

const ask_information = async (): Promise<{
    "article-title": string;
    link: string;
    description: string;
    thumbnail: string;
}> => {
    const title = await question(`
--------------------

title: `);
    const link = await question("link: ");
    const description = await question("description: ");
    const thumbnail = await question("thumbnail: ");

    let confirmed = "";
    const confirm_message = `
--------------------

    title: ${title}
    link: ${link}
    description: ${description}
    thumbnail: ${thumbnail}

    Are you sure you want to register this article? (y/n)`;
    while (!confirmed) {
        const answer = await question(confirm_message);
        if (["y", "n"].includes(answer)) {
            confirmed = answer;
        }
    }

    if (confirmed === "y") {
        return {
            link,
            thumbnail,
            "article-title": title,
            description,
        };
    } else {
        return ask_information();
    }
};

const main = async () => {
    const info = await ask_information();
    const time = get_date_time_string(new Date());

    const article_data = JSON.parse(file.read("./article/article_data.json"));

    const already_registered = Object.keys(article_data)
        .map((key) => article_data[key])
        .map((data) => data.link)
        .includes(info.link);

    if (already_registered)
        throw new Error("This article is already registered.");

    if (time in article_data)
        throw new Error("Could not register article. Try again later.");

    article_data[time] = info;

    file.write(
        "./article/article_data.json",
        JSON.stringify(article_data, null, 4)
    );

    console.log(
        `\n${console_color.green}Article registered.${console_color.default}`
    );
};

main().catch((err) => {
    console.log("");
    console.error(`${console_color.red}${err.message}${console_color.default}`);
    process.exit(1);
});
