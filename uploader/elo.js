function getExpectedScores(elo1, elo2) {
	let expected1 = 1 /(1 + 10**((elo2-elo1)/400))
	let expected2 = 1 /(1 + 10**((elo1-elo2)/400))
	return (expected1, expected2)
}

function getNewElo(elo, expectedScore, actualScore) {
	let k = 32
	if(elo >= 2100 && elo <= 2400) {
		k = 24
	} else if (elo > 2400) {
		k = 16
	}
	return elo + k*(actualScore - expectedScore)
}