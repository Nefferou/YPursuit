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
    isAnswering: boolean;
    questions: Question[];
    currentQuestionIndex: 0;
    currentCorrectAnswerIndex: 0;
    answers: Answer[];
}

interface Answer {
    playerId: string;
    answer: number;
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
    const [isCurrentUserHost, setIsCurrentUserHost] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);

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
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        }
    }

    const submitAnswer = (roomId: string, answerIndex: number) => {
        socket.emit('submit_answer', { roomId, answerIndex });
        setHasAnswered(true);
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
                            {room.isAnswering ? (
                                hasAnswered ? (
                                    <p>Waiting for other players to submit answers...</p>
                                ) : (
                                    <div>
                                        <p>{room.questions[room.currentQuestionIndex].question}</p>
                                        <ul>
                                            {room.questions[room.currentQuestionIndex].answers.map((answer, index) => (
                                                <li key={index}>
                                                    <button onClick={() => submitAnswer(roomId, index)}>{answer.text}</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ) : (
                                <div>
                                    <p>Answers submitted!</p>
                                    <ul>
                                        {room.answers.map((ans, index) => (
                                            <li key={index}>
                                                Player {ans.playerId}: {room.questions[room.currentQuestionIndex].answers[ans.answer].text} {ans.answer === room.currentCorrectAnswerIndex ? ' (Correct)' : '(Incorrect)'}
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Correct Answer: {room.questions[room.currentQuestionIndex].answers[room.currentCorrectAnswerIndex].text}</p>
                                </div>
                            )}
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
