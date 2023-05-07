import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);
export const repoRoot = path.resolve(__dirname, "..");

const esbuildPackageJson = await fs.promises.readFile(
    path.resolve(repoRoot, "node_modules", "esbuild", "package.json"),
    { encoding: "utf8" },
);

export const { version: ESBUILD_VERSION } = JSON.parse(esbuildPackageJson);
