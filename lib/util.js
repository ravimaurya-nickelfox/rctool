// Util functions

module.exports = {
  parseAppName: (arg) => {
    if (!arg) return "awesome_app"
    let name = String(arg) ?? " "
    name = name.replace(/[&\/\\#,\- +()$~%.'":*?<>{}]/g, "_")
    name = name.replace(" ", "_")
    name = name.toLowerCase()
    return name
  }
}
