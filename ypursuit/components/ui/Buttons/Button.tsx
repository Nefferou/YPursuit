'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { ReactElement, ReactNode } from "react";

// How to use:
{/* <Button
    handleClick={() => console.log('Button')}
    title="Button"
    design="simple"
    backgroundColor="green"
    type="button"
    disabled={false}
    styles="text-white"
>
    Button
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

const SimpleButton = ({ children, handleClick, styles, type, title, disabled, backgroundColor, icon }: ButtonProps) => {
    switch (backgroundColor) {
        case 'green':
            return <button
                className={`px-6 py-3 font-bold ${styles} bg-greenPrimary text-white hover:bg-white hover:text-black transition duration-300 ease-out border-2 border-black rounded-md`}
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                <div className="flex items-center justify-center flex-row">
                    {children}
                    {
                        icon &&
                        <Image src={icon || ""} alt="icon" width={20} height={20} className="ml-2" />
                    }
                </div>
            </button>
        case 'white':
            return <button
                className={`px-6 py-3 font-bold ${styles} bg-white text-black hover:bg-greenPrimary hover:text-white transition duration-300 ease-out border-2 border-black rounded-md`}
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                <div className="flex items-center justify-center flex-row">
                    {children}
                    {
                        icon &&
                        <Image src={icon || ""} alt="icon" width={20} height={20} className="ml-2" />
                    }
                </div>
            </button>
        default:
            return <button
                className={`px-6 py-3 font-bold ${styles} bg-greenPrimary text-white hover:bg-white hover:text-black transition duration-300 ease-out border-2 border-black rounded-md`}
                onClick={handleClick}
                type={type}
                title={title}
                disabled={disabled}
            >
                <div className="flex items-center justify-center flex-row">
                    {children}
                    {
                        icon &&
                        <Image src={icon || ""} alt="icon" width={20} height={20} className="ml-2" />
                    }
                </div>
            </button>
    }
}

const DoubleButton = ({ children, handleClick, type, title, disabled, backgroundColor, icon }: ButtonProps) => {
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
                <span className={`absolute inset-0 w-full h-full border-2 rounded-md border-black transition duration-300 ease-out bg-greenPrimary group-hover:bg-white`}></span>
                <span className="relative group-hover:text-black transition duration-300 ease-out text-white">
                    <div className="flex items-center justify-center flex-row">
                        {children}
                        {
                            icon &&
                            <Image src={icon || ""} alt="icon" width={20} height={20} className="ml-2" />
                        }
                    </div>
                </span>
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
                <span className="relative group-hover:text-black transition duration-300 ease-out">
                    <div className="flex items-center justify-center flex-row">
                        {children}
                        {
                            icon &&
                            <Image src={icon || ""} alt="icon" width={20} height={20} className="ml-2" />
                        }
                    </div>
                </span>
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
                <span className="relative group-hover:text-black transition duration-300 ease-out">
                    <div className="flex items-center justify-center flex-row">
                        {children}
                        {
                            icon &&
                            <Image src={icon || ""} alt="icon" width={20} height={20} className="ml-2" />
                        }
                    </div>
                </span>
            </button>
    }
}

export default function Button({ children, handleClick, styles, design, type, title, disabled, backgroundColor, icon }: ButtonProps) {
    switch (design) {
        case 'simple':
            return <SimpleButton
                handleClick={handleClick}
                styles={styles}
                type={type}
                title={title}
                disabled={disabled}
                backgroundColor={backgroundColor}
                icon={icon}
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
                icon={icon}
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
                icon={icon}
            >
                {children}
            </SimpleButton>
    }
}