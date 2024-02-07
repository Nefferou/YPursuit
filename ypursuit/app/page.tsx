'use client';
import React from 'react';
import MainScroll from '../components/MainScroll';
import SignInForm from '@/components/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import Card from '@/components/Card';
import Button from '@/components/ui/Buttons/Button';
import Insta from '@/assets/images/Insta.svg';

export default function Home() {
  return (
    <main className='p-8'>
      <Button
        handleClick={() => console.log('Button')}
        title="Button"
        design="double"
        backgroundColor="green"
        type="button"
        disabled={false}
        icon={Insta}
      >
        Button
      </Button>
    </main>
  );
}
