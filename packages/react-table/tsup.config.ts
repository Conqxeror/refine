import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

export default defineConfig({
    entry: ["src/index.ts"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [
        NodeResolvePlugin({
            extensions: [".js", "ts", "tsx", "jsx"],
            onResolved: (resolved) => {
                if (resolved.includes("node_modules")) {
                    return {
                        external: true,
                    };
                }
                return resolved;
            },
        }),
    ],
    esbuildOptions(options) {
        options.keepNames = true;
        options.banner = {
            js: '"use client"',
        };
    },
    onSuccess: "tsc --project tsconfig.declarations.json",
});
