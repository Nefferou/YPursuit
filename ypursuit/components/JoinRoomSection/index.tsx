'use client';

import React, { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";
import getSocket from '@/app/play/multiplayer/socket';
import { Socket } from 'socket.io-client';

let socket: Socket;

const JoinRoom = () => {
    const router = useRouter();
    const [rooms, setRooms] = useState<any[]>([]);

    useEffect(() => {
        socket = getSocket();

        socket.emit('update_rooms');
        socket.on('update_rooms', (updatedRooms: string[]) => {
            setRooms(updatedRooms);
        });

        return () => {
            socket.off('update_rooms');
        };
    }, []);

    const handleJoinRoom = (roomId: string) => {
        socket.emit('join_room', { roomId });
        socket.on('room_join_response', (response: boolean) => {
            if (response) router.push(`/play/multiplayer/${roomId}`);
            else alert('Room is full or does not exist.');
        });
    };

    const handleJoinPrivateRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const roomId = formData.get('roomId') as string;
        handleJoinRoom(roomId);
    }

    return (
        <div>
            <h3 className="text-2xl">Join a Room</h3>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index}>
                        {room.name} - Players: {room.players.length}/{room.maxPlayers} - Difficulty: {room.difficulty}
                        <button onClick={() => handleJoinRoom(room.id)} style={{marginLeft: "10px"}}>
                            Join
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleJoinPrivateRoom}>
                <input name="roomId" placeholder="Enter a room ID" />
                <button type="submit">Join Private Room</button>
            </form>
        </div>
    );
};

export default JoinRoom;
