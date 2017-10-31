const cors = require('cors')
const express = require('express')
const http = require('http')


const app = express()
app.use(cors())
const server = http.createServer(app)

agg.get('/dashboard', (req, res) => {

})

app.get('/startGame', (req, res) => {

})

app.get('/endGame', (req, res) => {
})

server.listen(8080)
