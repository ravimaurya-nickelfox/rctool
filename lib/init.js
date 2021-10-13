// Created by Ravi K 20/01/2021

const inquirer = require("inquirer")

module.exports = {
  askProjectName: () => {
    const questions = [
      {
        name: "projectname",
        type: "input",
        message: "Enter new project name",
        validate: (value) => {
          if (value.length) return true
          else return "Please enter a valid project name"
        }
      },
      {
        name: "projectPlatform",
        type: "list",
        message: "Choose project platform",
        choices: ["Bare React.JS", "Next.Js"],
        default: 0,
        validate: (value) => {
          if (value.length) return true
          else return "Please select a platform!"
        }
      },
      {
        name: "uiframework",
        type: "list",
        message: "Choose UI framework",
        choices: ["Bootstrap", "Material-UI", "Raw Project"],
        default: 0,
        validate: (value) => {
          if (value.length) return true
          else return "Please choose a UI framework!"
        }
      },
      {
        name: "usedFor",
        type: "list",
        message: "Please select a default template",
        choices: ["Admin Panel", "Public Website", "No Template"],
        default: 1,
        validate: value => {
          if (value.length) return true
          else return "Please choose a template!"
        },
        when(answers) {
          return answers.uiframework !== "Raw Project"
        }
      }
    ];
    return inquirer.prompt(questions)
  }
}