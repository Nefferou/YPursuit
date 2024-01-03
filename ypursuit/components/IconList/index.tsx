import Image from 'next/image';
import Logo from '@/assets/images/insta.svg';

import classes from './index.module.css';

function IconList() {
    return (
        <div className={classes.iconList}>
            <Image src={Logo} alt="Logo" />
        </div>
    );
};

export default IconList;