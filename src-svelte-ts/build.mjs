import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

let dev=false;

esbuild
  .build({
    entryPoints: ["./src/main.js"],
    mainFields: ["svelte", "browser", "module", "main"],
    target:["es2020","safari12","chrome71"],
    bundle: true,
    minify:!dev,
    sourcemap:dev,
    outfile:"../wap/scripts/mit-budget-svelte-ts.js",
    plugins: [
      esbuildSvelte({
        preprocess: sveltePreprocess(),
        compilerOptions: {
          dev: dev         
        }
      }),
    ],
  })
  .catch(() => process.exit(1));