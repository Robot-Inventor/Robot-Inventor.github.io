import { visitParents } from "unist-util-visit-parents";

export interface RemarkAutoAdOptions {
    adCode: string;
    countFrom?: number;
}

export const remarkAutoAd = (options: RemarkAutoAdOptions) => {
    return transform;

    function transform(tree) {
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

            if (paragraphCount >= 5) {
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
    }
};
