'use client';

import React from 'react';
import {useRouter} from "next/navigation";
import getSocket from '@/app/play/multiplayer/socket';
import { Socket } from 'socket.io-client';

let socket: Socket;

const CreateRoom = () => {
    const router = useRouter();

    const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const maxPlayers = formData.get('maxPlayers') as string;
        const difficulty = formData.get('difficulty') as string;
        const isPrivate = formData.has('isPrivate') as boolean;

        socket = getSocket();
        socket.emit('create_room', { name, maxPlayers, difficulty, isPrivate });

        socket.on('room_created', (roomId: string) => {
            router.push(`/play/multiplayer/${roomId}`);
        });
    };

    return (
        <div>
            <h3>Create a Room</h3>
            <form onSubmit={handleCreateRoom}>
                <input name="name" placeholder="Room Name" required />
                <select name="maxPlayers" required>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <select name="difficulty" required>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                    <option value="ALL LEVEL">ALL LEVEL</option>
                </select>
                <label>
                    <input type="checkbox" name="isPrivate" /> Private Room
                </label>
                <button type="submit">Create Room</button>
            </form>
        </div>
    );
};

export default CreateRoom;
