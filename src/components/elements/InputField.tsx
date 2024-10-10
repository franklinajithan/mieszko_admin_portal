import React, { useState } from 'react';
import LabelField from './LabelField';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormMessage } from '@/components/ui/form';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Define a type for dynamic field paths
type FieldPathWithDynamicKey<T extends FieldValues> = FieldPath<T> | `${FieldPath<T>}[${number}].${string}`;

interface InputFieldProps<T extends FieldValues> {
    name: FieldPathWithDynamicKey<T>;
    control: Control<T>;
    label: string;
    type: 'text' | 'number' | 'date' | 'email' | 'time' | 'password' | 'tel' | 'url';
    placeholder?: string;
    value?: string | number;
    disabled?: boolean;
    readonly?: boolean;
    id?: string;
    clipboard?: boolean; 
    verify?: boolean; 
    showPasswordToggle?: boolean; 
    clearInput?: boolean;
    required?: boolean;
    canView?: boolean; // New prop for visibility permission
    canEdit?: boolean; // New prop for edit permission
}

const InputField = <T extends FieldValues>({
    label,
    type = 'text',
    name,
    placeholder,
    control,
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
}: InputFieldProps<T>) => {
    const [copied, setCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(type === 'password');

    const { field } = useController({
        name: name as FieldPath<T>,
        control,
    });

    const handleCopy = (value: string | number) => {
        navigator.clipboard.writeText(value.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClear = () => {
        field.onChange(type === 'number' ? 0 : ''); // Clear based on type
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = type === 'number' ? Number(e.target.value) : e.target.value;
        field.onChange(value); // Ensure the value is number if type is 'number'
    };

    if (!canView) {
        return null; // If the user doesn't have view permission, hide the field
    }

    return (
        <FormField
            control={control}
            name={name as FieldPath<T>}
            render={() => (
                <div className='form-item w-full'>
                    <LabelField label={label} htmlFor={name} required={required}/>
                    
                    <FormControl className='relative'>
                        <div className='relative w-full'>
                            <Input
                                id={id}
                                placeholder={placeholder}
                                autoComplete='off'
                                className='input-class pr-24 form-control'
                                disabled={disabled || !canEdit}
                                readOnly={readonly || !canEdit}
                                type={showPassword ? 'text' : type}
                                value={field.value ?? (type === 'number' ? 0 : '')}
                                onChange={handleChange} // Use custom handleChange for number inputs
                                style={{ paddingRight: '40px' }}
                            />
                            {clipboard && (
                                <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                                    <IconButton
                                        onClick={() => handleCopy(field.value ?? '')}
                                        className='absolute right-12 top-0 h-full'
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(0%)',
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
                                            transform: 'translateY(0%)',
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
                                            transform: 'translateY(0%)',
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
                                            transform: 'translateY(0%)',
                                            padding: '0',
                                        }}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage className='form-message mt-2' />
                </div>
            )}
        />
    );
};

export default InputField;
