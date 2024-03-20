import React, { useState } from 'react';
import Image from 'next/image';
import CardArtchy from '@/assets/images/card/artchyBack.png';
import CardArtchyFace from '@/assets/images/card/artchyFront.png';
import CardBuzzy from '@/assets/images/card/buzzyBack.png';
import CardBuzzyFace from '@/assets/images/card/buzzyFront.png';
import CardDally from '@/assets/images/card/dallyBack.png';
import CardDallyFace from '@/assets/images/card/dallyFront.png';
import CardHawky from '@/assets/images/card/hawkyBack.png';
import CardHawkyFace from '@/assets/images/card/hawkyFront.png';
import CardWapy from '@/assets/images/card/wapyBack.png';
import CardWapyFace from '@/assets/images/card/wapyFront.png';
import CardLuly from '@/assets/images/card/lulyBack.png';
import CardLulyFace from '@/assets/images/card/lulyFront.png';

const CharacterSlide = () => {
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [startIndex, setStartIndex] = useState(0);

    const handleMouseEnter = (index: number) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(-1);
    };

    const cards = [
        { front: CardArtchy, back: CardArtchyFace },
        { front: CardBuzzy, back: CardBuzzyFace },
        { front: CardDally, back: CardDallyFace },
        { front: CardHawky, back: CardHawkyFace },
        { front: CardWapy, back: CardWapyFace },
        { front: CardLuly, back: CardLulyFace },
    ];

    const showNextImages = () => {
        console.log("Showing next images");
        if (startIndex < cards.length - 3) {
            setStartIndex(startIndex + 3);
        }
    };

    const showPreviousImages = () => {
        console.log("Showing previous images");
        if (startIndex > 0) {
            setStartIndex(startIndex - 3);
        }
    };

    return (
        <div id="slide4" className="w-full h-screen flex justify-center items-center border-y border-black relative">
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-5xl" onClick={showPreviousImages}>{'<'}</button>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-5xl" onClick={showNextImages}>{'>'}</button>
            {cards.slice(startIndex, startIndex + 3).map((card, index) => (
                <div key={index} className='w-1/2 h-1/2 flex ease-in-out duration-150 hover:[transform:rotateY(180deg)]'
                    onMouseEnter={() => handleMouseEnter(startIndex + index)}
                    onMouseLeave={handleMouseLeave}>
                    <div className={` ${hoverIndex === startIndex + index && '[transform:rotateY(180deg)]'}`}>
                        <Image src={(hoverIndex === startIndex + index) ? card.back : card.front} alt="Logo" width={407} height={287} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterSlide;
