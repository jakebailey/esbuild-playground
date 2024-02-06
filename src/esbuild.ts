import { useEffect, useState } from "react";

import { runEsbuildWasi } from "./esbuild/wasi";
import { SplitInput } from "./twoslash";

export function useEsbuild(input: SplitInput): string {
    const [built, setBuilt] = useState("// loading...");

    useEffect(() => {
        void runEsbuild(input, setBuilt);
    }, [input]);

    return built;
}

async function runEsbuild(input: SplitInput, setBuilt: (built: string) => void) {
    const out = await runEsbuildWasi(input.files, input.entrypoint);
    setBuilt(out);
}
