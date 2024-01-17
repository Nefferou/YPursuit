// HeaderNav.tsx
import React from 'react';
import classes from './index.module.css';

interface HeaderNavProps {
  currentSection: number;
  scrollToSection: (sectionNumber: number) => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ currentSection, scrollToSection }) => {
  return (
    <div className={classes.headerNav}>
      <button
        className={currentSection === 1 ? classes.activeButton : ''}
        onClick={() => scrollToSection(1)}
      >
        Jouer
      </button>
      <button
        className={currentSection === 2 ? classes.activeButton : ''}
        onClick={() => scrollToSection(2)}
      >
        Projet
      </button>
      <button
        className={currentSection === 3 ? classes.activeButton : ''}
        onClick={() => scrollToSection(3)}
      >
        L'Équipe
      </button>
      <button
        className={currentSection === 4 ? classes.activeButton : ''}
        onClick={() => scrollToSection(4)}
      >
        Nos Personnages
      </button>
      <button
        className={currentSection === 5 ? classes.activeButton : ''}
        onClick={() => scrollToSection(5)}
      >
        Goodies
      </button>
      <button
        className={currentSection === 6 ? classes.activeButton : ''}
        onClick={() => scrollToSection(6)}
      >
        Nous contacter
      </button>
    </div>
  );
};

export default HeaderNav;
