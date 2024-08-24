import { checkEnvironmentType } from "src/utils/checkEnvironmentType";

const deploymentNotifier = async () => {
    const githubRepositoryURL = "https://github.com/Robot-Inventor/Robot-Inventor.github.io";
    const targetEnvironments: ReturnType<typeof checkEnvironmentType>[] = ["production", "test"] as const;
    if (!targetEnvironments.includes(checkEnvironmentType())) {
        console.log("[deployment-notifier] Deployment notifier is disabled for this environment.");
        return;
    }

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookURL) {
        console.error("[deployment-notifier] Discord webhook URL is not set.");
        return;
    }

    const branchName = process.env.CF_PAGES_BRANCH;
    const branchURL = branchName
        ? `[${branchName}](${githubRepositoryURL}/tree/${branchName})`
        : "ブランチ名を取得できなかったみたい";
    const commitHash = process.env.CF_PAGES_COMMIT_SHA;
    const commitURL = commitHash
        ? `[${commitHash}](${githubRepositoryURL}/commit/${commitHash})`
        : "コミットハッシュを取得できなかったみたい";
    const deploymentURL = process.env.CF_PAGES_URL ?? "デプロイURLを取得できなかったみたい";

    const date = new Date();
    const jst = date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

    const success = branchName && commitHash && process.env.CF_PAGES_URL;

    const embedsContent = [
        {
            title: success ? "デプロイ成功" : "デプロイ失敗",
            color: success ? 0x00ff00 : 0xff0000,
            fields: [
                {
                    name: "ブランチ",
                    value: branchURL,
                    inline: true
                },
                {
                    name: "コミット",
                    value: commitURL,
                    inline: true
                },
                {
                    name: "デプロイURL",
                    value: deploymentURL,
                    inline: false
                },
                {
                    name: "タイムスタンプ",
                    value: jst,
                    inline: false
                }
            ]
        }
    ] as const;

    const contentSuccess = {
        content: `
先生～、ブログのデプロイが完了したよ。あとで確認してね
            `.trim(),
        embeds: embedsContent
    } as const;

    const contentFailure = {
        content: `
先生、ごめん。何かに失敗しちゃったみたい。確認してもらえると嬉しいな
            `.trim(),
        embeds: embedsContent
    } as const;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(success ? contentSuccess : contentFailure)
    } as const;

    try {
        const response = await fetch(webhookURL, options);
        if (response.ok) {
            console.log("[deployment-notifier] Webhook sent successfully.");
        } else {
            console.error("[deployment-notifier] Failed to send webhook.", response.statusText);
        }
    } catch (err) {
        console.error("[deployment-notifier] Error sending webhook.", err);
    }
};

deploymentNotifier();
