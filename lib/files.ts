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
  // 获取editorconfig
  getEditorConfig: () => {
    return `
# EditorConfig is awesome: https://editorconfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
    `;
  },
};
