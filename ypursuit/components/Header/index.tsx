import LogoYPursuit from '../LogoYPursuit';
import HeaderNav from '../HeaderNav';
import IconList from '../IconList';

import classes from './index.module.css';

interface HeaderProps {
  currentSection: number;
  scrollToSection: (sectionNumber: number) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, scrollToSection }) => {
  return (
    <div className={classes.header} style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <div className={classes.headerTwo}>
        <LogoYPursuit />
        <IconList
        />
      </div>
      <HeaderNav
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />
    </div>
  );
};

export default Header;
