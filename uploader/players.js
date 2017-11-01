const mongo = require('./mongo.js')

exports.getPlayerById = function (oid) {
	let users = mongo.get().collection("users")
	return users.findOne({_id: oid})
}

exports.updatePlayerEloAndWL = function (oid, new_elo, won_game) {
	let users = mongo.get().collection("users")
	if(won_game) {
		return users.updateOne({_id: oid}, {$set: {elo: new_elo}, $inc: {wins: 1}})
	} else {
		return users.updateOne({_id: oid}, {$set: {elo: new_elo}, $inc: {losses: 1}})
	}
}