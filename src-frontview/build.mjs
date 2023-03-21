import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['./app.ts'],
  bundle: true,
  minify:true,
  outfile: '../wap/scripts/mit-budget-frontview.js',
  target:["es2020","safari12","chrome71"]
}).catch(() => process.exit(1))


