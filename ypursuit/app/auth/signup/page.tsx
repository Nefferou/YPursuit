import SignUpForm from '@/components/auth/SignUpForm'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-3xl'>
            Sign up
        </h1>
        <SignUpForm />
    </div>
  )
}

export default SignUpPage