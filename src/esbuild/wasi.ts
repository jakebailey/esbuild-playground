import * as Comlink from "comlink";

import { memoize } from "../helpers";
import type { WASIWorkerExposed } from "./wasiWorker";
import WASIWorker from "./wasiWorker?worker";

const getWorker = memoize(() => Comlink.wrap<WASIWorkerExposed>(new WASIWorker()));

export async function runEsbuildWasi(
    files: Map<string, string>,
    entrypoint: string,
): Promise<string> {
    const worker = getWorker();
    return worker.runEsbuildWasi(files, entrypoint);
}
