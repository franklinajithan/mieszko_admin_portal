import React, { useState } from 'react';
import LabelField from './LabelField';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormMessage } from '@/components/ui/form';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Import the calendar icon
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface InputFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label: string;
    type: 'text' | 'number' | 'date' | 'email' | 'time' | 'password' | 'tel' | 'url';
    placeholder?: string;
    value?: string | number;
    disabled?: boolean;
    readonly?: boolean;
    id?: string;
    clipboard?: boolean; 
  
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

}: InputFieldProps<T>) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (value: string | number) => {
        navigator.clipboard.writeText(value?.toString() || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item w-full'>
                    <LabelField label={label} htmlFor={name} />
                    <FormControl className='relative'>
                        <div className='relative w-full'>
                            <Input
                                id={id}
                                placeholder={placeholder}
                                autoComplete='off'
                                className='input-class pr-16' // Increase padding to the right for both icons
                                disabled={disabled}
                                readOnly={readonly}
                                type={type}
                                {...field}
                                value={field.value as any}
                                style={{ paddingRight: '40px' }} // Add space for the icons inside the input
                            />
                            {clipboard && (
                                <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                                    <IconButton
                                        onClick={() => handleCopy(field.value)}
                                        className='absolute right-12 top-0 h-full'
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(0%)',
                                            padding: '0',
                                            color: 'zinc'
                                        }}
                                    >
                                        <ContentCopyIcon />
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
