'use client';

import React, { ChangeEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import getSocket from '@/app/play/multiplayer/socket';
import { Socket } from 'socket.io-client';
import { InputContact } from '@/components/ui/Inputs';
import { SelectBox } from '@/components/ui/Select';
import { SelectOption } from '@/components/ui/Select';
import Toggle from '@/components/ui/Toggle';
import Button from '@/components/ui/Buttons/Button';

let socket: Socket;

interface CreateRoomSectionProps {
    name: string;
    maxPlayers: string;
    maxRounds: string;
    isPrivate: boolean;
    difficulty: string;
    theme: string;
}

const themeOptions: SelectOption[] = [
    { value: "Info", label: "Informatique" },
    { value: "Marketcom", label: "Market Communication" },
    { value: "Audiovisuel", label: "Audio" },
    { value: "Jeuxvideo", label: "Jeux Vidéo" },
    { value: "Architecture", label: "Architecture" },
    { value: "Gamedesign", label: "Création Design" },
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
    { value: "1", label: "EASY" },
    { value: "2", label: "MEDIUM" },
    { value: "3", label: "HARD" },
    { value: "4", label: "ALL LEVEL" },
];

const CreateRoom = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<CreateRoomSectionProps>({
        name: '',
        maxPlayers: '2',
        maxRounds: '1',
        isPrivate: false,
        difficulty: '1',
        theme: 'Info',
    });

    const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const maxPlayers = formData.get('maxPlayers') as string;
        const maxRounds = formData.get('maxRounds') as string;
        const theme = formData.get('theme') as string;
        const difficulty = formData.get('difficulty') as string;
        const isPrivate = formData.has('isPrivate') as boolean;

        socket = getSocket();
        socket.emit('create_room', { 
            name, 
            maxPlayers, 
            maxRounds, 
            theme, 
            difficulty, 
            isPrivate
         });

        socket.on('room_created', (roomId: string) => {
            router.push(`/play/multiplayer/${roomId}`);
        });
    };

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.name);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen m-auto'>
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
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <SelectBox
                        value={formData.maxPlayers}
                        label='Nombre de joueurs'
                        name='maxPlayers'
                        disabled={false}
                        options={maxPlayersOptions}
                        onChange={handleChangeSelect}
                    />
                    <SelectBox
                        value={formData.maxRounds}
                        label='Nombre de rounds'
                        name='maxRounds'
                        disabled={false}
                        options={maxRoundsOptions}
                        onChange={handleChangeSelect}
                    />
                    <div>
                        <label htmlFor="isPrivate">Private: {formData.isPrivate ? 'Yes' : 'No'}</label>
                        <Toggle checked={formData.isPrivate} onClick={() => setFormData({ ...formData, isPrivate: !formData.isPrivate })} />
                    </div>
                    <SelectBox
                        value={formData.difficulty}
                        label='Difficulty'
                        name='difficulty'
                        disabled={false}
                        className=''
                        options={difficultyOptions}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    />
                    <SelectBox
                        value={formData.theme}
                        label='Theme'
                        name='theme'
                        disabled={false}
                        className=''
                        options={themeOptions}
                        onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
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
