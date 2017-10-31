exports.gameIdToPath = gameID => `games/${gameID}.mpg`
exports.currentUnixTime = () => Math.round((new Date()).getTime() / 1000)
