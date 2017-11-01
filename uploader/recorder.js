const shell = require("shelljs")
const ObjectID = require("bson-objectid")
const util = require("./util.js")

let gameID = null
let process = null

exports.begin = () => {
  gameID = ObjectID()
  gamePath = util.gameIdToPath(gameID)
  process = record(gamePath)
  return gameID
}

exports.end = () => {
  if(process) {
  	process.kill()
  }
  process = null
  return gameID
}

const record = (gamePath) => {
  const command = `ffmpeg -f avfoundation -framerate 30 -i "0" ${gamePath}`
  return shell.exec(command, {async: true})
}
