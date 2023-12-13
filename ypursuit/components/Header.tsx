'using client';
import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header >
            <nav className="flex items-center justify-between">
                <ul className="flex space x-4 ">
                    <li className="m-2 p-4 transition-colors duration-300 bg-gray-300 hover:bg-green-500 rounded-md">
                        <Link href="/" className="text-white hover:text-gray-300">Home
                        </Link>
                    </li>
                    <li className="m-2 p-4 transition-colors duration-300 bg-gray-300 hover:bg-green-500 rounded-md">
                        <Link href="/login" className="text-white hover:text-gray-300">Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
