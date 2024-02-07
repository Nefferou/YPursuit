import React, { useState } from 'react';
import Image from 'next/image';
import CardArtchy from '@/assets/images/card/artchyPile.svg';
import CardBuzzy from '@/assets/images/card/buzzyPile.svg';
import CardArtchyFace from '@/assets/images/card/artchyFace.svg'
import CardBuzzyFace from '@/assets/images/card/buzzyFace.svg'

const CharacterSlide = () => {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    return (
        <div id="slide4" className="w-full h-screen flex justify-center items-center border-y border-black">
            <div className='w-1/2 h-1/2 flex transition-transform transform-gpu hover:rotate-[360deg]'>
                <Image 
                    src={isHovered1 ? CardArtchyFace : CardArtchy } 
                    alt="Logo"
                    onMouseEnter={() => setIsHovered1(true)}
                    onMouseLeave={() => setIsHovered1(false)}
                />
            </div>
            <div className='w-1/2 h-1/2 flex transition-transform transform-gpu hover:rotate-[360deg]'>
                <Image 
                    src={isHovered2 ? CardBuzzyFace : CardBuzzy } 
                    alt="Logo" 
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                />
            </div>
        </div>
    );
};

export default CharacterSlide;
