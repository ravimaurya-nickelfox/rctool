#! /usr/bin/env node
const CLI = require("clui")
const { runSync, run } = require("node-cmd")
const SpnrStyle = require("../lib/constants")
const chalk = require("chalk")
const nmoji = require("node-emoji")

const Spinner = CLI.Spinner

module.exports = {
  initGit: (params) => {
    return new Promise((resolve) => {
      const spnr = new Spinner(
        chalk.magenta("Setting up git"),
        SpnrStyle.spinnerStyle1
      )
      spnr.start()
      const commandSetOne = `cd ${params.projectname} && git branch -M ${params.gitMainBranch} && git remote add origin ${params.gitOrigin}`
      runSync(commandSetOne)
      for (let i = 0; i < params.gitBranches.length; i++) {
        runSync(
          `cd ${params.projectname} && git checkout -b ${params.gitBranches[i]}`
        )
      }
      spnr.stop()
      let i = 10
      for (j = 0; j <= 10; j++) {
        console.log(j, i)
      }
      console.log(
        chalk.greenBright(
          `${nmoji.get("white_check_mark")} Git repository setup done!!`
        )
      )
      console.log(
        chalk.magenta(
          `${nmoji.get("tada")} Your project is ready, just run cd ${
            params.projectname
          } to get started!!`
        )
      )
      resolve(true)
    })
  }
}
