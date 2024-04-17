'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import getSocket from '@/app/play/multiplayer/socket';
import { Socket } from 'socket.io-client';
import { InputContact } from '@/components/ui/Inputs';
import { SelectBox } from '@/components/ui/Select';
import Toggle from '@/components/ui/Toggle';
import Button from '@/components/ui/Buttons/Button';

let socket: Socket;

const CreateRoom = () => {
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [maxPlayers, setMaxPlayers] = useState<number>(2);
    const [maxRounds, setMaxRounds] = useState<number>(1);
    const [theme, setTheme] = useState<string>('INFO');
    const [difficulty, setDifficulty] = useState<string>('EASY');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket = getSocket();
        socket.emit('create_room', { name, maxPlayers, maxRounds, theme, difficulty, isPrivate });

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
                <select name="maxRounds" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <select name="theme" required>
                    <option value="INFO">Informatique</option>
                    <option value="MARKET_COM">Market Communication</option>
                    <option value="AUDIO">Audio</option>
                    <option value="JEUX_VIDEO">Jeux Vidéo</option>
                    <option value="ARCHI">Architecture</option>
                    <option value="CREA_DESIGN">Création Design</option>
                </select>
                <select name="difficulty" required>
                    <option value="EASY">Facile</option>
                    <option value="MEDIUM">Intérmédiaire</option>
                    <option value="HARD">Difficile</option>
                    <option value="ALL LEVEL">Tous niveaux</option>
                </select>
                <label>
                    <input type="checkbox" name="isPrivate" /> Salon privé
                </label>
                <button type="submit">Créer Salon</button>

            </form>
        </div>
    );
};

export default CreateRoom;
