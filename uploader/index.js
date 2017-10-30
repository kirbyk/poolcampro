const cors = require('cors')
const express = require('express')
const http = require('http')
const recorder = require('./recorder.js')
const uploader = require('./uploader.js')


const app = express()
app.use(cors())
const server = http.createServer(app)


let currentlyRecording = false

app.get('/beginGame', (req, res) => {
  if (currentlyRecording) {
    return res.json({
      "success": false,
      "msg": "A recording is currently in progress."
    })
  }

  recorder.begin()

  currentlyRecording = true

  return res.json({
    "success": true,
    "msg": "Recording has begun"
  })
})

app.get('/endGame', (req, res) => {
  if (currentlyRecording) {
    const gamePath = recorder.end()

    uploader.uploadDir(gamePath)

    currentlyRecording = false

    return res.json({
      "success": true,
      "msg": "Recording has ended"
    })
  }

  return res.json({
    "success": false,
    "msg": "There is no recording currently in progress."
  })
})

server.listen(8080)
