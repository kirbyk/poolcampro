const cors = require('cors')
const express = require('express')
var bodyParser = require('body-parser')
const http = require('http')
const recorder = require('./recorder.js')
const uploader = require('./uploader.js')
const util = require('./util.js')
const mongo = require('./mongo.js')
const players = require('./players.js')
const games = require('./games.js')

mongo.connect()
const app = express()
app.use(cors())
app.use(bodyParser.json())
const server = http.createServer(app)

let currentlyRecording = false
let gameID = null

app.get('/currentGame', (req, res) => {
  if (currentlyRecording) {

    games.getGameById(gameID).then(game => {
      return res.json({
        "gameInProgress": currentlyRecording,
        "game": game,
      })
    }).catch(err => {
      console.log(err)
      return res.json({
        "gameInProgress": currentlyRecording,
        "msg": `Could not fetch game data: ${err.message}`
      })
    })

    return
  }

  return res.json({
    "gameInProgress": currentlyRecording,
  })
})

app.post('/beginGame', (req, res) => {
  if (currentlyRecording) {
    return res.json({
      "success": false,
      "msg": "A recording is currently in progress.",
      "gameID": gameID,
    })
  }


  // check for player 1 and player 2
  if (!req.body.player1 || !req.body.player2) {
    return res.json({
      "success": false,
      "msg": "Must specify ids of player1 and player2", 
    })
  }

  gameID = recorder.begin()
  currentlyRecording = true

  try {
    games.startGame(req.body.player1, req.body.player2, gameID).then(gameObj => {
      return res.json({
        "success": true,
        "msg": "Recording has begun",
        "game": gameObj
      })
    }).catch(err => {
        throw err
    })

    } catch(e) {
      currentlyRecording = false
      gameID = null
      recorder.end()

      return res.json({
        "success":false,
        "msg": e.message
      })
  }
})

// expected request body: 
// {
//   winner_idx: 
// }
app.post('/endGame', (req, res) => {
  if (currentlyRecording) {
    const gamePath = util.gameIdToPath(recorder.end())

    uploader.upload(gamePath)

    let winner_idx = null
    if(req.body.winner_idx == 0 || req.body.winner_idx == 1) {
      winner_idx = req.body.winner_idx
    }

    games.endGame(gameID, winner_idx).then(dbResult => {
      gameID = null
      currentlyRecording = false
      return res.json({
        "success": true,
        "msg": "Recording has ended",
        "dbResult": dbResult
      })
    }).catch(err => {
      console.log(err)
      return res.json({
        "success": false,
        "msg": err
      })
    })
    return
  }

  return res.json({
    "success": false,
    "msg": "There is no recording currently in progress."
  })
})

server.listen(8080)
