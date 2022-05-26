// Created by Ravi K 20/01/2021

const inquirer = require("inquirer")

module.exports = {
  askQuestions: (name) => {
    const questions = [
      {
        name: "projectname",
        type: "input",
        message: "Enter new project name",
        default: name.toString(),
        validate: (value) => {
          if (value.length) return true
          else return "Please enter a valid project name"
        }
      },
      {
        name: "projectPlatform",
        type: "list",
        message: "Choose project platform",
        choices: ["React.JS", "Next.Js"],
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
        choices: ["Material-UI", "Bootstrap", "Raw Project"],
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
        choices: ["Admin Panel", "Public Website"],
        default: 0,
        validate: (value) => {
          if (value.length) return true
          else return "Please choose a template!"
        },
        when(answers) {
          return answers.uiframework !== "Raw Project"
        }
      },
      {
        name: "isGitEnabled",
        type: "list",
        message: "You want to initiate git?",
        choices: ["Yes", "No"],
        default: 0,
        validate: (value) => {
          if (value.length) return true
          else return "Please choose an option!"
        }
      },
      {
        name: "gitOrigin",
        type: "input",
        message: "Enter git repository url",
        validate: (value) => {
          if (value.length) return true
          else return "Please enter a valid git repository url"
        },
        when(answers) {
          return answers.isGitEnabled === "Yes"
        }
      },
      {
        name: "gitMainBranch",
        type: "list",
        message: "Select a name for you main/master branch",
        choices: ["main", "master"],
        default: 0,
        validate: (value) => {
          if (value.length) return true
          else return "Please select a branch"
        },
        when(answers) {
          return answers.isGitEnabled === "Yes" && answers.gitOrigin.length > 10
        }
      },
      {
        name: "gitBranches",
        type: "checkbox",
        message: `Select git branches you want to be created apart from main/master branch`,
        choices: ["preprod", "staging", "qa", "develop"],
        validate: (value) => {
          if (value.length) return true
          else return "Please enter a valid git repository url"
        },
        when(answers) {
          return answers.isGitEnabled === "Yes" && answers.gitOrigin.length > 10
        }
      },
      {
        name: "isGitPushSelected",
        type: "list",
        message: "Do you want to push initial setup to remote?",
        choices: ["Yes", "No"],
        default: 0,
        validate: (value) => {
          if (value.length) return true
          else return "Please choose an option!"
        },
        when(answers) {
          return answers.isGitEnabled === "Yes" && answers.gitOrigin.length > 10
        }
      },
      {
        name: "isHuskySelected",
        type: "list",
        message: "Do you want to set code linting and prettier?",
        choices: ["Yes", "No"],
        default: 0,
        validate: (value) => {
          if (value.length) return true
          else return "Please choose an option!"
        },
        when(answers) {
          return answers.isGitEnabled === "No"
        }
      },
    ]
    return inquirer.prompt(questions)
  }
}
