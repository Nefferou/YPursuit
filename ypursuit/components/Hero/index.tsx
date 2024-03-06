'use client'

import Image from 'next/image';
import React from 'react';
import Button from '../ui/Buttons/Button';
import Rusty from '../../assets/images/character/rusty.svg';
import Lully from '../../assets/images/character/lully.svg';
import HeroBg from '../../assets/images/hero.svg';
import Logo from '../../assets/images/logoWhite.svg';

const Hero: React.FC = () => {
    const handleClick = () => {
        console.log('click');
    }
    return (
        <div className="grid grid-cols-3 grid-rows-3 h-screen w-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${HeroBg})` }}>
            <Image src={Rusty} alt="Rusty" width={400} height={400} className="row-start-3 col-start-1 self-end justify-self-start" />
            <div className='flex flex-col items-center justify-center w-1/2 h-1/2 gap-2 row-start-2 col-start-2 self-center place-self-center'>
                <Image src={Logo} alt="Logo" width={400} height={400} className='mb-12' style={{ maxWidth: 'none' }} sizes='(max-width: 768px) 50vw, 768px' />
                <Button
                    handleClick={handleClick}
                    title="Button"
                    design="simple"
                    backgroundColor="white"
                    type="button"
                    disabled={false}
                >
                    JOUER
                </Button>
            </div>
            <Image src={Lully} alt="Lully" width={400} height={400} className="row-start-1 col-start-3 self-start justify-self-end mt-10" />
        </div>
    );
};

export default Hero;