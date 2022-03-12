declare module "markdown-yaml-metadata-parser" {
    function metadataParser(markdown: string): {
        metadata: { [index: string]: string };
        content: string;
    };
    export default metadataParser;
}
