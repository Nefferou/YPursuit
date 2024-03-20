'use client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import getSocket from "@/app/play/multiplayer/socket";
import Button from '../ui/Buttons/Button';

let socket: Socket;

interface Player {
    id: string;
    isHost: boolean;
}

interface Room {
    id: string;
    name: string;
    maxPlayers: number;
    difficulty: string;
    players: Player[];
}

const RoomSection = () => {
    const router = useRouter();
    const params = useParams();
    const roomId = params.roomId as string;
    const [room, setRoom] = useState({} as Room);
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

    }, [room.players, roomId, router]);

    const handleLeave = () => {
        socket.emit('leave_room', { roomId });
        router.push('/play/multiplayer');
    };

    const handleKick = (playerId: string) => {
        socket.emit('kick_player', { roomId, playerId });
    };

    if (!room) return <p>Loading...</p>;

    return (
        <>
            {
                room.id ? (
                    <div className='w-full'>
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
                ) : (
                    <p>Loading...</p>
                )}
        </>

    );
};

export default RoomSection;
