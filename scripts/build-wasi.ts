import path from "node:path";

import { execa, Options } from "execa";
import tmp from "tmp";

import { ESBUILD_VERSION, repoRoot } from "./helpers";

const tmpdir = tmp.dirSync({ postfix: "esbuild-wasi", unsafeCleanup: true });

try {
    const { stdout } = await execa("gotip", ["env", "GOROOT"]);
    // eslint-disable-next-line no-restricted-globals
    process.env.PATH = `${path.resolve(stdout, "bin")}${path.delimiter}${process.env.PATH}`;
} catch {
    // No gotip, assume Go in environment is new enough.
}

await execa("go", ["version"], { stdio: "inherit" });

const packageName = "github.com/evanw/esbuild/cmd/esbuild";
const versionedPackageName = `${packageName}@v${ESBUILD_VERSION}`;
const outFile = path.resolve(repoRoot, "src", "esbuild", "esbuild-wasi.wasm");

const execaOptions: Options = { stdio: "inherit", cwd: tmpdir.name };

await execa("go", ["mod", "init", "some.tld/temp"], execaOptions);
await execa("go", ["get", versionedPackageName], execaOptions);
await execa("go", ["build", "-o", outFile, packageName], { ...execaOptions, env: { GOOS: "wasip1", GOARCH: "wasm" } });

tmpdir.removeCallback();
