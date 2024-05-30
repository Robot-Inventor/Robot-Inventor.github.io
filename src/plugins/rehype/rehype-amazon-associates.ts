import type { ElementContent, Text, Root } from "hast";
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

const isTextNode = (node: ElementContent): node is Text => {
    return !!node && typeof node === "object" && "type" in node && node.type === "text";
};

const rehypeAmazonAssociates: Plugin<[], Root> = () => {
    const transformer: Transformer<Root> = (tree) => {
        let affiliateLinkFound = false;

        visit(tree, "element", (node, _, parent) => {
            if (!isElement(node, "a")) return;
            if (!node.properties.href || !(typeof node.properties.href === "string")) return;
            if (!isValidURL(node.properties.href)) return;
            if (node.children.length !== 1 || !isTextNode(node.children[0])) return;

            const isShortenAffiliateLink = node.properties.href.startsWith("https://amzn.to/");
            const isFullAffiliateLink =
                node.properties.href.startsWith("https://www.amazon.co.jp/") &&
                new URL(node.properties.href).searchParams.has("tag");

            if (!isShortenAffiliateLink && !isFullAffiliateLink) return;

            const isBareLink = node.children[0].value === node.properties.href;
            const isOnlyChildInParagraphElement = isElement(parent, "p") && parent.children.length === 1;

            if (!isBareLink && !isOnlyChildInParagraphElement) return;

            if (node.properties.className && Array.isArray(node.properties.className)) {
                node.properties.className.push("affiliate_link_button");
            } else {
                node.properties.className = ["affiliate_link_button"];
            }

            if (isBareLink) {
                node.children[0].value = "Amazonで詳細を見る";
            }

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
