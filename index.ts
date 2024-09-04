import { handleCommand } from "./lib/exec";
import inquirer from "./lib/inquirer";
import "./lib/test";

const run = async () => {
  const credentials = await inquirer.ask();
  handleCommand(credentials);
};

run();
