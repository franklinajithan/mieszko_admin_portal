import React, { useState, useEffect } from 'react';
import LabelField from './LabelField';
import { Input } from '@/components/ui/input';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface InputFieldProps {
    name: string; // Simplified to just a string for name
    label: string;
    statement?: any;
    type: 'text' | 'number' | 'date' | 'email' | 'time' | 'password' | 'tel' | 'url';
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    id?: string;
    clipboard?: boolean; 
    verify?: boolean; 
    showPasswordToggle?: boolean; 
    clearInput?: boolean;
    required?: boolean;
    canView?: boolean; 
    canEdit?: boolean; 
    minLength?: number;
    maxLength?: number;
    value?: string | number; // Accept external value
    onChange?: (value: string | number) => void; // Custom onChange handler
}

const InputField = ({
    label,
    type = 'text',
    name,
    placeholder,
    statement,
    disabled,
    readonly = false,
    id = name,
    clipboard = false,
    verify = false,
    showPasswordToggle = false,
    clearInput = false,
    required = false,
    canView = true,
    canEdit = true,
    minLength, 
    maxLength, 
    value = '', // Default value
    onChange, // Destructure the custom onChange prop
}: InputFieldProps) => {
    const [inputValue, setInputValue] = useState(value); // Local state for input value
    const [copied, setCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(type === 'password');

    useEffect(() => {
        setInputValue(value); // Update local state when external value changes
    }, [value]);

    const handleCopy = (value: string | number) => {
        navigator.clipboard.writeText(value.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClear = () => {
        const clearedValue = type === 'number' ? 0 : '';
        setInputValue(clearedValue);
        if (onChange) {
            onChange(clearedValue); // Call custom onChange if provided
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
        setInputValue(newValue); // Update local state
        if (onChange) {
            onChange(newValue); // Call custom onChange if provided
        }
    };

    if (!canView) {
        return null; // If the user doesn't have view permission, hide the field
    }

    return (
        <div className='form-item w-full'>
            <LabelField label={label} htmlFor={name} required={required} />
            <div className='relative w-full'>
                <Input
                    id={id}
                    placeholder={placeholder}
                    autoComplete='off'
                    className='input-class pr-24'
                    disabled={disabled || !canEdit}
                    readOnly={readonly || !canEdit}
                    type={showPassword ? 'text' : type}
                    value={inputValue} // Use local state for value
                    onChange={handleChange} // Use custom handleChange
                    style={{ paddingRight: '40px' }}
                    minLength={minLength} 
                    maxLength={maxLength} 
                />
                {clipboard && (
                    <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <IconButton
                            onClick={() => handleCopy(inputValue)}
                            className='absolute right-12 top-0 h-full'
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '0',
                            }}
                        >
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {verify && (
                    <Tooltip title='Verified'>
                        <IconButton
                            className='absolute right-0 top-0 h-full'
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '0',
                                color: 'green',
                            }}
                        >
                            <CheckCircleIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {showPasswordToggle && type === 'password' && (
                    <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                        <IconButton
                            onClick={togglePasswordVisibility}
                            className='absolute right-16 top-0 h-full'
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '0',
                            }}
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </Tooltip>
                )}
                {clearInput && (
                    <Tooltip title='Clear'>
                        <IconButton
                            onClick={handleClear}
                            className='absolute right-24 top-0 h-full'
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '0',
                            }}
                        >
                            <CancelIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
          {statement !==0 && <div className='form-message mt-2' >{statement}</div>}  
        </div>
    );
};

export default InputField;
