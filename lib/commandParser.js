#! /usr/bin/env node
const chalk = require("chalk")
const minimist = require("minimist")
const nmoji = require("node-emoji")
const pcJson = require("../package.json")
const StepOne = require("../lib/init")
const Executor = require("../lib/actionExecutor")

const CommandParser = async () => {
  const args = minimist(process.argv)
  args._.splice(0, 2)
  const argsList = args._

  console.log("args", argsList)
  console.log("args main", args)
  console.log("keys ", Object.keys(args))

  const paramKeys = Object.keys(args)
  const params = paramKeys[1]

  if (paramKeys.length > 1) {
    switch (params) {
      case "v":
      case "version":
        console.log(
          chalk.greenBright(`${nmoji.get("gear")}  rctool version ${pcJson.version}`)
        );
        break;

      case "h":
      case "help":
        console.log(
          chalk.greenBright(`${nmoji.get("headphones")} we are preparing help doc ${nmoji.get("blush")}`)
        );
        break;

      case "o":
      case "option":
        console.log(
          chalk.greenBright(`${nmoji.get("clock3")} we are working on options`)
        );
        break;

      default:
        console.log(
          chalk.red(`${nmoji.get("construction")} please enter a valid argument`)
        );
        break;
    }
  } else if (argsList.length === 0) {
    console.log(
      chalk.redBright(`${nmoji.get("bug")} Error: insufficient argument supplied!`)
    );
    return
  } else if (argsList[0] === "init") {
    const answers = await StepOne.askQuestions()
    switch (answers.projectPlatform) {
      case "React.JS":
        Executor.initBare(answers)
        break;
    }

  } else {
    console.log(
      chalk.yellowBright(`${nmoji.get("warning")}  Warning: Unknown parameter!`)
    );
  }
}

module.exports = CommandParser