#! /usr/bin/env node
const reactMaterialExe = require("./ReactMaterialEngine")
const reactBareExe = require("./ReactBareEngine")
const gitActionExecutor = require("./gitActionExecutor")
const huskySetter = require("./huskySetter")

module.exports = {
  initBare: (params) => {
    reactBareExe
      .init(params)
      .then((res) => {
        if (res) {
          if (params.isGitEnabled === "Yes") {
            gitActionExecutor.initGit(params)
          }
        }
      })
      .catch((err) => {
        console.log("Error while generating project!!")
      })
  },
  initReactMaterial: (params) => {
    reactMaterialExe
      .init(params)
      .then((res) => {
        if (res) {
          if (params.isGitEnabled === "Yes") {
            gitActionExecutor
              .initGit(params)
              .then((res) => {
                huskySetter.set(params)
              })
              .catch((err) => {
                console.log("Error : ", err)
              })
          } else if (params.isHuskySelected === "Yes") {
            huskySetter.set(params)
          }
        } else {
          console.log("Error while generating project!!")
        }
      })
      .catch((err) => {
        console.log("Error while generating project!!")
      })
  }
}
