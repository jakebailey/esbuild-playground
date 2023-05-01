export function memoize<T extends {}>(fn: () => T): () => T {
    let value: T | undefined;
    return () => value ??= fn();
}

export const allExtensions = [
    ".tsx",
    ".ts",
    ".mts",
    ".cts",
    ".jsx",
    ".js",
    ".mjs",
    ".cjs",
];
