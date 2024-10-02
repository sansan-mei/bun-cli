import { execSync } from "child_process";

await Bun.build({
  target: "node",
  entrypoints: ["index.ts"],
  outdir: "dist",
});

execSync(
  `(echo #!/usr/bin/env node | cat - dist/index.js > temp) && sleep 1 && mv temp dist/index.js `,
);

console.log("Build complete");
