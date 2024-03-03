import { visitParents } from "unist-util-visit-parents";

export interface RemarkAutoAdsOptions {
    adCode: string;
    countFrom?: number;
    paragraphInterval?: number;
}

type RemarkAutoAdsFullOptions = Required<RemarkAutoAdsOptions>;

export const remarkAutoAds = (args: RemarkAutoAdsOptions) => {
    const defaultOptions = {
        countFrom: 0,
        paragraphInterval: 5
    };

    const options: RemarkAutoAdsFullOptions = {
        ...defaultOptions,
        ...args
    };

    const transform = (tree) => {
        let paragraphCount = options.countFrom || 0;

        visitParents(tree, "paragraph", (node, ancestors) => {
            if (node.type === "paragraph") {
                paragraphCount++;
            }

            const skipNode = ancestors.some((ancestor) => {
                return ["blockquote", "list"].includes(ancestor.type) || ancestor.data?.hName === "aside";
            });

            if (skipNode) {
                return tree;
            }

            if (paragraphCount >= options.paragraphInterval) {
                paragraphCount = 0;

                const adNode = {
                    type: "html",
                    value: options.adCode
                };

                if (ancestors.length === 0) {
                    return node;
                }

                const parent = ancestors[ancestors.length - 1];
                const index = parent.children.indexOf(node);

                if (index >= 0) {
                    parent.children.splice(index + 1, 0, adNode);
                }
            }

            return node;
        });
    };

    return transform;
};
