const shell = require("shelljs")

let gamePath = null
let intervalID = null
let process = null

exports.begin = () => {
  const currentGame = (new Date()).toISOString()
  gamePath = `games/${currentGame}`
  let iteration = 0

  // create dir for 15 second videos
  shell.mkdir("-p", gamePath)

  // record a video for 15 seconds and upload it to S3
  process = recordAndUpload(gamePath, iteration)

  // do it every 15 seconds
  intervalID = setInterval(() => {
    process.kill()

    iteration++
    process = recordAndUpload(gamePath, iteration)
  }, 15 * 1000)
}

exports.end = () => {
  clearInterval(intervalID)
  process.kill()
  return gamePath
}

const recordAndUpload = (gamePath, iteration) => {
  const videoPath = `${gamePath}/${iteration}.mpg`
  const command = `ffmpeg -f avfoundation -framerate 30 -i "0" ${videoPath}`

  return shell.exec(command, {async: true})
}
