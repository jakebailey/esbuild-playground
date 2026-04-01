import { type Accessor, createEffect, createSignal } from "solid-js";

import { runEsbuildWasi } from "./esbuild/wasi";
import type { SplitInput } from "./twoslash";

export function useEsbuild(input: Accessor<SplitInput>): Accessor<string> {
    const [built, setBuilt] = createSignal("// loading...");

    createEffect(() => {
        const current = input();
        void runEsbuildWasi(current.files, current.entrypoint).then(setBuilt);
    });

    return built;
}
