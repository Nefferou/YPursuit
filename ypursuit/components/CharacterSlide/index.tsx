import React, { useState } from 'react';
import Image from 'next/image';
import CardArtchy from '@/assets/images/card/artchyPile.svg';
import CardBuzzy from '@/assets/images/card/buzzyPile.svg';
import CardDally from '@/assets/images/card/dallyPile.svg';
import CardArtchyFace from '@/assets/images/card/artchyFace.svg';
import CardBuzzyFace from '@/assets/images/card/buzzyFace.svg';
import CardDallyFace from '@/assets/images/card/dallyFace.svg';
import CardHawky from '@/assets/images/card/hawkyPile.svg';
import CardHawkyFace from '@/assets/images/card/hawkyFace.svg';
import CardKroky from '@/assets/images/card/krokyPile.svg';
import CardKrokyFace from '@/assets/images/card/krokyFace.svg';
import CardLully from '@/assets/images/card/lulyPile.svg';
import CardLullyFace from '@/assets/images/card/lulyFace.svg';

const CharacterSlide = () => {
    const [hoverStates, setHoverStates] = useState([false, false, false]);
    const [startIndex, setStartIndex] = useState(0);

    const handleMouseEnter = (index: number) => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = true;
        setHoverStates(newHoverStates);
    };

    const handleMouseLeave = (index: number) => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = false;
        setHoverStates(newHoverStates);
    };

    const cards = [
        { front: CardArtchy, back: CardArtchyFace },
        { front: CardBuzzy, back: CardBuzzyFace },
        { front: CardDally, back: CardDallyFace },
        { front: CardHawky, back: CardHawkyFace },
        { front: CardKroky, back: CardKrokyFace },
        { front: CardLully, back: CardLullyFace },
    ];

    const showNextImages = () => {
        console.log("Showing next images");
        if (startIndex < cards.length - 3) {
            setStartIndex(startIndex + 1);
        }
    };

    const showPreviousImages = () => {
        console.log("Showing previous images");
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div id="slide4" className="w-full h-screen flex justify-center items-center border-y border-black relative">
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-5xl" onClick={showPreviousImages}>{'<'}</button>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-5xl" onClick={showNextImages}>{'>'}</button>
            {cards.slice(startIndex, startIndex + 3).map((card, index) => (
                <div key={index} className='w-1/2 h-1/2 flex transition-transform transform-gpu hover:rotate-[360deg]'
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}>
                    <Image src={hoverStates[index] ? card.back : card.front} alt="Logo" />
                </div>
            ))}
        </div>
    );
};

export default CharacterSlide;
