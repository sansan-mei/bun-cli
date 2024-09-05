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
  "printWidth": 80, // 行宽
  "tabWidth": 2, // Tab宽度
  "useTabs": false, // 是否使用制表符
  "semi": true, // 是否使用分号
  "singleQuote": true, // 使用单引号
  "trailingComma": "all", // 尾随逗号
  "bracketSpacing": true, // 对象花括号之间是否有空格
  "jsxBracketSameLine": false // JSX标签闭合花括号是否在同一行
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
};
