import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

let dev=true;

esbuild
  .build({
    entryPoints: ["./src/main.js"],
    mainFields: ["svelte", "browser", "module", "main"],
    target:["es2020","safari12","chrome71"],
    bundle: true,
    minify:true,
    sourcemap:true,
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