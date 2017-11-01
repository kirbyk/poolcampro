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
const playerQueue = require('./queue.js')
const ObjectId = require('mongodb').ObjectId

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

app.get('/leaderboard/topTen', (req, res) => {
  players.getTopTenPlayers().then(lst => {
    return res.json({
      "success": true,
      "players": lst
    })
  }).catch(err => {
    console.log(err)
    return res.json({
      "success": false,
      "err_msg": err.message
    })
  })
})

app.get('/leaderboard/byElo', (req, res) => {
  let page = 0
  let pageLimit = 10

  if (req.query.page && parseInt(req.query.page) != NaN) {
    page = parseInt(req.query.page)
  }
  if (req.query.pageLimit && parseInt(req.query.pageLimit) != NaN) {
    pageLimit = parseInt(req.query.pageLimit)
  }

  console.log("page", page)
  console.log("pageLimit", pageLimit)

  players.leaderboardByElo(page, pageLimit).then(lst => {
    return res.json({
      "success": true,
      "players": lst
    })
  }).catch(err => {
    console.log(err)
    return res.json({
      "success": false,
      "err_msg": err.message
    })
  })
})

app.get('/player/:id/previousGames', (req, res) => {
  try {
    games.getPreviousGamesForPlayer(ObjectId(req.params.id)).then(prev_games => {
      return res.json({
        "success": true,
        "players": prev_games
      })
    }).catch(err => {
      console.log(err)
      return res.json({
        "success": false,
        "err_msg": err.message
      })
    })
  } catch(err) {
      console.log(err)
      return res.json({
        "success": false,
        "err_msg": err.message
      })
  }

})

app.get('/players/suggestions/:namestub', (req, res) => {
  players.getNameSuggestions(req.params.namestub).then(suggestions => {
    return res.json({
      "success": true,
      "suggestions": suggestions
    })
  }).catch(err => {
    console.log(err)
    return res.json({
      "success": false,
      "err_msg": err.message
    })
  })
})

app.get('/players/suggestions', (req, res) => {
  players.getAllNames().then(suggestions => {
    return res.json({
      "success": true,
      "suggestions": suggestions
    })
  }).catch(err => {
    console.log(err)
    return res.json({
      "success": false,
      "err_msg": err.message
    })
  })
})

app.get('/games/lastTen', (req, res) => {
  games.lastTenGames().then(lastGames => {
    return res.json({
      "success": true,
      "lastTenGames": lastGames
    })
  }).catch(err => {
    console.log(err)
    return res.json({
      "success": false,
      "err_msg": err.message
    })
  })
})

app.get('/queue', (req, res) => {
  return res.json({
    "success": true,
    "queue": playerQueue.get()
  })
})

// expects
// {
//     "player_id": <ObjectId string>
// }
app.post('/queue/add', (req, res) => {
  if(!req.body.player_id) {
      return res.json({
        "success": false,
        "msg": "Must specify a player id in player_id of body."
      })
  }

  try {
    playerQueue.add(ObjectId(req.body.player_id)).then(newQueue => {
      return res.json({
        "success": true,
        "newQueue": newQueue
      })
    }).catch(err => {
      console.log(err)
      return res.json({
        "success": false,
        "err_msg": err.message
      })
    })
  } catch(err) {
      console.log(err)
      return res.json({
        "success": false,
        "err_msg": err.message
      })
  }
})

// expects
// {
//     "player_id": <ObjectId string>
// }
app.post('/queue/remove', (req, res) => {
  if(!req.body.player_id) {
      return res.json({
        "success": false,
        "msg": "Must specify a player id in player_id of body."
      })
  }

  try {
    let result = playerQueue.remove(req.body.player_id)
    let found = result[0]
    let queue = result[1]

    if(found) {
      return res.json({
        "success": true,
        "newQueue": queue
      })
    } else {
      return res.json({
        "success": false,
        "msg": "player id not found in queue"
      })
    }
  } catch(err) {
      console.log(err)
      return res.json({
        "success": false,
        "err_msg": err.message
      })
  }
})

app.get('/queue/pop', (req, res) => {
    let result = playerQueue.pop()
    let poppedPlayer = result[0]
    let queue = result[1]

    if(poppedPlayer != null) {
      return res.json({
        "success": true,
        "poppedPlayer": poppedPlayer,
        "newQueue": queue
      })
    } else {
      return res.json({
        "success": false,
        "msg": "queue is empty"
      })
    }
})

app.get('/games/recent', (req, res) => {
  let page = 0
  let pageLimit = 10

  if (req.query.page && parseInt(req.query.page) != NaN) {
    page = parseInt(req.query.page)
  }
  if (req.query.pageLimit && parseInt(req.query.pageLimit) != NaN) {
    pageLimit = parseInt(req.query.pageLimit)
  }

  games.getRecentGames(page, pageLimit).then(lst => {
    return res.json({
      "success": true,
      "recentGames": lst
    })
  }).catch(err => {
    console.log(err)
    return res.json({
      "success": false,
      "err_msg": err.message
    })
  })
})

server.listen(8080)
