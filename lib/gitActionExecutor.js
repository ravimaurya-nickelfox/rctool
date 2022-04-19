#! /usr/bin/env node
const CLI = require("clui")
const { runSync } = require("node-cmd")
const SpnrStyle = require("../lib/constants")
const chalk = require("chalk")
const nmoji = require("node-emoji")
const fs = require("fs")

const Spinner = CLI.Spinner

module.exports = {
  initGit: (params) => {
    const spnr = new Spinner(
      chalk.magenta("Setting up git"),
      SpnrStyle.spinnerStyle1
    )
    spnr.start()
    const gitDir = `./${params.projectname}/.git`
    const isGitExists = fs.existsSync(gitDir)
    const initGit = isGitExists ? "git add --all" : "git init && git add --all"
    const commandSetOne = `cd ${params.projectname} && ${initGit} && git commit -m "first commit" && git branch -M ${params.gitMainBranch} && git remote add origin ${params.gitOrigin} && git push -f -u origin ${params.gitMainBranch}`
    runSync(commandSetOne)
    for (let i = 0; i < params.gitBranches.length; i++) {
      runSync(
        `cd ${params.projectname} && git checkout -b ${params.gitBranches[i]}`
      )
    }
    spnr.stop()
    chalk.greenBright(
      `${nmoji.get("white_check_mark")} Git repository setup done!!`
    )
    chalk.magenta(
      `${nmoji.get("tada")} Your project is ready, just run cd ${
        params.projectname
      } to get started!!`
    )
  }
}
