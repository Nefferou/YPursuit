import { ChangeEvent, ReactNode } from 'react';

type LabelProps = {
    children?: ReactNode;
};

const Label = ({ children }: LabelProps) => {
    return <label>{children}</label>;
};

export { Label };

type SelectOption = {
    label: string;
    value: string;
};

type Props = {
    value?: string;
    label?: string;
    name: string;
    disabled?: boolean;
    className?: string;
    options: SelectOption[];
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectBox = ({
    value,
    label,
    disabled,
    name,
    className,
    options,
    onChange,
}: Props) => {
    const selectBox = (
        <select
            className={'border border-black rounded-md p-2 mb-2' + className}
            disabled={disabled}
            onChange={onChange}
            value={value}
            name={name}
            defaultValue={value}
        >
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );

    const result = label ? (
        <Label>
            <div>{label}</div>
            {selectBox}
        </Label>
    ) : (
        selectBox
    );

    return <div>{result}</div>;
};

export { SelectBox };
export type { SelectOption };
