'use client';
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Socket} from 'socket.io-client';
import getSocket from "@/app/play/multiplayer/socket";

let socket: Socket;

interface Player {
    id: string;
    isHost: boolean;
}

interface Room {
    id: string;
    name: string;
    maxPlayers: number;
    maxRounds: number;
    theme: string;
    difficulty: string;
    isPrivate: boolean;
    status: string;
    players: Player[];
}

interface Question {
    id: string;
    question: string;
    answers: [{ text: string, correct: boolean }];
}

const RoomSection = () => {
    const router = useRouter();
    const params = useParams();
    const roomId = params.roomId as string;
    const [room, setRoom] = useState({} as Room);
    const [gameQuestions, setGameQuestions] = useState([] as Question[]);
    const [isCurrentUserHost, setIsCurrentUserHost] = useState(false);

    useEffect(() => {
        socket = socket = getSocket();

        socket.emit('retrieve_room_info', { roomId });

        socket.on('update_room', (updatedRoom) => {
            setRoom(updatedRoom);
            setIsCurrentUserHost(room.players?.some(player => player.id === socket.id && player.isHost));
        });

        socket.on('kicked', () => {
            router.push('/play/multiplayer');
        });

        socket.on('game_started', ({ questions }) => {
            setGameQuestions(questions);
        });

    }, [room.players, roomId, router]);

    const handleLeave = () => {
        socket.emit('leave_room', { roomId });
        router.push('/play/multiplayer');
    };

    const handleKick = (playerId: string) => {
        socket.emit('kick_player', { roomId, playerId });
    };

    const startGame = async () => {
        try {
            const response = await fetch(`http://localhost:3001/questions?maxRounds=${room.maxRounds}&theme=${room.theme}&difficulty=${room.difficulty}`);
            const questions = await response.json();
            console.log('Questions after fetch: ', questions);
            socket.emit('start_game', { roomId, questions });
            setGameQuestions(questions);
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        }
    }

    if (!room) return <p>Loading...</p>;

    return (
        <div>
            {room.id ? (
                <div>
                    {room.status === "WAITING" && (
                        <div>
                            <h1>Room: {room.name}</h1>
                            <h2>RoomID: {room.id}</h2>
                            <p>Players: {room.players.length} / {room.maxPlayers}</p>
                            <ul>
                                {room.players.map(player => (
                                    <li key={player.id}>
                                        {player.id} {player.isHost ? ' (Host)' : ''}
                                        {isCurrentUserHost && !player.isHost && (
                                            <button onClick={() => handleKick(player.id)}>Kick</button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {isCurrentUserHost && room.status === "WAITING" && (
                                <button onClick={startGame}>Start Game</button>
                            )}
                            <button onClick={handleLeave}>Leave Room</button>
                        </div>
                    )}
                    {room.status === "IN_PROGRESS" && (
                        <div>
                            <h1>Game in progress...</h1>
                        </div>
                    )}
                    {room.status === "FINISHED" && (
                        <div>
                            <h1>Game finished!</h1>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RoomSection;
