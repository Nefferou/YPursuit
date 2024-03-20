import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logoWhite.svg";
import Twitter from "@/assets/images/icones/twitter.svg";
import Instagram from "@/assets/images/icones/instagram.svg";
import TikTok from "@/assets/images/icones/tiktok.svg";


const Footer = () => {
    return (
        <div className="flex justify-between items-center py-1 px-6 bg-black fixed bottom-0 w-full h-16 z-50">
            <div className="flex h-20">
                <div className="flex  items-center">
                    <Image src={Logo} alt="Logo" width={100} height={100} />
                </div>
                <div className="flex  items-center">
                    <Image src={Twitter} alt="Twitter" width={100} height={100} />
                </div>
                <div className="flex items-center">
                    <Image src={Instagram} alt="Instagram" width={100} height={100} />
                </div>
                <div className="flex items-center">
                    <Image src={TikTok} alt="TikTok" width={100} height={100} />
                </div>
                <div className="flex items-center">
                    <Link href="/" className="text-white font-bold ml-10 ">Mentions légales</Link>
                </div>
                <div className="flex items-center">
                    <Link href="/" className="text-white font-bold ml-20 ">@2024 YPursuit</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;

