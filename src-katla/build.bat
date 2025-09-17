@echo off
REM --bundle --minify

esbuild.exe app.ts --outfile=..\website\wwwroot\scripts\mit-budget-katla.js --target=safari15,chrome117,safari117,es2022 --minify --bundle
