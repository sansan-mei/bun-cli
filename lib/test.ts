import { execSync } from "child_process";

function checkInstallation(command: string) {
  try {
    execSync(`${command} -v`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

const isBunInstalled = checkInstallation("bun");
const isPnpmInstalled = checkInstallation("pnpm");
const isGitInstalled = checkInstallation("git");

// 有任何一个没安装都抛错
if (!isBunInstalled) {
  throw new Error("bun is not installed");
}
if (!isPnpmInstalled) {
  throw new Error("pnpm is not installed");
}
if (!isGitInstalled) {
  throw new Error("git is not installed");
}
