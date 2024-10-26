import { useWindowEvent } from "@mantine/hooks";
import { useCallback, useState } from "react";

export function useHash() {
    const [hash, setHashValue] = useState(window.location.hash);

    const hashChangeHandler = useCallback(() => {
        setHashValue(window.location.hash);
    }, []);

    useWindowEvent("hashchange", hashChangeHandler);

    const setHash = useCallback((value: string) => {
        if (value !== hash) {
            window.location.hash = value;
        }
    }, [hash]);

    return [hash, setHash] as const;
}
