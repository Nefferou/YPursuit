'use client';
import React, { useRef, useEffect, useState, useCallback, ReactNode } from 'react';
import Header from '../Header';
import CharacterSlide from '../CharacterSlide';
import Hero from '../Hero';
import ProjectSection from '../Project';

const MAX_SECTION = 6;

interface SlideProps {
  id: number;
  children: ReactNode;
}

const Slide: React.FC<SlideProps> = ({ id, children }) => (
  <div id={`slide${id}`} className="w-screen h-screen flex justify-center items-center">
    {children}
  </div>
);

const MainSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<number>(1);

  const calculateNextSection = useCallback((direction: number) => {
    return Math.max(1, Math.min(currentSection + direction, MAX_SECTION));
  }, [currentSection]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextSection = calculateNextSection(direction);
      setCurrentSection(nextSection);
      scrollToSection(nextSection);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
      const nextSection = calculateNextSection(direction);
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
  }, [calculateNextSection]);

  const scrollToSection = (sectionNumber: number) => {
    const section = document.getElementById(`slide${sectionNumber}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} tabIndex={0}>
      <Header currentSection={currentSection} scrollToSection={scrollToSection} setCurrentSection={setCurrentSection} />
      <div className="slideContainer">
        <Slide key={1} id={1}>
          <Hero />
        </Slide>
        <Slide key={2} id={2}>
          <ProjectSection />
        </Slide>
        <Slide key={3} id={3}>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-8xl">Hello</h1>
            <h2 className="text-6xl">Hello, cest Carlos</h2>
          </div>
        </Slide>
        <Slide key={4} id={4}>
          <CharacterSlide />
        </Slide>
        <Slide key={5} id={5}>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-8xl">Hello</h1>
            <h2 className="text-6xl">Hello, cest Carlos</h2>
          </div>
        </Slide>
        <Slide key={6} id={6}>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-8xl">Hello</h1>
            <h2 className="text-6xl">Hello, cest Carlos</h2>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default MainSection;