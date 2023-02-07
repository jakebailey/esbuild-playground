import { useWindowEvent } from "@mantine/hooks";
import { useEffect, useState } from "react";

// Like maintine's useHash but correctly sets the initial state.
export function useHash() {
    const [hash, setHashValue] = useState(window.location.hash);

    const setHash = (value: string) => {
        const valueWithHash = value.startsWith("#") ? value : `#${value}`;
        window.location.hash = valueWithHash;
        setHashValue(valueWithHash);
    };

    useWindowEvent("hashchange", () => {
        const newHash = window.location.hash;
        if (hash !== newHash) {
            setHashValue(hash);
        }
    });

    useEffect(() => {
        setHashValue(window.location.hash);
    }, []);

    return [hash, setHash] as const;
}
