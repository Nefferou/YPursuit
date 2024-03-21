'use client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import getSocket from "@/app/play/multiplayer/socket";
import Button from '../../ui/Buttons/Button';
import { notFound } from 'next/navigation'

let socket: Socket;

interface Player {
    id: string;
    score: number;
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
    rankings: Ranking[];
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

interface Ranking {
    id: string;
    score: number;
    rank: number;
}

const RoomSection = () => {
    const router = useRouter();
    const params = useParams();
    const roomId = params.roomId as string;
    const [room, setRoom] = useState({} as Room);
    const [isCurrentUserHost, setIsCurrentUserHost] = useState(false);
    const [tempIndex, setTempIndex] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [playerNotFound, setPlayerNotFound] = useState(false);

    useEffect(() => {
        socket = getSocket();

        const handleRoomUpdate = (updatedRoom: Room) => {
            setRoom(updatedRoom);

            // Check if the current player is in the updated room's list of players
            const playerIsInRoom = updatedRoom.players.some(player => player.id === socket.id);
            setPlayerNotFound(!playerIsInRoom);

            setIsCurrentUserHost(updatedRoom.players?.some(player => player.id === socket.id && player.isHost));

            if (!updatedRoom.isAnswering && updatedRoom.answers.length === updatedRoom.players.length) {
                setCountdown(5);
                const intervalId = setInterval(() => {
                    setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
                }, 1000);

                setTimeout(() => clearInterval(intervalId), 5000);
            }

            if (tempIndex < updatedRoom.currentQuestionIndex) {
                setHasAnswered(false);
                setTempIndex(updatedRoom.currentQuestionIndex);
            }

            setTempIndex(updatedRoom.currentQuestionIndex);
        };

        const handleKicked = () => {
            router.push('/play/multiplayer');
        };

        const handleError = (error: string) => {
            alert('Game error:' + error);
        }

        // Set up event listeners
        socket.on('update_room', handleRoomUpdate);
        socket.on('kicked', handleKicked);
        socket.on('game_error', handleError);

        // Emit initial events
        socket.emit('retrieve_room_info', { roomId });

        // Clean up function to remove event listeners
        return () => {
            socket.off('update_room', handleRoomUpdate);
            socket.off('kicked', handleKicked);
            socket.off('game_error', handleError);
        };

    }, [tempIndex, roomId, router]);


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
            socket.emit('start_game', { roomId, questions });
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        }
    }

    const submitAnswer = (roomId: string, answerIndex: number) => {
        socket.emit('submit_answer', { roomId, answerIndex });
        setHasAnswered(true);
    }

    const handleReplay = (roomId: string) => {
        socket.emit('replay_game', { roomId });
    };

    if (!room) return <p>Loading...</p>;

    if (playerNotFound) {
        return notFound();
    }

    return (
        <>
            {
                room.id && room.status === "WAITING" ? (
                    <div className='w-full'>
                        <p className="font-bold text-xl">ID du salon: {roomId}</p>
                        <div className='flex flex-row justify-between items-center border-2 border-gray-300 p-2 rounded-md'>
                            <p
                                className='font-bold text-xl'
                            >{room.name}</p>
                            <p
                                className='font-bold text-lg bg-greenPrimary text-white p-2 rounded-md'
                            >Players: {room.players.length} / {room.maxPlayers}</p>
                        </div>
                        <ul className='w-full flex flex-col gap-2 my-4'>
                            {room.players.map(player => (
                                <li key={player.id} className={`border-2 border-gray-300 p-2 flex flex-row justify-between rounded-md font-bold text-lg ${player.id === socket.id ? 'bg-greenPrimary' : ''}`}>
                                    {player.id} {player.isHost ? ' (Host)' : ''}
                                    {isCurrentUserHost && !player.isHost && (
                                        <Button
                                            title="Button"
                                            design="simple"
                                            handleClick={() => handleKick(player.id)}
                                            disabled={false}
                                            styles='w-24 h-8 flex justify-center items-center text-sm bg-red'
                                        >
                                            KICK
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {isCurrentUserHost && room.status === "WAITING" && (
                            <Button
                                title="Button"
                                design="simple"
                                handleClick={startGame}
                                disabled={false}
                                styles='flex justify-center items-center text-sm bg-greenPrimary'
                            >
                                START GAME
                            </Button>
                        )}
                        <Button
                            title="Button"
                            design="simple"
                            handleClick={handleLeave}
                            disabled={false}
                            styles='flex justify-center items-center text-sm bg-red'
                        >
                            LEAVE ROOM
                        </Button>
                    </div >
                ) : room.id && room.status === "IN_PROGRESS" ? (
                    <div>
                        <p>Game in progress...</p>
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
                                {countdown > 0 && (
                                    <div>
                                        <p>Next question in {countdown}...</p>
                                    </div>
                                )}
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
                ) : room.id && room.status === "FINISHED" ? (
                    <div>
                        <p>Game finished</p>
                        <h2>Rankings:</h2>
                        <ul>
                            {room.rankings.map((player, index) => (
                                <li key={index}>
                                    {player.rank}. {player.id} - Score: {player.score}
                                </li>
                            ))}
                        </ul>
                        <Button
                            title="Leave"
                            design="simple"
                            handleClick={handleLeave}
                            disabled={false}
                            styles='flex justify-center items-center text-sm bg-red'
                        >
                            Leave
                        </Button>
                        {isCurrentUserHost && (
                            <Button
                                title="Replay"
                                design="simple"
                                handleClick={() => handleReplay(roomId)}
                                disabled={false}
                                styles='flex justify-center items-center text-sm bg-greenPrimary'
                            >
                                Replay
                            </Button>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </>

    );
};

export default RoomSection;
