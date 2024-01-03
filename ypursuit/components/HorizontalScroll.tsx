import React, { useRef, useEffect, useState } from 'react';

const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<number>(1);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const delta = event.deltaY;

      const direction = delta > 0 ? 1 : -1;

      const nextSection = Math.max(1, Math.min(currentSection + direction, 4));

      setCurrentSection(nextSection);
      scrollToSection(nextSection);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleWheel);
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
    <div ref={containerRef}>
      <div className="slideContainer">
        <div id="slide1" className="w-screen h-screen flex justify-center items-center text-8xl border-2 border-black">
          Homepage
          <button onClick={() => scrollToSection(2)}>
            <br />
            Go to section 2
          </button>
        </div>
        <div id="slide2" className="w-screen h-screen flex justify-center items-center text-8xl border-2 border-black">
          Le projet
        </div>
        <div id="slide3" className="w-screen h-screen flex justify-center items-center text-8xl border-2 border-black">
          About Us
        </div>
        <div id="slide4" className="w-screen h-screen flex justify-center items-center text-8xl border-2 border-black">
          More
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
