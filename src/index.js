const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
// creating the server outside the express library so we can configure it for socket.io
const server = http.createServer(app)
// socketio wants the raw server to be passed through
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', () => {
    console.log('New WebSocket connection')
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})