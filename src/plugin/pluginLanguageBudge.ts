// https://github.com/expressive-code/expressive-code/issues/153
import { setProperty } from "@expressive-code/core";
import type { ExpressiveCodePlugin } from "astro-expressive-code";

export const pluginLanguageBadge: ExpressiveCodePlugin = () => {
    return {
        name: "Language Badge",
        baseStyles: ({ cssVar }) => `
      [data-language]::before {
        position: absolute;
        z-index: 2;
        right: calc(${cssVar("borderWidth")} + 0.3rem);
        top: calc(${cssVar("borderWidth")} + 0.3rem);
        padding: 0.1rem 0.5rem;
        box-shadow: 0 0 1px 1px ${cssVar("codeBackground")};
        content: attr(data-language);
        font-size: 0.75rem;
        text-transform: uppercase;
        color: white;
        background: ${cssVar("gutterBorderColor")};
        border-radius: 0.2rem;
        pointer-events: none;
      }
      .frame:not(.has-title):not(.is-terminal):hover[data-language]::before {
        display: none;
      }
    `,
        hooks: {
            postprocessRenderedBlock: ({ codeBlock, renderData }) => {
                setProperty(renderData.blockAst, "data-language", codeBlock.language);
            }
        }
    } satisfies ExpressiveCodePlugin;
};
