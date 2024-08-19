import React from 'react';
import LabelField from './LabelField';

interface InputFieldProps {
    label: string;
    type: 'text' | 'number' | 'date' | 'email' | 'time';
    placeholder?: string;
    defaultValue?: string;
    value?: string | number;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputField = ({
    label,
    type,
    placeholder = 'Type ' + label,
    defaultValue,
    value,
    disabled,
    onChange,
    className,
}: InputFieldProps) => {
    return (

        <>
            <div>
                <LabelField label={label} />
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
                />
            </div>
        </>
    );
};

export default InputField;
