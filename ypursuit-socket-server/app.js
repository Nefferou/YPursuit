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

    // ------------------ Handle room creation ------------------
    socket.on('create_room', ({ name, maxPlayers, difficulty, isPrivate }) => {
        const roomId = generateRoomId();
        const room = { id: roomId, name, maxPlayers, difficulty, isPrivate, players: [{id: socket.id, isHost: true}] };
        rooms.push(room);
        console.log(`Room created with ID: ${roomId}`);
        socket.emit('join_room', { roomId });
        socket.emit('room_created', roomId);
        io.emit('update_rooms', rooms.filter(room => !room.isPrivate));
    });

    // ------------------ Handle joining a room ------------------
    socket.on('join_room', ({ roomId }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room && room.players.length < room.maxPlayers) {
            socket.join(roomId);
            room.players.push({ id: socket.id, isHost: room.players.length === 0 });
            io.in(roomId).emit('update_room', room);
            io.emit('update_rooms', rooms);
            socket.emit('room_join_response', true);
        } else {
            socket.emit('room_join_response', false);
        }
    });

    // ------------------ Handle retrieve rooms ------------------
    socket.on('update_rooms', () => {
        socket.emit('update_rooms', rooms.filter(room => !room.isPrivate));
    });

    // ------------------ Handle retrieve info of a room ------------------
    socket.on('retrieve_room_info', ({ roomId }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room) {
            socket.emit('update_room', room);
        }
    });

    // ------------------ Handle leaving a room ------------------
    socket.on('leave_room', ({ roomId }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room) {
            socket.leave(roomId);
            const index = room.players.findIndex(player => player.id === socket.id);
            let isHost = false;
            if (index !== -1) {
                isHost = room.players[index].isHost;
                room.players.splice(index, 1);
                if (room.players.length === 0) {
                    // If no players are left, delete the room
                    rooms = rooms.filter(room => room.id !== roomId);
                    console.log(`Room ${roomId} is deleted`);
                } else{
                    if (isHost) {
                        // Pass host to the next player
                        room.players[0].isHost = true;
                    }
                }
            }
            io.in(roomId).emit('update_room', room);
            io.emit('update_rooms', rooms);
        }
    });

    // ------------------ Handle kicking a player ------------------
    socket.on('kick_player', ({ roomId, playerId }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room) {
            const player = room.players.find(player => player.id === socket.id);
            if (player && player.isHost) {
                const index = room.players.findIndex(player => player.id === playerId);
                if (index !== -1) {
                    room.players.splice(index, 1);
                    if (index === 0 && room.players.length > 0) {
                        // If host was kicked, pass host
                        room.players[0].isHost = true;
                    }
                    socket.to(playerId).emit('kicked');
                    io.in(roomId).emit('update_room', room);
                    io.emit('update_rooms', rooms);
                }
            }
        }
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