import path from "node:path";

import { execa } from "execa";
import tmp from "tmp";

import { ESBUILD_VERSION, repoRoot } from "./helpers";

const packageName = "github.com/evanw/esbuild/cmd/esbuild";

tmp.setGracefulCleanup();
const tmpdir = tmp.fileSync();

await execa("go", ["run", "golang.org/dl/gotip@latest", "download"]);
await execa("go", ["mod", "init", "github.com/jakebailey/esbuild-playground"], { cwd: tmpdir.name });
await execa("go", ["get", `${packageName}@v${ESBUILD_VERSION}`], { cwd: tmpdir.name });
await execa("go", [
    "run",
    "golang.org/dl/gotip@latest",
    "build",
    "-o",
    path.resolve(repoRoot, "src", "esbuild", "esbuild-wasi.wasm"),
    packageName,
], { cwd: tmpdir.name, env: { GOOS: "wasip1", GOARCH: "wasm" } });
