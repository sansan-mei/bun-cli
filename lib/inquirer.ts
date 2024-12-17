import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";

function getDefaultPackName() {
  // 读取当前目录的名字或者当前文件夹内package.json的名字
  const currentDirName = path.basename(process.cwd());
  let packageName;
  try {
    const packageJsonPath = path.join(process.cwd(), "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      packageName = packageJson.name;
    } else {
      packageName = currentDirName;
    }
  } catch {
    packageName = currentDirName;
  }

  return packageName;
}

export default {
  // 询问git账号信息
  ask: () => {
    return inquirer.prompt([
      // 第一问是当前目录创建还是新目录创建
      {
        name: "is_new_dir",
        type: "confirm",
        message: "是否新建目录创建?",
        default: false,
      },
      {
        name: "package_name",
        type: "input",
        default: getDefaultPackName(),
        message: "请输入仓库名",
        validate: function (value: string) {
          const valid =
            /^[a-zA-Z0-9._-]+$/.test(value) &&
            !/^\./.test(value) &&
            !/^-$/.test(value);
          return valid ? true : "请输入有效的仓库名";
        },
      },
      // 是否初始化git
      {
        name: "init_git",
        type: "confirm",
        message: "是否初始化git",
      },
      // 是否初始化eslint和prettier
      {
        name: "init_eslint",
        type: "confirm",
        message: "是否初始化eslint",
      },
      {
        name: "init_prettier",
        type: "confirm",
        message: "是否初始化prettier",
      },
    ]);
  },
};
