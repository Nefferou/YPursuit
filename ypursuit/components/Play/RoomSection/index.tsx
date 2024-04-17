'use client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import getSocket from "@/app/play/multiplayer/socket";
import Button from '../../ui/Buttons/Button';
import { notFound } from 'next/navigation'
import { SelectBox } from '@/components/ui/Select';
import { SelectOption } from '@/components/ui/Select';

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

interface RoomSectionProps {
    theme: string;
    maxPlayers: string;
    maxRounds: string;
    difficulty: string;
    isPrivate: boolean;
}

const themeOptions: SelectOption[] = [
    { value: "INFO", label: "Informatique" },
    { value: "MARKET_COM", label: "Market Communication" },
    { value: "AUDIO", label: "Audio" },
    { value: "JEUX_VIDEO", label: "Jeux Vidéo" },
    { value: "ARCHI", label: "Architecture" },
    { value: "CREA_DESIGN", label: "Création Design" },
];

const maxPlayersOptions: SelectOption[] = [
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
];

const maxRoundsOptions: SelectOption[] = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
];

const difficultyOptions: SelectOption[] = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
    { value: "ALL LEVEL", label: "ALL LEVEL" },
];

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
    const [formData, setFormData] = useState({} as RoomSectionProps);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        socket = getSocket();

        const handleRoomUpdate = (updatedRoom: Room) => {
            setRoom(updatedRoom);
            setFormData({
                theme: updatedRoom.theme,
                maxPlayers: updatedRoom.maxPlayers.toString(),
                maxRounds: updatedRoom.maxRounds.toString(),
                difficulty: updatedRoom.difficulty,
                isPrivate: updatedRoom.isPrivate
            })

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

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.name);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleChangePrivate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        });
    }

    const handleUpdateRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsModalOpen(false);

        socket.emit('update_room', {
            roomId,
            theme: formData.theme,
            maxPlayers: formData.maxPlayers,
            maxRounds: formData.maxRounds,
            difficulty: formData.difficulty,
            isPrivate: formData.isPrivate
        });
    }

    if (!room) return <p>Loading...</p>;

    if (playerNotFound) {
        return notFound();
    }

    return (
        <>
            {
                room.id && room.status === "WAITING" ? (
                    <div className='w-full'>
                        {isCurrentUserHost && (
                            <Button
                                title="Button"
                                design="simple"
                                handleClick={() => setIsModalOpen(true)}
                                disabled={false}
                                styles='flex justify-center items-center text-sm mb-4'
                            >
                                CONFIG ROOM
                            </Button>
                        )}

                        {isModalOpen ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    Room Configuration
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setIsModalOpen(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <form onSubmit={handleUpdateRoom}>
                                                <div className="relative p-6 flex-auto">
                                                    <div>
                                                        <SelectBox
                                                            value={formData.theme}
                                                            label="Theme"
                                                            name="theme"
                                                            className='w-full'
                                                            options={themeOptions}
                                                            onChange={handleChangeSelect}
                                                        />
                                                    </div>
                                                    <div>
                                                        <SelectBox
                                                            value={formData.maxPlayers}
                                                            label="Max Players"
                                                            name='maxPlayers'
                                                            className='w-full'
                                                            options={maxPlayersOptions}
                                                            onChange={handleChangeSelect}
                                                        />
                                                    </div>
                                                    <div>
                                                        <SelectBox
                                                            value={formData.maxRounds}
                                                            name='maxRounds'
                                                            label="Max Rounds"
                                                            className='w-full'
                                                            options={maxRoundsOptions}
                                                            onChange={handleChangeSelect}
                                                        />
                                                    </div>
                                                    <div>
                                                        <SelectBox
                                                            value={formData.difficulty}
                                                            name='difficulty'
                                                            label="Difficulty"
                                                            className='w-full'
                                                            options={difficultyOptions}
                                                            onChange={handleChangeSelect}
                                                        />
                                                    </div>
                                                    <label>
                                                        <input type="checkbox" name="isPrivate" checked={formData.isPrivate} onChange={handleChangePrivate} />
                                                        Private Room
                                                    </label>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-2">
                                                    <Button
                                                        title="Button"
                                                        design="simple"
                                                        handleClick={() => setIsModalOpen(false)}
                                                        disabled={false}
                                                        styles='flex justify-center items-center text-sm bg-red'
                                                    >
                                                        CLOSE
                                                    </Button>
                                                    <Button
                                                        title="Button"
                                                        design="simple"
                                                        disabled={false}
                                                        type="submit"
                                                        styles='flex justify-center items-center text-sm bg-greenPrimary'
                                                    >
                                                        SAVE
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}

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
                        <div className='flex flex-row gap-2 justify-between'>
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
                        </div>
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
