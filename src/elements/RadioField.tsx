import React from 'react';

interface RadioFieldProps {
    id: string;
    name: string;
    value?: string; // Optional, as it might not be required in some cases
    checked?: boolean; // Optional, as it might not always be needed
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional, as not all radios need an onChange handler
    label: string;
    defaultChecked?: boolean; // Optional, as it might not always be provided
}

// Define the RadioWithLabel component with typed props
const RadioField: React.FC<RadioFieldProps> = ({
    id,
    name,
    value,
    checked,
    onChange,
    label,
    defaultChecked
}) => {
    return (
        <div className="flex items-center mr-4">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                defaultChecked={defaultChecked}
                className="mr-2"
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default RadioField;
