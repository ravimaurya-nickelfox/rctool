#! /usr/bin/env node
const CLI = require("clui")
const { run, runSync, get } = require("node-cmd")
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
    run(`cd ${params.projectname}/`, function(data, err, stderr) {
      console.log(data, err, stderr)
      run("pwd")
    })
    // runSync("git init")
      // console.log("git init")
      // runSync("git add --all")
      // console.log("git add --all")
      // runSync('git commit -m "first commit"')
      // console.log('git commit -m "first commit"')
      // runSync(`git branch -M main`)
      // console.log(`git branch -M main`)
      // runSync(`git remote add origin ${params.gitOrigin}`)
      // console.log(`git remote add origin ${params.gitOrigin}`)
      // for (let i = 1; i < params.gitBranches.length; i++) {
      //   runSync(`git checkout -b ${params.gitBranches[i]}`)
      // }
      chalk.greenBright(
        `${nmoji.get("white_check_mark")} Git repository setup done!!`
      )
      spnr.stop()
    // })
  }
}
