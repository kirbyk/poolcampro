const mongo = require('./mongo.js')
const players = require('./players.js')
const elo = require('./elo.js')
const ObjectId = require('mongodb').ObjectId

exports.startGame = (player1_id, player2_id, recording_id) => {
    let games = mongo.get().collection("games")
    player1 = players.getPlayerById(ObjectId(player1_id))
    player2 = players.getPlayerById(ObjectId(player2_id))

    var gameObj = null

    return Promise.all([player1, player2]).then(values => {
        player1 = values[0]
        player2 = values[1]
        expectedScores = elo.getExpectedScores(player1.elo, player2.elo)
        gameObj = {
          _id: recording_id,
          startTime: new Date(Date.now()),
          players: [
            {
              "id": player1._id,
              "name": player1.name,
              "elo": player1.elo,
              "expectedScore": expectedScores[0],
            },
            {
              "id": player2._id,
              "name": player2.name,
              "elo": player2.elo,
              "expectedScore": expectedScores[1],
            }
          ]
        }
        return gameObj
    }).then(game => {
        let games = mongo.get().collection("games")
        gameObj = game 
        return games.insertOne(game)
    }).then(insert_result => {
        return gameObj
    }).catch(err => {
        console.log(err)
        return {err_msg: err.message}
    })
}

// player 1 is index 0, player 2 is index 1
exports.endGame = (recording_id, winner_idx = null) => {
    let games = mongo.get().collection("games")
    return games.findOne({_id: recording_id}).then(game => {
        if(winner_idx == 0 || winner_idx == 1) {
            loser_idx = (winner_idx == 0) ? 1 : 0

            game.players[winner_idx].actualScore = 1.0
            game.players[loser_idx].actualScore = 0.0

            winnerElo = elo.getNewElo(game.players[winner_idx].elo,
                                      game.players[winner_idx].expectedScore, 1.0)
            loserElo = elo.getNewElo(game.players[loser_idx].elo,
                                     game.players[loser_idx].expectedScore, 0.0)

            game.players[winner_idx].newElo = winnerElo
            game.players[loser_idx].newElo = loserElo
            game.endTime = new Date(Date.now())

            update_game   = games.updateOne({_id: recording_id}, game)
            update_winner = players.updatePlayerEloAndWL(game.players[winner_idx].id, winnerElo, true)
            update_loser  = players.updatePlayerEloAndWL(game.players[loser_idx].id, loserElo, false)

            return Promise.all([update_game, update_winner, update_loser])
        } else {
            update_game = games.updateOne({_id: recording_id}, {$set: {abortedTime: new Date(Date.now())}})
        }
    }).then(() => {
        return {
            success: true,
            msg: "game result persisted and player records updated"
        }
    }).catch(err => {
        console.log(err)
        return {
            success: false,
            msg: err.message
        }
    })
}

exports.getGameById = (recording_id) => {
    let games = mongo.get().collection("games")
    return games.findOne({_id: recording_id})
}