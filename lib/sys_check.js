// Created by Ravi K 20/01/2021

const clui = require("clui")
const chalk = require("chalk")
const { runSync } = require("node-cmd")

const Line = clui.Line
const LineBuffer = clui.LineBuffer

const checkList = [
  {"label": "Node", "command": "node --version"},
  {"label": "NPM", "command": "npm --version"}
]

module.exports = {
  system_check: async () => {
    const outputBuffer = new LineBuffer({
      x: 0,
      y: 8
    });

    new Line(outputBuffer)
      .column(chalk.magenta("Dependency"), 22)
      .column(chalk.magenta("Version"), 22)
      .fill().store();

    checkList.forEach(val => {
      new Line(outputBuffer)
        .column(chalk.greenBright(val.label), 20)
        .column(chalk.green(runSync(val.command).data), 20)
        .fill().store()
    })
    outputBuffer.output()
  }
}