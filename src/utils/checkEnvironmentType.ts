import { getSecret } from "astro:env/server";

const checkEnvironmentType = () => {
    if (!process.env.CF_PAGES_BRANCH) {
        return "local";
    }

    return ["master", "main"].includes(getSecret("CF_PAGES_BRANCH")) ? "production" : "test";
};

export { checkEnvironmentType };
