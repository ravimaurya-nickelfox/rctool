#!/usr/bin/env node

// Created by Ravi K 20/01/2021

const chalk = require("chalk")
const clear = require("clear")
const figlet = require("figlet")
const ConfigStore = require("configstore")
const SysCheck = require("./lib/sys_check")

const Constants = require("./lib/constants")
const config = new ConfigStore("rctool")
const UserInputParser = require("./lib/commandParser")

clear();

console.log(
  chalk.magentaBright(
    figlet.textSync("RCTool", { horizontalLayout: "full" })
  )
);

console.log(
  chalk.magenta("Welcome to React Tool . A quicker way to start your react app!")
);

SysCheck.system_check()
  .then(() => {
    run();
  })

const run = async () => {
  await UserInputParser()
}