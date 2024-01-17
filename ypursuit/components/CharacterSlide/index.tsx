import React from 'react';
import Image from 'next/image';
import Card from '@/assets/images/card/artchyPile.svg';
import Card2 from '@/assets/images/card/buzzyPile.svg';


const CharacterSlide = () => {
    return (
        <div id="slide4" className="w-full h-screen flex justify-center items-center border-y border-black">
            <div className='w-1/2 h-1/2 flex'>
                <Image src={Card} alt="Logo" />
            </div>
            <div className='w-1/2 h-1/2 flex'>
                <Image src={Card2} alt="Logo" />
            </div>
        </div>
    );
};

export default CharacterSlide;