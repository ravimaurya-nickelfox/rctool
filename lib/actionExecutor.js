const CLI = require("clui")
const Spinner = CLI.Spinner
const { run: runAsync } = require("node-cmd")

module.exports = {
  initBare: (params) => {
    const spnr = new Spinner("Creating project \n")
    spnr.start()
    runAsync(`npx create-react-app ${params.projectname}`,
      function (err, data, stderr) {
        console.log("callback ", err, data, stderr)
        spnr.stop()
      })

  }
}