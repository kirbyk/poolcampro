const players = require("./players.js")

let queue = []

exports.get = () => {
	return queue
}

// expects object id, returns promise
exports.add = (player_id) => {
	return players.getPlayerById(player_id).then(player => {
		queue.push(player)
		return queue
	})
}

// expects object it
exports.remove = (player_id) => {
	found = false
	for (var i = queue.length - 1; i >= 0; i--) {
		if(queue[i]._id == player_id) {
			found = true
			break
		}
	}
	if(found) {
		queue.splice(i, 1)	
	}
	
	return [found, queue]
}

exports.pop = () => {
	if(queue.length > 0) {
		poppedPlayer = queue[0]
		queue.splice(0, 1)
		return [poppedPlayer, queue]
	}
	return [null, queue]
}