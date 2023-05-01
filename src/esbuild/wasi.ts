import { memoize } from "../helpers";

const getWorker = memoize(() =>
    new ComlinkWorker<typeof import("./wasiWorker")>(new URL("wasiWorker", import.meta.url))
);

export async function runEsbuildWasi(
    files: Map<string, string>,
    entrypoint: string,
): Promise<string> {
    const worker = getWorker();
    return worker.runEsbuildWasi(files, entrypoint);
}
