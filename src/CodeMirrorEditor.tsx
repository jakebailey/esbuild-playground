import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { bracketMatching, foldGutter, indentOnInput } from "@codemirror/language";
import { type Extension } from "@codemirror/state";
import { Compartment, EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import {
    EditorView,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars,
    keymap,
    lineNumbers,
} from "@codemirror/view";
import { createEffect, on, onCleanup, onMount } from "solid-js";

const themeCompartment = new Compartment();
const readOnlyCompartment = new Compartment();

function getThemeExtension(theme: "light" | "dark"): Extension {
    return theme === "dark" ? oneDark : [];
}

interface CodeMirrorEditorProps {
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    theme?: "light" | "dark";
    extensions?: Extension[];
    autoFocus?: boolean;
}

export function CodeMirrorEditor(props: CodeMirrorEditorProps) {
    let containerRef: HTMLDivElement | undefined;
    let view: EditorView | undefined;

    onMount(() => {
        const updateListener = EditorView.updateListener.of((update) => {
            if (update.docChanged && props.onChange) {
                props.onChange(update.state.doc.toString());
            }
        });

        const startState = EditorState.create({
            doc: props.value,
            extensions: [
                lineNumbers(),
                highlightActiveLineGutter(),
                highlightSpecialChars(),
                history(),
                foldGutter(),
                indentOnInput(),
                bracketMatching(),
                highlightActiveLine(),
                keymap.of([
                    ...defaultKeymap,
                    ...historyKeymap,
                ]),
                themeCompartment.of(getThemeExtension(props.theme ?? "light")),
                readOnlyCompartment.of(EditorState.readOnly.of(props.readOnly ?? false)),
                ...(props.extensions ?? []),
                updateListener,
            ],
        });

        view = new EditorView({
            state: startState,
            parent: containerRef,
        });

        if (props.autoFocus) {
            view.focus();
        }
    });

    // Sync value changes from outside
    createEffect(on(() => props.value, (newValue) => {
        if (!view) return;
        const current = view.state.doc.toString();
        if (newValue !== current) {
            view.dispatch({
                changes: { from: 0, to: current.length, insert: newValue },
            });
        }
    }, { defer: true }));

    // Sync theme changes
    createEffect(on(() => props.theme, (theme) => {
        if (!view) return;
        view.dispatch({
            effects: themeCompartment.reconfigure(getThemeExtension(theme ?? "light")),
        });
    }, { defer: true }));

    onCleanup(() => {
        view?.destroy();
    });

    return <div ref={el => containerRef = el} class="cm-editor-wrapper" />;
}

export { javascript } from "@codemirror/lang-javascript";
export { syntaxHighlighting } from "@codemirror/language";
