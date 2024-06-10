const checkEnvironmentType = () => {
    if (!process.env.CF_PAGES_BRANCH) {
        return "local";
    }

    return ["master", "main"].includes(process.env.CF_PAGES_BRANCH) ? "production" : "test";
};

export { checkEnvironmentType };
