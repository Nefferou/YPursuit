import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';
import AB from '@/assets/images/teams/AB.svg';
import AV from '@/assets/images/teams/AV.svg';
import CB from '@/assets/images/teams/CB.svg';
import CV from '@/assets/images/teams/CV.svg';
import EB from '@/assets/images/teams/EB.svg';
import JF from '@/assets/images/teams/JF.svg';
import LL from '@/assets/images/teams/LL.svg';
import MJ from '@/assets/images/teams/MJ.svg';
import MM from '@/assets/images/teams/MM.svg';
import QS from '@/assets/images/teams/QS.svg';
import RC from '@/assets/images/teams/RC.svg';
import SC from '@/assets/images/teams/SC.svg';
import YE from '@/assets/images/teams/YE.svg';

const images = [
    { src: AB, alt: 'AB' },
    { src: AV, alt: 'AV' },
    { src: CB, alt: 'CB' },
    { src: CV, alt: 'CV' },
    { src: EB, alt: 'EB' },
    { src: JF, alt: 'JF' },
    { src: LL, alt: 'LL' },
    { src: MJ, alt: 'MJ' },
    { src: MM, alt: 'MM' },
    { src: QS, alt: 'QS' },
    { src: RC, alt: 'RC' },
    { src: SC, alt: 'SC' },
    { src: YE, alt: 'YE' },
];

const SwipeCarousel = () => {
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [startIndex, setStartIndex] = useState(0);

    const handleMouseEnter = (index: number) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(-1);
    };

    const showNextImages = () => {
        console.log("Showing next images");
        if (startIndex < images.length - 3) {
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
        <div className="w-full h-screen flex justify-center items-center border-y border-black relative">
            <motion.button className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-5xl" onClick={showPreviousImages}>{'<'}</motion.button>
            <motion.button className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-5xl" onClick={showNextImages}>{'>'}</motion.button>
            {images.slice(startIndex, startIndex + 3).map((image, index) => (
                <motion.div key={index} className='w-1/2 h-1/2 flex'
                    onMouseEnter={() => handleMouseEnter(startIndex + index)}
                    onMouseLeave={handleMouseLeave}>
                    <motion.div className={`${hoverIndex === startIndex + index}`}>
                        <Image src={(hoverIndex === startIndex + index) ? image.src : image.src} alt={image.alt} width={407} height={287} />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default SwipeCarousel;