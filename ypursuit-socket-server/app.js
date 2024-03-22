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
    socket.on('create_room', ({ name, maxPlayers, maxRounds, theme, difficulty, isPrivate }) => {
        const roomId = generateRoomId();
        const room = {
            id: roomId,
            name,
            maxPlayers,
            maxRounds,
            theme,
            difficulty,
            isPrivate,
            isAnswering: true,
            questions: [],
            answers: [],
            currentQuestionIndex: 0,
            currentCorrectAnswerIndex: 0,
            status: "WAITING",
            rankings: [],
            players: [{id: socket.id, score: 0, isHost: true}]
        };
        rooms.push(room);
        console.log(`Room created with ID: ${roomId}`);
        socket.join(roomId);
        socket.emit('room_created', roomId);
        io.emit('update_rooms', rooms.filter(room => !room.isPrivate));
    });

    // ------------------ Handle room update ------------------
    socket.on('update_room', ({ roomId, theme, maxPlayers, maxRounds, difficulty, isPrivate }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room) {
            room.theme = theme;
            room.maxPlayers = parseInt(maxPlayers, 10);
            room.maxRounds = parseInt(maxRounds, 10);
            room.difficulty = difficulty;
            room.isPrivate = isPrivate;

            io.in(roomId).emit('update_room', room);
            io.emit('update_rooms', rooms);
        }
    });

    // ------------------ Handle joining a room ------------------
    socket.on('join_room', ({ roomId }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room && room.players.length < room.maxPlayers) {
            socket.join(roomId);
            room.players.push({ id: socket.id, score: 0, isHost: room.players.length === 0 });
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
        handleLeaveGame(socket, roomId);
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

    // ------------------ Handle starting a game ------------------
    socket.on('start_game', ({ roomId, questions }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room) {

            if (room.players.length < 2) {
                io.in(roomId).emit('game_error', 'Need at least 2 players to start the game');
                return;
            }

            console.log(`Game started in room ${roomId}`)
            room.status = "IN_PROGRESS";

            console.log(`Questions for room ${roomId}: ${questions}`)
            room.questions = questions;

            io.in(roomId).emit('update_room', room);
        }
    });

    // ------------------ Handle submitting an answer ------------------
    socket.on('submit_answer', ({ roomId, answerIndex }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room) {
            room.answers = room.answers || {};
            room.answers.push({ playerId: socket.id, answer: answerIndex });

            if (room.answers.length === room.players.length) {
                room.isAnswering = false;

                room.currentCorrectAnswerIndex = room.questions[room.currentQuestionIndex].answers.findIndex(a => a.correct);

                // Calculate scores
                room.answers.forEach(({ playerId, answer }) => {
                    const player = room.players.find(p => p.id === playerId);
                    if (answer === room.currentCorrectAnswerIndex) {
                        player.score += 1;
                    }
                });

                // Sort players by score
                room.rankings = room.players
                    .slice()
                    .sort((a, b) => b.score - a.score)
                    .map((player, index, array) => {
                        const rank = index === 0 ? 1 : (player.score === array[index - 1].score ? array[index - 1].rank : index + 1);
                        return { ...player, rank };
                    });

                io.in(roomId).emit('update_room', room);

                // Wait before moving to the next question
                setTimeout(() => {
                    room.currentQuestionIndex++;

                    room.answers = [];
                    room.isAnswering = true;

                    // Check if there are more questions
                    if (room.currentQuestionIndex < room.questions.length) {
                        io.in(roomId).emit('update_room', room);
                    } else {
                        room.status = "FINISHED";
                        io.in(roomId).emit('update_room', room);
                    }
                }, 5000); // 5000 milliseconds = 5 seconds
            }
        }
    });

    // ------------------ Handle replaying a game ------------------
    socket.on('replay_game', ({ roomId }) => {
        const room = rooms.find(room => room.id === roomId);
        if (room) {
            room.status = "WAITING";
            room.currentQuestionIndex = 0;
            room.players.forEach(player => player.score = 0);
            room.rankings = [];

            io.in(roomId).emit('update_room', room);
        }
    });

    // ------------------ Handle disconnection ------------------
    socket.on('disconnect', () => {

        rooms.forEach(room => {
            const playerIndex = room.players.findIndex(player => player.id === socket.id);

            if (playerIndex !== -1) {
                handleLeaveGame(socket, room.id);
            }
        });

        console.log('user disconnected');
    });
});

const handleLeaveGame = (socket, roomId) => {
    const room = rooms.find(room => room.id === roomId);
    if (room) {
        socket.leave(roomId);
        const playerIndex = room.players.findIndex(player => player.id === socket.id);
        let isHost = false;
        if (playerIndex !== -1) {
            isHost = room.players[playerIndex].isHost;
            room.players.splice(playerIndex, 1);
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
            io.in(roomId).emit('update_room', room);
            io.emit('update_rooms', rooms);
        }
    }
}

const cors = require('cors')
app.use(cors())
const questions = require('./temp');

app.get('/questions', (req, res) => {
    const { difficulty, theme, maxRounds } = req.query;

    // Convert maxRounds to a number
    const rounds = parseInt(maxRounds, 10);

    // Check if theme and difficulty are valid
    if (!questions[theme.toUpperCase()] || !questions[theme.toUpperCase()][difficulty.toUpperCase()]) {
        return res.status(400).json({ error: 'Invalid theme or difficulty' });
    }

    const filteredQuestions = questions[theme.toUpperCase()][difficulty.toUpperCase()];

    // Function to get random questions
    const getRandomQuestions = (questions, num) => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    // Select random questions based on maxRounds
    const selectedQuestions = getRandomQuestions(filteredQuestions, rounds);

    res.json(selectedQuestions);
})

const generateRoomId = () => {
    return Math.random().toString(36).substring(7);
}

server.listen(PORT, () => {
    console.log(`Ypursuit Socket Server is running on port ${PORT}`);
})