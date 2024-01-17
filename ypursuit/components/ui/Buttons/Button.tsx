'use client'
import { ReactNode } from "react";

// How to use:
{/* <Button
    handleClick={() => console.log('click')}
    title="title"
    design="double"
    backgroundColor='white'
>
    REJOINDRE NOS RÉSEAUX
</Button> */}

type ButtonDesignType = 'simple' | 'double';
type BackgroundColorType = 'green' | 'white';

interface ButtonProps {
    children: ReactNode,
    handleClick: () => void,
    backgroundColor?: BackgroundColorType,
    design?: ButtonDesignType,
    icon?: string,
    type?: 'button' | 'submit' | 'reset',
    title: string,
    disabled?: boolean,
    styles?: string,
}

const SimpleButton = ({ children, handleClick, styles, type, title, disabled, backgroundColor }: ButtonProps) => {
    switch (backgroundColor) {
        case 'green':
            return <button
                className={`px-6 py-3 font-bold ${styles} bg-greenPrimary text-white hover:bg-white hover:text-black transition duration-300 ease-out border-2 border-black rounded-md`}
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                {children}
            </button>
        case 'white':
            return <button
                className={`px-6 py-3 font-bold ${styles} bg-white text-black hover:bg-greenPrimary hover:text-white transition duration-300 ease-out border-2 border-black rounded-md`}
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                {children}
            </button>
        default:
            return <button
                className={`px-6 py-3 font-bold ${styles} bg-greenPrimary text-white hover:bg-white hover:text-black transition duration-300 ease-out border-2 border-black rounded-md`}
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                {children}
            </button>
    }
}

const DoubleButton = ({ children, handleClick, type, title, disabled, backgroundColor, styles }: ButtonProps) => {
    switch (backgroundColor) {
        case 'green':
            return <button
                className="relative px-6 py-3 font-bold group"
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                <span className={`absolute inset-0 w-11/12 h-full transition duration-300 ease-out transform -translate-x-0 -translate-y-4 group-hover:translate-y-0 m-auto border-2 rounded-md border-black`}></span>
                <span className={`absolute inset-0 w-full h-full border-2 rounded-md border-black transition duration-300 ease-out bg-greenPrimary text-white group-hover:bg-white`}></span>
                <span className="relative group-hover:text-black transition duration-300 ease-out">{children}</span>
            </button>
        case 'white':
            return <button
                className="relative px-6 py-3 font-bold group"
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                <span className={`absolute inset-0 w-11/12 h-full transition duration-300 ease-out transform -translate-x-0 -translate-y-4 group-hover:translate-y-0 m-auto border-2 rounded-md border-black bg-greenPrimary`}></span>
                <span className={`absolute inset-0 w-full h-full border-2 rounded-md border-black bg-white group-hover:bg-greenPrimary transition duration-300 ease-out`}></span>
                <span className="relative group-hover:text-black transition duration-300 ease-out">{children}</span>
            </button>
        default:
            return <button
                className="relative px-6 py-3 font-bold group"
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                <span className={`absolute inset-0 w-11/12 h-full transition duration-300 ease-out transform -translate-x-0 -translate-y-4 group-hover:translate-y-0 m-auto border-2 rounded-md border-black`}></span>
                <span className={`absolute inset-0 w-full h-full border-2 rounded-md border-black transition duration-300 ease-out bg-greenPrimary text-white group-hover:bg-white`}></span>
                <span className="relative group-hover:text-black transition duration-300 ease-out">{children}</span>
            </button>
    }
}

export default function Button({ children, handleClick, styles, design, type, title, disabled, backgroundColor }: ButtonProps) {
    switch (design) {
        case 'simple':
            return <SimpleButton
                handleClick={handleClick}
                styles={styles}
                type={type}
                title={title}
                disabled={disabled}
                backgroundColor={backgroundColor}
            >
                {children}
            </SimpleButton>
        case 'double':
            return <DoubleButton
                handleClick={handleClick}
                styles={styles}
                type={type}
                title={title}
                disabled={disabled}
                backgroundColor={backgroundColor}
            >
                {children}
            </DoubleButton>
        default:
            return <SimpleButton
                handleClick={handleClick}
                styles={styles}
                type={type}
                title={title}
                disabled={disabled}
                backgroundColor={backgroundColor}
            >
                {children}
            </SimpleButton>
    }
}