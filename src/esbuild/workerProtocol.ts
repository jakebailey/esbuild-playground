export interface WorkerRequest {
    id: number;
    files: Map<string, string>;
    entrypoint: string;
}

export interface WorkerResponse {
    id: number;
    result?: string;
    error?: string;
}
