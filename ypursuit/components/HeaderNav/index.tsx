import React from 'react';

interface HeaderNavProps {
  currentSection: number;
  scrollToSection: (sectionNumber: number) => void;
  setCurrentSection: (sectionNumber: number) => void;
}

const sections = [
  { id: 1, name: 'JOUER' },
  { id: 2, name: 'PROJET' },
  { id: 3, name: 'L\'ÉQUIPE' },
  { id: 4, name: 'NOS PERSONNAGES' },
  { id: 5, name: 'GOODIES' },
  { id: 6, name: 'NOUS CONTACTER' },
];

const HeaderNav: React.FC<HeaderNavProps> = ({ currentSection, setCurrentSection, scrollToSection }) => {

  const changeSection = (sectionNumber: number) => {
    setCurrentSection(sectionNumber);
    scrollToSection(sectionNumber);
  }

  return (
    <div className="flex gap-10 justify-start items-end h-20">
      {sections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => changeSection(section.id)}
            className={`bg-transparent border-transparent mx-auto text-center cursor-pointer text-lg ${currentSection === section.id ? 'font-bold' : ''}`}
          >
            {section.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default HeaderNav;