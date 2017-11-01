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

exports.getTopTenPlayers = () => {
	let users = mongo.get().collection("users")
	return users.find({$or: [{wins: {$gt: 0}}, {losses: {$gt: 0}}]}).sort("elo", -1).limit(10).toArray()
}

exports.getNameSuggestions = (namestub) => {
	let users = mongo.get().collection("users")
	return users.find({name: {$regex: `^${namestub}`, $options: 'i'}}).sort({name: 1}).project({name: 1}).toArray()
}