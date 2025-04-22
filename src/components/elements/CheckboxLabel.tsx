import React from 'react';
import LabelField from './LabelField';
import { Checkbox } from '../ui/checkbox';

interface CheckboxLabelProps {
    name: string;
    label: string;
    checked: boolean;
    onChange: () => void;
    className?: string;
}

const CheckboxLabel: React.FC<CheckboxLabelProps> = ({ label, checked, onChange, className = '' }) => (
    <div className="">
        <label className={`flex items-center mb-2 ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mr-2 "
            />
            {label}
        </label>



    </div>




);

export default CheckboxLabel;
