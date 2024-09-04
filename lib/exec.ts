import { execSync } from "child_process";
import { readFile, writeFile } from "node:fs/promises";
import inquirer from "./inquirer";

export async function handleCommand<
  T extends Awaited<ReturnType<typeof inquirer.ask>>
>(params: T) {
  execSync(`bun init -y`, { stdio: "inherit" });
  const packageJson = JSON.parse(await readFile("package.json", "utf-8"));
  packageJson.name = params.package_name;
  packageJson.scripts = {
    dev: "node --loader ts-node/esm index.ts",
  };
  await writeFile("package.json", JSON.stringify(packageJson, null, 2));
  if (params.init_git) {
    execSync(`git init`);
  }
  if (params.init_eslint) {
    execSync(`npm init @eslint/config@latest`);
  }
}
