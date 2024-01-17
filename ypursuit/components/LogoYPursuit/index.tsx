import Image from 'next/image';
import Logo from '@/assets/images/logoWhite.svg';
import classes from './index.module.css';

function LogoYPursuit() {
    return (
        <div className={classes.logoYPursuit}>
            <Image src={Logo} alt="Logo" />
        </div>
    );
};

export default LogoYPursuit;
