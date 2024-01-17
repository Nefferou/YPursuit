// HeaderNav.tsx
import React from 'react';
import classes from './index.module.css';

interface HeaderNavProps {
  currentSection: number;
  scrollToSection: (sectionNumber: number) => void;
  setCurrentSection: (sectionNumber: number) => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ currentSection,setCurrentSection, scrollToSection }) => {

  const changeSection = (sectionNumber: number) => {
    setCurrentSection(sectionNumber);
    scrollToSection(sectionNumber);
  }

  return (
    <div className={classes.headerNav}>
      <button
        onClick={() => changeSection(1)}
        className={currentSection === 1 ? classes.activeButton : ''}
      >
        Jouer
      </button>
      <button
        onClick={() => changeSection(2)}
        className={currentSection === 2 ? classes.activeButton : ''}
      >
        Projet
      </button>
      <button
        onClick={() => changeSection(3)}
        className={currentSection === 3 ? classes.activeButton : ''}
      >
        L'Équipe
      </button>
      <button
        onClick={() => changeSection(4)}
        className={currentSection === 4 ? classes.activeButton : ''}
      >
        Nos Personnages
      </button>
      <button
        onClick={() => changeSection(5)}
        className={currentSection === 5 ? classes.activeButton : ''}
      >
        Goodies
      </button>
      <button
        onClick={() => changeSection(6)}
        className={currentSection === 6 ? classes.activeButton : ''}
      >
        Nous contacter
      </button>
    </div>
  );
};

export default HeaderNav;
