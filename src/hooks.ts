import { useWindowEvent } from "@mantine/hooks";
import { useCallback, useState } from "react";

export function useHash() {
    const [hash, setHashValue] = useState(globalThis.location.hash);

    const hashChangeHandler = useCallback(() => {
        setHashValue(globalThis.location.hash);
    }, []);

    useWindowEvent("hashchange", hashChangeHandler);

    const setHash = useCallback((value: string) => {
        if (value !== hash) {
            globalThis.location.hash = value;
        }
    }, [hash]);

    return [hash, setHash] as const;
}
