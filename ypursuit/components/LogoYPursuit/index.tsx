import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';

function LogoYPursuit() {
    return (
        <div className="w-auto h-auto flex">
            <Image src={Logo} alt="Logo" />
        </div>
    );
};

export default LogoYPursuit;
