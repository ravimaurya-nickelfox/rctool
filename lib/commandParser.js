#! /usr/bin/env node
const chalk = require("chalk")
const minimist = require("minimist")
const nmoji = require("node-emoji")
const pcJson = require("../package.json")
const StepOne = require("../lib/init")
const Executor = require("../lib/actionExecutor")
const { parseAppName } = require("./util")

const CommandParser = async () => {
  const args = minimist(process.argv)
  args._.splice(0, 2)
  const argsList = args._
  const paramKeys = Object.keys(args)
  const params = paramKeys[1]

  if (paramKeys.length > 1) {
    switch (params) {
      case "v":
      case "version":
        console.log(
          chalk.greenBright(
            `${nmoji.get("gear")}  rctool version ${pcJson.version}`
          )
        )
        break

      case "h":
      case "help":
        console.log(
          chalk.greenBright(
            `${nmoji.get("headphones")} we are preparing help doc ${nmoji.get(
              "blush"
            )}`
          )
        )
        break

      case "o":
      case "option":
        console.log(
          chalk.greenBright(`${nmoji.get("clock3")} we are working on options`)
        )
        break

      default:
        console.log(
          chalk.red(
            `${nmoji.get("construction")} please enter a valid argument`
          )
        )
        break
    }
  } else if (argsList.length === 0) {
    console.log(
      chalk.redBright(
        `${nmoji.get("bug")} Error: insufficient argument supplied!`
      )
    )
    return
  } else if (argsList[0] === "init") {
    const projectName = parseAppName(argsList[1]) ?? "awesome_app"
    const answers = await StepOne.askQuestions(projectName)
    answers.projectname = parseAppName(answers.projectname)
    switch (answers.projectPlatform) {
      case "React.JS":
        if (answers.uiframework === "Raw Project") {
          Executor.initBare(answers)
        } else if (answers.uiframework === "Material-UI") {
          Executor.initReactMaterial(answers)
        } else if (answers.uiframework === "Bootstrap") {
          Executor.initBare(answers)
        }
        break
    }
  } else {
    console.log(
      chalk.yellowBright(`${nmoji.get("warning")}  Warning: Unknown parameter!`)
    )
  }
}

module.exports = CommandParser
