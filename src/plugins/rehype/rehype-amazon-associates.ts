import type { Root } from "hast";
import type { Plugin, Transformer } from "unified";
import { visit } from "unist-util-visit";
import { isElement } from "hast-util-is-element";
import { h } from "hastscript";

const isValidURL = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

const rehypeAmazonAssociates: Plugin<[], Root> = () => {
    const transformer: Transformer<Root> = (tree) => {
        let affiliateLinkFound = false;

        visit(tree, "element", (node, index, parent) => {
            if (!isElement(node, "a")) return;
            if (!node.properties.href || !(typeof node.properties.href === "string")) return;
            if (!isValidURL(node.properties.href)) return;

            const isShortenAffiliateLink = node.properties.href.startsWith("https://amzn.to/");
            const isFullAffiliateLink =
                node.properties.href.startsWith("https://www.amazon.co.jp/") &&
                new URL(node.properties.href).searchParams.has("tag");

            if (!isShortenAffiliateLink && !isFullAffiliateLink) return;

            if (
                node.children.length !== 1 ||
                node.children[0].type !== "text" ||
                node.children[0].value !== node.properties.href
            )
                return;

            if (node.properties.className && Array.isArray(node.properties.className)) {
                node.properties.className.push("affiliate_link_button");
            } else {
                node.properties.className = ["affiliate_link_button"];
            }

            node.children[0].value = "Amazonで詳細を見る";

            if (affiliateLinkFound) return;

            affiliateLinkFound = true;

            const disclosure = h("aside", { className: "affiliate_link_disclosure" }, [
                "この記事の一部またはすべてのリンクを経由して商品を購入すると、当サイトの運営者が報酬を得ることがあります。",
                h("a", { href: "/affiliate-disclosure/" }, "詳細はこちら")
            ]);

            tree.children.unshift(disclosure);
        });
    };

    return transformer;
};

export default rehypeAmazonAssociates;
