'use client';
import React from 'react';
import Button from '../ui/Buttons/Button';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';
import CardHawky from '@/assets/images/card/hawkyFace.svg';

type PanelDesignType = 'solo' | 'multi';

interface PanelPlayProps {
    design?:PanelDesignType;
}


const PanelPlay = ({  design }: PanelPlayProps) => {
    switch (design) {
        case 'solo':
            return (
                <div className='flex flex-col items-center h-2/5 m-20'>
                    <Image src={CardHawky} alt="solo" />
                    <Button
                        handleClick={() => console.log('click')}
                        title="title"
                        design="double"
                        backgroundColor='white'
                    >
                        Solo
                    </Button>
                </div>
            );
        case 'multi':
            return (
                <div className='flex flex-col items-center h-2/5 m-20'>
                    <Image src={CardHawky} alt="solo" />
                    <Button
                        handleClick={() => console.log('click')}
                        title="title"
                        design="double"
                        backgroundColor='white'
                    >
                        Multi
                    </Button>
                </div>
            );
    }
}

    export default function Panel({design}:PanelPlayProps) {
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
