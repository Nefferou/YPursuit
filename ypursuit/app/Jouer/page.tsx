
import React from 'react';
import HeaderClassic from '../../components/HeaderClassic';
import Footer from '../../components/Footer';
import PanelPlay from '../../components/PanelPlay';
import CardHawky from '@/assets/images/card/hawkyFace.svg';

export default function Home() {
  return (
    <main>
        <HeaderClassic />
        <div className='flex'>
        <PanelPlay design='solo' />
        <PanelPlay design='multi' />
        </div>
        <div className="flex justify-between items-center py-1 px-6 bg-black fixed bottom-0 w-full z-50">
          <Footer />
        </div>
    </main>
  );
}