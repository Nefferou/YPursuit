'use client';
import React, { use } from 'react';
import Button from '../../ui/Buttons/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CardSolo from '@/assets/images/card/game_solo.png';
import CardMulti from '@/assets/images/card/game_multi.png';

type PanelDesignType = 'solo' | 'multi';

interface PanelPlayProps {
    design?: PanelDesignType;
}


const PanelPlay = ({ design }: PanelPlayProps) => {
    const router = useRouter();
    switch (design) {
        case 'solo':
            return (
                <div className='flex flex-col items-center h-1/5 m-20 p-10'>
                    <Image src={CardSolo} alt="solo" width={400} height={1000} />
                    <div className='flex flex-col items-center h-1/5 m-10'>
                        <Button
                            handleClick={() => router.push('play/solo')}
                            title="title"
                            design="double"
                            backgroundColor='white'
                        >
                            Jouer en Solo
                        </Button>
                    </div>
                </div>
            );
        case 'multi':
            return (
                <div className='flex flex-col items-center h-1/5 m-20 p-10'>
                    <Image src={CardMulti} alt="multi" width={400} height={1000} />
                    <div className='flex flex-col items-center h-1/5 m-10'>
                        <Button
                            handleClick={() => router.push('play/multiplayer')}
                            title="title"
                            design="double"
                            backgroundColor='white'
                        >
                            Jouer en Multi
                        </Button>
                    </div>
                </div>
            );
    }
}

export default function Panel({ design }: PanelPlayProps) {
    switch (design) {
        case 'solo':
            return (
                <div className='flex'>
                    <PanelPlay design='solo' />
                </div>
            );
        case 'multi':
            return (
                <div className='flex'>
                    <PanelPlay design='multi' />
                </div>
            );
    }
}
