import Link from 'next/link';
import React from 'react';


const HeaderNavClassic: React.FC = () => {

    return (
        <div className="flex gap-10 justify-start items-end h-20">
            <Link href="/" className= 'bg-transparent border-transparent mx-auto text-center cursor-pointer text-lg'>Retour</Link>
       </div>
    );
};

export default HeaderNavClassic;