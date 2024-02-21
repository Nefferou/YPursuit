const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const PORT = process.env.PORT || 3001;

let rooms = []; // Array to store rooms

io.on('connection', (socket) => {
    console.log('a user connected');

    // ------------------ Emit list of rooms to new users ------------------
    socket.emit('update_rooms', rooms);

    // ------------------ Handle room creation ------------------
    socket.on('create_room', ({ name, maxPlayers, difficulty }) => {
        const roomId = generateRoomId();
        const room = { id: roomId, name, maxPlayers, difficulty, players: [socket.id] };
        rooms.push(room);
        console.log(`Room created with ID: ${roomId}`);
        io.emit('update_rooms', rooms);
    });

    // ------------------ Handle disconnection ------------------
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const generateRoomId = () => {
    return Math.random().toString(36).substring(7);
}

server.listen(PORT, () => {
    console.log(`Ypursuit Socket Server is running on port ${PORT}`);
})