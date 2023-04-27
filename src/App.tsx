import { javascript } from "@codemirror/lang-javascript";
import { ActionIcon, Container, Group, SimpleGrid, Text, useMantineColorScheme } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { version } from "esbuild-wasm/package.json";
import { Base64 } from "js-base64";
import * as lzString from "lz-string";
import { useMemo } from "react";

import { useEsbuild } from "./esbuild";
import { useHash } from "./hooks";

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
            return atob(hash.slice(1));
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
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const [hash, setHash] = useHash();

    const value = useMemo(() => readHash(hash), [hash]);

    const [debouncedValue] = useDebouncedValue(value, 200);
    const built = useEsbuild(debouncedValue);

    return (
        <>
            <div style={{ position: "absolute", top: 0, right: 0, margin: "1rem", zIndex: 1 }}>
                <Group>
                    <Text component="a" href="https://esbuild.github.io/" target="_blank">
                        esbuild v{version}
                    </Text>
                    <ActionIcon
                        variant="outline"
                        onClick={() => toggleColorScheme()}
                        size="lg"
                        sx={(theme) => ({
                            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                            color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
                        })}
                    >
                        {colorScheme === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                    </ActionIcon>
                </Group>
            </div>
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
                        theme={colorScheme}
                        autoFocus
                        height="100vh"
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
                        height="100vh"
                        value={built}
                        extensions={[javascript()]}
                    />
                </SimpleGrid>
            </Container>
        </>
    );
}
