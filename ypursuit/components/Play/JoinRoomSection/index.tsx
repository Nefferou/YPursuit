'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import getSocket from '@/app/play/multiplayer/socket';
import { Socket } from 'socket.io-client';
import { InputContact } from '../../ui/Inputs';
import Button from '../../ui/Buttons/Button';

interface Room {
    id: string;
    name: string;
    maxPlayers: number;
    maxRounds: number;
    theme: string;
    difficulty: string;
    isPrivate: boolean;
    players: Player[];
}

interface Player {
    id: string;
    score: number;
    isHost: boolean;
}

let socket: Socket;

const JoinRoom = () => {
    const router = useRouter();
    const [rooms, setRooms] = useState([] as Room[]);

    useEffect(() => {
        socket = getSocket();

        socket.emit('update_rooms');
        socket.on('update_rooms', (updatedRooms: Room[]) => {
            setRooms(updatedRooms.filter(room => !room.isPrivate));
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
        <div className='w-full'>
            <ul className='w-full flex flex-col gap-2 my-4'>
                {
                    rooms.length === 0 &&
                    <li className='border-2 border-gray-300 p-2 flex flex-row justify-between rounded-md font-bold text-lg'>
                        Pas de salons disponibles
                    </li>
                }
                {rooms.map((room) => (
                    <li key={room.id} className='border-2 border-gray-300 p-2 flex flex-row justify-between rounded-md font-bold text-lg'>
                        {room.name} - Joueurs : {room.players.length}/{room.maxPlayers} - Difficulté: {room.difficulty === '1' ? 'Facile' : room.difficulty === '2' ? 'Moyen' : room.difficulty === '3' ? 'Difficile' : 'Tous niveaux'}
                        <Button
                            title="Button"
                            design="simple"
                            backgroundColor="green"
                            handleClick={() => handleJoinRoom(room.id)}
                            disabled={false}
                            styles='w-24 h-8 flex justify-center items-center text-sm'
                        >
                            Rejoindre
                        </Button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleJoinPrivateRoom} className='flex flex-row gap-2 w-full justify-between'>
                <InputContact
                    type="text"
                    label="Code partie"
                    name="roomId"
                    placeholder="Entrez le code"
                    error=""
                    disabled={false}
                    required
                />
                <Button
                    title="Button"
                    design="simple"
                    backgroundColor="green"
                    type="submit"
                    disabled={false}
                >
                    Rejoindre
                </Button>
            </form>
        </div>
    );
};

export default JoinRoom;
