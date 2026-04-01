import { createSignal, onCleanup } from "solid-js";

export function useHash() {
    const [hash, setHashValue] = createSignal(globalThis.location.hash);

    const hashChangeHandler = () => {
        setHashValue(globalThis.location.hash);
    };

    globalThis.addEventListener("hashchange", hashChangeHandler);
    onCleanup(() => {
        globalThis.removeEventListener("hashchange", hashChangeHandler);
    });

    const setHash = (value: string) => {
        if (value !== hash()) {
            globalThis.location.hash = value;
        }
    };

    return [hash, setHash] as const;
}
