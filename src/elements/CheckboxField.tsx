import React, { useState } from 'react';
import LabelField from './LabelField';

interface CheckboxFieldProps {
  label: string;
  id?: any;
  name?: string;
  checked?: boolean;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, id, name, checked = false, onChange, className }) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Handle the checkbox state change
  const handleChange = (event: any) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <div className={`flex ${className}`}>
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={isChecked}
        onChange={handleChange}
        className="mr-2"
      />
      <LabelField htmlFor={id} label={label} />
    </div>


  );
};

export default CheckboxField;
