import "./App.css";

import { javascript } from "@codemirror/lang-javascript";
import { type Extension, RangeSetBuilder } from "@codemirror/state";
import { Decoration, type DecorationSet, EditorView, ViewPlugin, type ViewUpdate } from "@codemirror/view";
import * as lzString from "lz-string";
import { createMemo, createSignal } from "solid-js";

import { CodeMirrorEditor } from "./CodeMirrorEditor";
import { useEsbuild } from "./esbuild";
import { useHash } from "./hooks";
import { EsbuildIcon, GitHubIcon, MoonIcon, SunIcon } from "./icons";
import { useTheme } from "./Root";
import { filenameRegexp, splitInput } from "./twoslash";

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
            return atob(hash);
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

function createDebouncedMemo<T>(source: () => T, delay: number): () => T {
    const [debounced, setDebounced] = createSignal(source());
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Track the source reactively requires a createMemo-like approach
    // We use a simple polling pattern with createMemo + setTimeout
    const tracked = createMemo(source);

    // Watch for changes
    createMemo(() => {
        const val = tracked();
        clearTimeout(timer);
        timer = setTimeout(() => setDebounced(() => val), delay);
    });

    return debounced;
}

export function App() {
    const { colorScheme, toggleColorScheme } = useTheme();

    const [hash, setHash] = useHash();
    const value = createMemo(() => readHash(hash()));

    const debouncedValue = createDebouncedMemo(value, 200);

    const input = createMemo(() => splitInput(debouncedValue()));
    const built = useEsbuild(input);

    const onChange = (val: string) => {
        setHash(writeHash(val));
    };

    return (
        <div class="app-shell" data-theme={colorScheme()}>
            <header class="header">
                <div class="header-left">
                    <EsbuildIcon />
                    <span class="header-title">esbuild-playground</span>
                </div>
                <div class="header-right">
                    <a
                        class="icon-btn"
                        href="https://github.com/jakebailey/esbuild-playground"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <GitHubIcon />
                    </a>
                    <button
                        class="icon-btn"
                        onClick={toggleColorScheme}
                        aria-label="Toggle color scheme"
                    >
                        {colorScheme() === "dark" ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>
            </header>
            <div class="editor-grid">
                <CodeMirrorEditor
                    theme={colorScheme()}
                    autoFocus
                    value={value()}
                    onChange={onChange}
                    extensions={[
                        javascript({
                            jsx: true,
                            typescript: true,
                        }),
                        fileSeparators(),
                    ]}
                />
                <CodeMirrorEditor
                    theme={colorScheme()}
                    readOnly
                    value={built()}
                    extensions={[javascript()]}
                />
            </div>
        </div>
    );
}

const fileSeparatorTheme = EditorView.baseTheme({
    "&light .cm-fileSeparators": { "border-top": "1px dashed #6c6c6c" },
    "&dark .cm-fileSeparators": { "border-top": "1px dashed #7d8799" },
});

function fileSeparators(): Extension {
    return [
        fileSeparatorTheme,
        fileSeparatorPlugin,
    ];
}

const separatorDecoration = Decoration.line({
    attributes: { class: "cm-fileSeparators" },
});

const fileSeparatorPlugin = ViewPlugin.fromClass(
    class {
        decorations: DecorationSet;

        constructor(view: EditorView) {
            this.decorations = this.#getDecorations(view);
        }

        update(update: ViewUpdate) {
            if (update.docChanged || update.viewportChanged) {
                this.decorations = this.#getDecorations(update.view);
            }
        }

        #getDecorations(view: EditorView) {
            const builder = new RangeSetBuilder<Decoration>();
            for (const { from, to } of view.visibleRanges) {
                for (let pos = from; pos <= to;) {
                    const line = view.state.doc.lineAt(pos);
                    if (pos !== 0 && filenameRegexp.test(line.text)) {
                        builder.add(line.from, line.from, separatorDecoration);
                    }
                    pos = line.to + 1;
                }
            }
            return builder.finish();
        }
    },
    {
        decorations: (v) => v.decorations,
    },
);
