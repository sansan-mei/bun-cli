import { execSync } from "child_process";
import { readFile, writeFile } from "node:fs/promises";
import stripJsonComments from "strip-json-comments";
import files from "./files";
import type inquirer from "./inquirer";

const eslintPath = "eslint.config.js";
const prettierPath = ".prettierrc.json";
export async function handleCommand<
  T extends Awaited<ReturnType<typeof inquirer.ask>>,
>(params: T) {
  execSync("bun init -y", { stdio: "inherit" });
  execSync("bun i -D ts-node", { stdio: "inherit" });

  if (!files.directoryExists("bunfig.toml")) {
    await writeFile("bunfig.toml", files.getBunConfigJson());
  }
  // 判断一下有没有src目录，没有就创建
  if (!files.directoryExists("src")) {
    execSync("mkdir src");
  }

  const packageJson = JSON.parse(await readFile("package.json", "utf-8"));
  packageJson.name = params.package_name;
  packageJson.scripts = {
    ...packageJson.scripts,
    dev: "node --loader ts-node/esm index.ts",
  };
  packageJson.imports = {
    ...packageJson.imports,
    "#*": "./*",
  };
  const tsConfigJson = JSON.parse(
    stripJsonComments(await readFile("tsconfig.json", "utf-8")),
  );
  tsConfigJson.compilerOptions = {
    ...tsConfigJson.compilerOptions,
    baseUrl: ".",
    paths: {
      "#src/*": ["./src/*"],
    },
  };
  await writeFile("package.json", JSON.stringify(packageJson, null, 2));
  if (params.init_git) {
    execSync("git init");
  }
  if (params.init_eslint && params.init_prettier) {
    await writeFile(prettierPath, files.getPrettierJson());
    await writeFile(eslintPath, files.getEslintAndPrettierJson());
    await execSync(
      "bun i -D typescript-eslint@8 globals@15 eslint@9 @eslint/js@9 eslint-config-prettier@9 eslint-plugin-prettier@5",
      {
        stdio: "inherit",
      },
    );
  } else if (params.init_eslint) {
    await writeFile(eslintPath, files.getEslintJson());
    await execSync(
      "bun i -D typescript-eslint@8 globals@15 eslint@9 @eslint/js@9",
      {
        stdio: "inherit",
      },
    );
  } else if (params.init_prettier) {
    await writeFile(prettierPath, files.getPrettierJson());
    await execSync(
      "bun i -D eslint-config-prettier@9 eslint-plugin-prettier@5",
      {
        stdio: "inherit",
      },
    );
  }
}
