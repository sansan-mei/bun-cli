import { execSync } from "child_process";
import { readFile, writeFile } from "node:fs/promises";
import stripJsonComments from "strip-json-comments";
import type { CompilerOptions } from "typescript";
import files from "./files";
import type inquirer from "./inquirer";

const eslintPath = "eslint.config.js";
const prettierPath = ".prettierrc.json";

interface TsConfigJson {
  compilerOptions?: CompilerOptions;
  include?: string[];
  exclude?: string[];
  references?: Array<{ path: string }>;
  extends?: string;
  [key: string]:
    | string
    | string[]
    | CompilerOptions
    | Array<{ path: string }>
    | undefined;
}

export async function handleCommand<
  T extends Awaited<ReturnType<typeof inquirer.ask>>,
>(params: T) {
  if (params.is_new_dir) {
    execSync(`mkdir ${params.package_name}`);
    process.chdir(params.package_name);
  }

  if (!files.directoryExists("bunfig.toml")) {
    await writeFile("bunfig.toml", files.getBunConfigJson());
  }
  // 判断一下有没有.editorconfig文件，没有就创建
  if (!files.directoryExists(".editorconfig")) {
    await writeFile(".editorconfig", files.getEditorConfig());
  }

  execSync("bun init -y", { stdio: "inherit" });
  execSync("bun i -D ts-node", { stdio: "inherit" });
  // 判断一下有没有src目录，没有就创建
  if (!files.directoryExists("src")) {
    execSync("mkdir src");
  }

  const packageJson = JSON.parse(await readFile("package.json", "utf-8"));
  packageJson.name = params.package_name;
  packageJson.scripts = {
    ...packageJson.scripts,
    dev: "bun run index.ts",
    build: "bun build index.ts --target=bun --outfile=dist/index.js",
    "dev:node": "node --loader ts-node/esm index.ts",
  };
  packageJson.imports = {
    ...packageJson.imports,
    "#*": "./*",
  };
  const tsConfigJson: TsConfigJson = JSON.parse(
    stripJsonComments(await readFile("tsconfig.json", "utf-8")),
  );
  const types = tsConfigJson.compilerOptions?.types;
  tsConfigJson.compilerOptions = {
    ...tsConfigJson.compilerOptions,
    baseUrl: ".",
    paths: {
      "#src/*": ["./src/*"],
    },
    types: [...(types ?? []), "global.d.ts"],
  };
  await writeFile("global.d.ts", files.getDefaultDts());

  await writeFile("package.json", JSON.stringify(packageJson, null, 2));

  await writeFile("tsconfig.json", JSON.stringify(tsConfigJson, null, 2));

  if (!files.directoryExists(".editorconfig")) {
    await writeFile(".editorconfig", files.getEditorConfig());
  }

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
