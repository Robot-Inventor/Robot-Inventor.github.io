import fs from "fs";

const SHELL_SESSION_SYNTAX_URL =
    "https://raw.githubusercontent.com/Robot-Inventor/shell-session-syntax/main/syntaxes/shell-session.tmLanguage.json";
const REGEX_SYNTAX_URL =
    "https://raw.githubusercontent.com/Robot-Inventor/regex-syntax/main/syntaxes/regex.tmLanguage.json";

const SHELL_SESSION_PATH = "./src/syntaxes/shell-session.tmLanguage.json";
const REGEX_PATH = "./src/syntaxes/regex.tmLanguage.json";

const fetchText = async (url: string) => {
    const response = await fetch(url);
    return await response.text();
};

const main = async () => {
    console.log("Updating grammars...");
    console.log("Fetching shell-session syntax...");
    const shellSessionSyntax = await fetchText(SHELL_SESSION_SYNTAX_URL);
    console.log("Fetching regex syntax...");
    const regexSyntax = await fetchText(REGEX_SYNTAX_URL);

    await fs.writeFileSync(SHELL_SESSION_PATH, shellSessionSyntax);
    await fs.writeFileSync(REGEX_PATH, regexSyntax);

    console.log("Grammars updated!");
};

main();
