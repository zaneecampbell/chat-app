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

let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        // socket.emit('countUpdated', count)  Only emits to single connection of origin
        io.emit('countUpdated', count)         // emits to all at same time
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})