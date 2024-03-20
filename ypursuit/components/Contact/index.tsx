'use client'

import React, { useState } from 'react'
import Button from '../ui/Buttons/Button'
import { InputContact, TextAreaContact } from '../ui/Inputs'

const Contact = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const handleSubmit = () => {
        console.log('Click')
    }

    return (
        <div id="slide6" className="w-full h-screen flex justify-center items-center flex-col border-black border-2">
            <div className="w-full flex justify-start items-center pl-12 pb-12">
                <h2 className="text-4xl font-bold">NOUS CONTACTER</h2>
            </div>
            <div className='w-full grid gap-4 grid-cols-2 pl-12'>
                <div className='flex items-center justify-center'>
                    <p>
                        Pour toute question, demande d&apos;information ou en cas de problème rencontré avec nos jeux captivants de Ypursuite, nous vous encourageons vivement à utiliser notre formulaire de contact dédié. Il vous suffit de remplir les champs requis avec vos coordonnées et de détailler votre question ou problème. Notre équipe dévouée se fera un plaisir de vous assister dans les plus brefs délais, garantissant ainsi une expérience ludique et fluide pour tous nos utilisateurs.

                        Merci de nous faire part de vos retours, nous sommes là pour vous aider à profiter pleinement de l&apos;univers passionnant de Ypursuite.
                    </p>
                </div>
                <div className='flex items-center justify-center'>
                    <form className='flex flex-col gap-2'>
                        <InputContact
                            type="email"
                            label="VOTRE MAIL"
                            value={email}
                            name="email"
                            placeholder="VOTRE MAIL"
                            error=""
                            onChange={handleEmail}
                            disabled={false}
                        />
                        <TextAreaContact
                            value={message}
                            onChange={handleMessage}
                            disabled={false}
                        />
                        <Button
                            handleClick={handleSubmit}
                            title="Button"
                            design="simple"
                            backgroundColor="green"
                            type="button"
                            disabled={false}
                        >
                            ENVOYER
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact