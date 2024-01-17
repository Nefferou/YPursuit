import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';

const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<number>(1);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const delta = event.deltaY;

      const direction = delta > 0 ? 1 : -1;

      const nextSection = Math.max(1, Math.min(currentSection + direction, 6));

      setCurrentSection(nextSection);
      scrollToSection(nextSection);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;

      const nextSection = Math.max(1, Math.min(currentSection + direction, 6));

      setCurrentSection(nextSection);
      scrollToSection(nextSection);
    };


    if (containerRef.current) {
      containerRef.current.addEventListener('wheel', handleWheel);
      containerRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleWheel);
        containerRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [currentSection]);

  const scrollToSection = (sectionNumber: number) => {
    const section = document.getElementById(`slide${sectionNumber}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header currentSection={currentSection} scrollToSection={scrollToSection} setCurrentSection={setCurrentSection} />
    <div ref={containerRef} tabIndex={0} autoFocus>
      <div className="slideContainer">
        <div id="slide1" className="w-full h-screen flex justify-center items-center text-8xl border-2 border-black">
          Jouer
        </div>
        <div id="slide2" className="w-full h-screen flex justify-center items-center text-8xl border-2 border-black">
          Le projet
        </div>
        <div id="slide3" className="w-full h-screen flex justify-center items-center text-8xl border-2 border-black">
          L'équipe
        </div>
        <div id="slide4" className="w-full h-screen flex justify-center items-center text-8xl border-2 border-black">
          Nos personnages
        </div>
        <div id="slide5" className="w-full h-screen flex justify-center items-center text-8xl border-2 border-black">
          Goodies
        </div>
        <div id="slide6" className="w-full h-screen flex justify-center items-center text-8xl border-2 border-black">
          Nous contacter
        </div>
      </div>
    </div>
    </div>
  );
};

export default HorizontalScroll;
