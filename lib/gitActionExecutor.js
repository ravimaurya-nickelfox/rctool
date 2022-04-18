#! /usr/bin/env node
const CLI = require("clui")
const { run, runSync } = require("node-cmd")
const SpnrStyle = require("../lib/constants")
const chalk = require("chalk")
const nmoji = require("node-emoji")

const Spinner = CLI.Spinner

module.exports = {
  initGit: (params) => {
    const spnr = new Spinner(
      chalk.magenta("Setting up git"),
      SpnrStyle.spinnerStyle1
    )
    spnr.start()
    run(`cd ${params.projectname}`, function (e, d) {
      runSync("git init")
      runSync("git add --all")
      runSync('git commit -m "first commit"')
      runSync(`git branch -M main`)
      runSync(`git remote add origin ${params.gitOrigin}`)
      for (let i = 1; i < params.gitBranches.length; i++) {
        runSync(`git checkout -b ${params.gitBranches[i]}`)
      }
      chalk.greenBright(
        `${nmoji.get("white_check_mark")} Git repository setup done!!`
      )
      spnr.stop()
    })
  }
}
