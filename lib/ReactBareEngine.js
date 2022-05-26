#! /usr/bin/env node
const CLI = require("clui")
const { run } = require("node-cmd")
const SpnrStyle = require("../lib/constants")
const chalk = require("chalk")
const nmoji = require("node-emoji")
const { cra } = require("../lib/constants")
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
      run("npm uninstall -g create-react-app", function (e) {
        run(
          `${cra} ${params.projectname} --use-npm`,
          function (err) {
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
