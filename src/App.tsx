import { javascript } from "@codemirror/lang-javascript";
import { Container, SimpleGrid, useMantineTheme } from "@mantine/core";
import { useDebouncedValue, useHash } from "@mantine/hooks";
import CodeMirror from "@uiw/react-codemirror";
import { useMemo } from "react";

import { useEsbuild } from "./esbuild";

const initialContents = `
// @filename: config.json
{
  "entryPoints": ["/index.tsx"],
  "format": "esm"
}

// @filename: index.tsx
import { add } from "./adder";
import logToFile from "./logToFile";

export function App() {
  return (<p>Hello, world! {add(1, 2)}</p>);
}

export function log() {
  logToFile("woo")
}

// @filename: adder.ts
export function add(a: number, b: number) {
  return a + b;
}

// @filename: logToFile.js
const fs = require("fs");

module.exports = (message) => {
  fs.appendFileSync("/log.txt", message);
}
`.trim();

export function App() {
    const theme = useMantineTheme();

    const [hash, setHash] = useHash();
    const value = useMemo(() => {
        if (hash.startsWith("#")) {
            try {
                return atob(hash.slice(1));
            } catch {
                // ignore
            }
        }
        return initialContents;
    }, [hash]);

    const [debouncedValue] = useDebouncedValue(value, 200);
    const built = useEsbuild(debouncedValue);

    return (
        <Container fluid p={0}>
            <SimpleGrid
                cols={2}
                p={0}
                spacing={0}
                breakpoints={[
                    { minWidth: 800, cols: 2 },
                    { maxWidth: 800, cols: 1, spacing: "sm" },
                ]}
            >
                <CodeMirror
                    theme={theme.colorScheme}
                    autoFocus
                    height="100vh"
                    value={value}
                    onChange={(value) => setHash("#" + btoa(value))}
                    extensions={[javascript({
                        jsx: true,
                        typescript: true,
                    })]}
                />
                <CodeMirror
                    theme={theme.colorScheme}
                    readOnly
                    height="100vh"
                    value={built}
                    extensions={[javascript()]}
                />
            </SimpleGrid>
        </Container>
    );
}
