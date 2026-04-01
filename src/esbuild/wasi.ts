import { memoize } from "../helpers";
import WASIWorker from "./wasiWorker?worker";
import type { WorkerRequest, WorkerResponse } from "./workerProtocol";

const getWorker = memoize(() => {
    const worker = new WASIWorker();
    const pending = new Map<number, { resolve: (v: string) => void; reject: (e: Error) => void; }>();
    let nextId = 0;

    worker.addEventListener("message", (e: MessageEvent<WorkerResponse>) => {
        const { id, result, error } = e.data;
        const p = pending.get(id);
        if (!p) return;
        pending.delete(id);
        if (error !== undefined) {
            p.reject(new Error(error));
        } else {
            p.resolve(result ?? "");
        }
    });

    return (files: Map<string, string>, entrypoint: string): Promise<string> => {
        const id = nextId++;
        return new Promise((resolve, reject) => {
            pending.set(id, { resolve, reject });
            worker.postMessage({ id, files, entrypoint } satisfies WorkerRequest);
        });
    };
});

export async function runEsbuildWasi(
    files: Map<string, string>,
    entrypoint: string,
): Promise<string> {
    return getWorker()(files, entrypoint);
}
