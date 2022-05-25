#! /usr/bin/env node
const CLI = require("clui")
const { run } = require("node-cmd")
const SpnrStyle = require("../lib/constants")
const chalk = require("chalk")
const nmoji = require("node-emoji")
require("dotenv").config()

const Spinner = CLI.Spinner

module.exports = {
  init: (params) => {
    return new Promise((resolve) => {
      const spnr = new Spinner(
        chalk.magenta("Creating project "),
        SpnrStyle.spinnerStyle1
      )
      spnr.start()
      run("npm uninstall -g create-react-app", function (e, d, s) {
        run(
          `npx --legacy-peer-deps create-react-app@latest ${params.projectname} --template git+ssh://git@github.com:Nickelfox/cra-template-nf-react.git --use-npm`,
          function (err, data, stderr) {
            spnr.stop()
            if (err) {
              console.log(
                chalk.redBright(
                  `${nmoji.get(
                    "no_entry_sign"
                  )} Error while generating template: ${err}`
                )
              )
              resolve(false)
            } else {
              console.log(
                chalk.greenBright(
                  `${nmoji.get(
                    "white_check_mark"
                  )} Project created successfully!!`
                )
              )
              resolve(true)
            }
          }
        )
      })
    })
  }
}
