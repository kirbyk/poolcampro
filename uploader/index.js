const cors = require('cors')
const express = require('express')
const http = require('http')
const recorder = require('./recorder.js')
const uploader = require('./uploader.js')
const util = require('./util.js')
const objectIdToTimestamp = require('objectid-to-timestamp')
const iso = require('iso8601')


const app = express()
app.use(cors())
const server = http.createServer(app)


let currentlyRecording = false
let gameID = null

function curISO8601() {
  return iso.fromDate(new Date(Date.now()))
}

app.get('/currentGame', (req, res) => {
  if (currentlyRecording) {
    return res.json({
      "gameInProgress": currentlyRecording,
      "gameID": gameID,
      "gameStartTime": curISO8601(),
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
      "gameStartTime": curISO8601(),
    })
  }

  gameID = recorder.begin()
  currentlyRecording = true

  return res.json({
    "success": true,
    "msg": "Recording has begun",
    "gameID": gameID,
    "gameStartTime": curISO8601(),
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
      "gameEndTime": curISO8601(),
    })
  }

  return res.json({
    "success": false,
    "msg": "There is no recording currently in progress."
  })
})

server.listen(8080)
