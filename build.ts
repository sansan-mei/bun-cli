import { execSync } from "child_process";
import * as OS from "node:os";

await Bun.build({
  target: "node",
  entrypoints: ["index.ts"],
  outdir: "dist",
});

let command = "";
if (OS.platform() === "win32") {
  command = `echo #!/usr/bin/env node | cat - dist/index.js > temp && sleep 1 && mv temp dist/index.js `;
} else {
  command = `sed -i '1s;^;#!/usr/bin/env node\n;' dist/index.js`;
}

execSync(command);

console.log("Build complete");
