const shell = require("shelljs")
const ObjectID = require("bson-objectid")

let gamePath = null
let process = null

exports.begin = () => {
  const currentGame = ObjectID()
  gamePath = `games/${currentGame}.mpg`
  process = record(gamePath)
  return currentGame
}

exports.end = () => {
  process.kill()
  return gamePath
}

const record = (gamePath) => {
  const command = `ffmpeg -f avfoundation -framerate 30 -i "0" ${gamePath}`
  return shell.exec(command, {async: true})
}
