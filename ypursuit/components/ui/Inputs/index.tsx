import { ChangeEvent } from "react";

interface InputContactProps {
    type: 'text' | 'email' | 'number' | 'password',
    label: string,
    value?: string | number,
    name: string,
    placeholder: string,
    error: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled: boolean,
    required: boolean,
}

const InputContact = ({ type, label, value, name, placeholder, error, onChange, disabled, required }: InputContactProps) => {
    return (
        <div className="border-2 rounded-md">
            <label className="bg-greenPrimary font-bold p-3 border-2 rounded-md text-white">{label}</label>
            <input
                type={type}
                id={label}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                className="p-3"
                required={required}
                defaultValue={value}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    )
}

interface TextAreaContactProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    disabled: boolean,
    value: string | number,
}

const TextAreaContact = ({ onChange, disabled, value }: TextAreaContactProps) => {
    return (
        <div className="border-2 rounded-md">
            <textarea placeholder='TAPEZ VOTRE TEXTE...' className="p-6" onChange={onChange} disabled={disabled} value={value} />
        </div>
    )
}

export { InputContact, TextAreaContact };