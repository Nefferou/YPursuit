
import React from 'react';
import HeaderClassic from '../../components/HeaderClassic';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <main>
      <HeaderClassic />
      <div className="flex justify-between items-center py-1 px-6 bg-black fixed bottom-0 w-full z-50">
        <Footer />
      </div>

    </main>
  );
}