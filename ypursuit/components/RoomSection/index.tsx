'use client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
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
        <div>
            {room.id ? (
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
                    <button onClick={handleLeave}>Leave Room</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RoomSection;
