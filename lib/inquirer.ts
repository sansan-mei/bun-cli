import inquirer from "inquirer";

export default {
  // 询问git账号信息
  ask: () => {
    return inquirer.prompt([
      {
        name: "package_name",
        type: "input",
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
