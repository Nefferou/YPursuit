
import React from 'react';
import HeaderClassic from '../../components/HeaderClassic';
import Footer from '../../components/Footer';
import PanelPlay from '../../components/PanelPlay';

export default function Home() {
  return (
    <main>
        <HeaderClassic />
        <div className="flex bg-black m-3 w-full h-30 ">
        </div>
        <div className='flex'>
        <PanelPlay design='solo' />
        <PanelPlay design='multi' />
        </div>
        <Footer />
    </main>
  );
}