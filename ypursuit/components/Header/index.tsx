import LogoYPursuit from '../LogoYPursuit';
import HeaderNav from '../HeaderNav';
import IconList from '../IconList';

import classes from './index.module.css';

function Header() {

    return (
        <div className={classes.header}>
            <div className={classes.headerTwo}>
                <LogoYPursuit />
                <IconList />
            </div>
            <HeaderNav />
        </div>
    );
};

export default Header;
