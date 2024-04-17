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
        <div className='flex flex-col items-center justify-center w-3/4 h-screen p-4 space-y-4 sm:px-20 sm:py-10 sm:space-y-8 m-auto'>
            <h3 className='text-3xl font-semibold'>Créer</h3>
            <form onSubmit={handleCreateRoom} className='m-0'>
                <div className='border-2 rounded-md p-3 my-2 flex flex-col justify-center w-full gap-4'>
                    <InputContact
                        type='text'
                        label='Room Name'
                        name="name"
                        placeholder="Nom de la salle..."
                        error={''}
                        disabled={false}
                        required={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <SelectBox
                        value={maxPlayers.toString()}
                        label='Nombre de joueurs'
                        name='maxPlayers'
                        disabled={false}
                        className=''
                        options={[
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                            { value: '4', label: '4' },
                        ]}
                        onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                    />
                    <SelectBox
                        value={maxRounds.toString()}
                        label='Nombre de rounds'
                        name='maxRounds'
                        disabled={false}
                        className=''
                        options={[
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                            { value: '4', label: '4' },
                            { value: '5', label: '5' },
                            { value: '6', label: '6' },
                            { value: '7', label: '7' },
                            { value: '8', label: '8' },
                            { value: '9', label: '9' },
                            { value: '10', label: '10' },
                        ]}
                        onChange={(e) => setMaxRounds(parseInt(e.target.value))}
                    />
                    <div>
                        <label htmlFor="isPrivate">Private: {isPrivate ? 'Yes' : 'No'}</label>
                        <Toggle checked={isPrivate} onClick={() => setIsPrivate(!isPrivate)} />
                    </div>
                    <SelectBox
                        value={difficulty}
                        label='Difficulty'
                        name='difficulty'
                        disabled={false}
                        className=''
                        options={[
                            { value: '1', label: 'EASY' },
                            { value: '2', label: 'MEDIUM' },
                            { value: '3', label: 'HARD' },
                            { value: '4', label: 'ALL LEVEL' },
                        ]}
                        onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <SelectBox
                        value={theme}
                        label='Theme'
                        name='theme'
                        disabled={false}
                        className=''
                        options={[
                            { value: 'INFO', label: 'Informatique' },
                            { value: 'MARKET_COM', label: 'Market Communication' },
                            { value: 'AUDIO', label: 'Audio' },
                            { value: 'JEUX_VIDEO', label: 'Jeux Vidéo' },
                            { value: 'ARCHI', label: 'Architecture' },
                            { value: 'CREA_DESIGN', label: 'Création Design' },
                        ]}
                        onChange={(e) => setTheme(e.target.value)}
                    />
                </div>
                <Button
                    title="Button"
                    design="simple"
                    backgroundColor="green"
                    type="submit"
                    disabled={false}
                >
                    Create Room
                </Button>
            </form>
        </div>
    );
};

export default CreateRoom;
