// Type definitions for anchor-markdown-header 0.7.0
// Definitions by: avery <https://github.com/4very/>

export as namespace anchorMarkdownHeader;

export = Anchor;

declare function Anchor(
  header: string,
  mode?:
    | "github.com"
    | "nodejs.org"
    | "bitbucket.org"
    | "ghost.org"
    | "gitlab.com",
  repetition?: number,
  moduleName?: string
): string;
