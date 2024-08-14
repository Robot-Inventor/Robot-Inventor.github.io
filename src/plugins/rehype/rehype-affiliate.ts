import type { ElementContent, Text, Root } from "hast";
import type { Plugin, Transformer } from "unified";
import { visit } from "unist-util-visit";
import { isElement } from "hast-util-is-element";
import { h } from "hastscript";
import type { MdxJsxAttribute, MdxJsxExpressionAttribute } from "mdast-util-mdx-jsx";

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

const isMdxJsxHrefAttribute = (
    attribute: MdxJsxAttribute | MdxJsxExpressionAttribute
): attribute is MdxJsxAttribute => {
    return attribute.type === "mdxJsxAttribute" && attribute.name === "href";
};

const rehypeAmazonAssociates: Plugin<[], Root> = () => {
    const addAffiliateLinkDisclosure = (tree: Root) => {
        const disclosure = h("aside", { className: "affiliate_link_disclosure" }, [
            "※この記事の一部またはすべてのリンクを経由して商品を購入すると、当サイトの運営者が報酬を得ることがあります。",
            h("a", { href: "/affiliate-disclosure/" }, "詳細はこちら")
        ]);

        tree.children.unshift(disclosure);
    };

    const transformer: Transformer<Root> = (tree) => {
        let affiliateLinkFound = false;

        visit(tree, "element", (node, _, parent) => {
            if (!isElement(node, "a")) return;
            if (!node.properties.href || !(typeof node.properties.href === "string")) return;
            if (!isValidURL(node.properties.href)) return;
            if (node.children.length !== 1 || !isTextNode(node.children[0])) return;

            const isShortenAmazonAffiliateLink = node.properties.href.startsWith("https://amzn.to/");
            const isFullAmazonAffiliateLink =
                node.properties.href.startsWith("https://www.amazon.co.jp/") &&
                new URL(node.properties.href).searchParams.has("tag");
            const isLinkShareAffiliateLink = node.properties.href.startsWith("https://linksynergy.jrs5.com/");

            if (!isShortenAmazonAffiliateLink && !isFullAmazonAffiliateLink && !isLinkShareAffiliateLink) return;

            if (!affiliateLinkFound) {
                affiliateLinkFound = true;
                addAffiliateLinkDisclosure(tree);
            }

            const isBareLink = node.children[0].value === node.properties.href;
            const isOnlyChildInParagraphElement = isElement(parent, "p") && parent.children.length === 1;
            const isOnlyLinkAndImage = parent?.children.length === 2 && isElement(node.children[1], "img");

            if (!isBareLink && !(isOnlyChildInParagraphElement || isOnlyLinkAndImage)) return;

            if (node.properties.className && Array.isArray(node.properties.className)) {
                node.properties.className.push("affiliate_link_button");
            } else {
                node.properties.className = ["affiliate_link_button"];
            }

            if (isBareLink) {
                const isAmazonLink = isShortenAmazonAffiliateLink || isFullAmazonAffiliateLink;
                node.children[0].value = isAmazonLink ? "Amazonで詳細を見る" : "詳細を見る";
            }
        });

        visit(tree, "mdxJsxFlowElement", (node, index, parent) => {
            if (node.name !== "a") return;
            if (!node.attributes.length) return;

            const hrefAttribute: MdxJsxAttribute | undefined = node.attributes.filter(isMdxJsxHrefAttribute)[0];
            if (!hrefAttribute || typeof hrefAttribute.value !== "string") return;

            const isLinkShareAffiliateLink = hrefAttribute.value.startsWith("https://linksynergy.jrs5.com/");
            if (!isLinkShareAffiliateLink) return;

            if (!affiliateLinkFound) {
                affiliateLinkFound = true;
                addAffiliateLinkDisclosure(tree);
            }

            const buttonClass: MdxJsxAttribute = {
                type: "mdxJsxAttribute",
                name: "className",
                value: "affiliate_link_button"
            };

            node.attributes.push(buttonClass);
        });
    };

    return transformer;
};

export default rehypeAmazonAssociates;
