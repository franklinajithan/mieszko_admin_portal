import React from 'react';
import LabelField from './LabelField';

interface SelectFieldProps {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

const SelectField = ({
    label,
    options,
    value,
    onChange,
    className,
}: SelectFieldProps) => {
    return (
        
        <div className={`relative ${className}`}>
            <LabelField label={label}/>
          <select id={label} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={value}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
    );
};

export default SelectField;
