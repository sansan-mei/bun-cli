import fs from "node:fs";
import path from "node:path";

export default {
  // 获取目录名称
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  // 判断目录是否存在
  directoryExists: (filePath: string) => {
    return fs.existsSync(filePath);
  },
  getEslintJson: () => {
    return `
import pluginJs from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
];

    `;
  },
  getPrettierJson: () => {
    return `
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
    `;
  },
  getEslintAndPrettierJson: () => {
    return `
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
    `;
  },
  getBunConfigJson: () => {
    return `
[install]
registry = "https://registry.npmmirror.com/"
    `;
  },
};
