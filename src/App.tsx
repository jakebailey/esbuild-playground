import { javascript } from "@codemirror/lang-javascript";
import { AppShell, Group, Header, SimpleGrid, Text, useMantineColorScheme } from "@mantine/core";
import { ColorSchemeControl, GithubControl } from "@mantine/ds";
import { useDebouncedValue } from "@mantine/hooks";
import { IconArrowsJoin2 } from "@tabler/icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { Base64 } from "js-base64";
import * as lzString from "lz-string";
import { useMemo } from "react";

import { useEsbuild } from "./esbuild";
import { useHash } from "./hooks";
import { splitInput } from "./twoslash";

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

const v0Prefix = "#";
const v1Prefix = "#v1=";
const v2Prefix = "#v2=";
const v3Prefix = "#v3=";

function readHash(hash: string): string {
    try {
        if (hash.startsWith(v3Prefix)) {
            hash = hash.slice(v3Prefix.length);
            return lzString.decompressFromEncodedURIComponent(hash);
        }

        if (hash.startsWith(v2Prefix)) {
            hash = hash.slice(v2Prefix.length);
            return Base64.decode(hash);
        }

        if (hash.startsWith(v1Prefix)) {
            hash = hash.slice(v1Prefix.length);
            const v = JSON.parse(atob(hash));
            if (typeof v !== "string") throw new Error("invalid hash data");
            return v;
        }

        if (hash.startsWith(v0Prefix)) {
            hash = hash.slice(v0Prefix.length);
            return atob(hash);
        }
    } catch {
        // ignore
    }

    return initialContents;
}

function writeHash(contents: string): string {
    return v3Prefix + lzString.compressToEncodedURIComponent(contents);
}

export function App() {
    const { colorScheme } = useMantineColorScheme();

    const [hash, setHash] = useHash();
    const value = useMemo(() => readHash(hash), [hash]);

    const [debouncedValue] = useDebouncedValue(value, 200);
    const input = useMemo(() => splitInput(debouncedValue), [debouncedValue]);
    const built = useEsbuild(input);

    return (
        <AppShell
            padding={0}
            header={
                <Header height={60}>
                    <Group sx={{ height: "100%" }} px="xs" position="apart">
                        <Group spacing="xs">
                            <IconArrowsJoin2 />
                            <Text>esbuild-playground</Text>
                        </Group>
                        <Group spacing="xs">
                            <GithubControl link="https://github.com/jakebailey/esbuild-playground" />
                            <ColorSchemeControl />
                        </Group>
                    </Group>
                </Header>
            }
        >
            <SimpleGrid
                p={0}
                spacing={0}
                breakpoints={[
                    { minWidth: 800, cols: 2 },
                    { maxWidth: 800, cols: 1, spacing: "sm" },
                ]}
            >
                <CodeMirror
                    theme={colorScheme}
                    autoFocus
                    height="calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))"
                    value={value}
                    onChange={(value) => setHash(writeHash(value))}
                    extensions={[javascript({
                        jsx: true,
                        typescript: true,
                    })]}
                />
                <CodeMirror
                    theme={colorScheme}
                    readOnly
                    height="calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))"
                    value={built}
                    extensions={[javascript()]}
                />
            </SimpleGrid>
        </AppShell>
    );
}
