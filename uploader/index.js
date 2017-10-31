const cors = require('cors')
const express = require('express')
const http = require('http')
const recorder = require('./recorder.js')
const uploader = require('./uploader.js')
const util = require('./util.js')
const objectIdToTimestamp = require('objectid-to-timestamp')


const app = express()
app.use(cors())
const server = http.createServer(app)


let currentlyRecording = false
let gameID = null

app.get('/currentGame', (req, res) => {
  if (currentlyRecording) {
    return res.json({
      "gameInProgress": currentlyRecording,
      "gameID": gameID,
      "gameStartTime": objectIdToTimestamp(gameID),
    })
  }

  return res.json({
    "gameInProgress": currentlyRecording,
  })
})

app.get('/beginGame', (req, res) => {
  if (currentlyRecording) {
    return res.json({
      "success": false,
      "msg": "A recording is currently in progress.",
      "gameID": gameID,
      "gameStartTime": objectIdToTimestamp(gameID),
    })
  }

  gameID = recorder.begin()
  currentlyRecording = true

  return res.json({
    "success": true,
    "msg": "Recording has begun",
    "gameID": gameID,
    "gameStartTime": objectIdToTimestamp(gameID),
  })
})

app.get('/endGame', (req, res) => {
  if (currentlyRecording) {
    const gamePath = util.gameIdToPath(recorder.end())

    uploader.upload(gamePath)

    gameID = null
    currentlyRecording = false

    return res.json({
      "success": true,
      "msg": "Recording has ended",
      "gameEndTime": util.currentUnixTime(),
    })
  }

  return res.json({
    "success": false,
    "msg": "There is no recording currently in progress."
  })
})

server.listen(8080)
