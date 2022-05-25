#! /usr/bin/env node
const CLI = require("clui")
const { run, runSync } = require("node-cmd")
const SpnrStyle = require("../lib/constants")
const chalk = require("chalk")
const nmoji = require("node-emoji")
require("dotenv").config()

const Spinner = CLI.Spinner

module.exports = {
  set: (params) => {
    return new Promise((resolve) => {
      const spnr = new Spinner(
        chalk.magenta("Setting up validations"),
        SpnrStyle.spinnerStyle1
      )
      spnr.start()
      run(
        `cd ${params.projectname} && npx husky-init && npm install`,
        function (res) {
          run(
            `cd ${params.projectname} && npx husky set .husky/pre-commit 'npm run prettier:write && npm run lint'`,
            function (r) {
              run(
                `cd ${params.projectname} && git add . && git commit -m "chore(project): setup pre-commit hooks" && git add . && git commit -m "chore(refactor): prettified and linted code"`,
                function (h) {
                  if (params.isGitPushSelected === "Yes") {
                    runSync(`cd ${params.projectname} && git push -f -u origin --all`)
                  }
                  spnr.stop()
                  console.log(
                    chalk.magenta(`${nmoji.get("tada")} Validation setup done!`)
                  )
                  resolve(true)
                }
              )
            }
          )
        }
      )
    })
  }
}
