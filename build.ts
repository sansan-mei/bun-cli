import { execSync } from "child_process";

await Bun.build({
  target: "node",
  entrypoints: ["index.ts"],
  outdir: "dist",
});

execSync(
  `sleep 2 && echo #!/usr/bin/env node | cat - dist/index.js > temp && mv temp dist/index.js`,
);
