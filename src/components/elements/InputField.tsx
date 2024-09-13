import React, { useState } from 'react';
import LabelField from './LabelField';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormMessage } from '@/components/ui/form';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
    required?: boolean;  // Add a prop for required
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
    required = false,  // Set default to false
}: InputFieldProps<T>) => {
    const [copied, setCopied] = useState(false);

    const { field } = useController({
        name: name as FieldPath<T>, 
        control,
    });

    const handleCopy = (value: string | number) => {
        navigator.clipboard.writeText(value?.toString() || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

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
                                className='input-class pr-16 form-control' // Increase padding to the right for both icons
                                disabled={disabled}
                                readOnly={readonly}
                                type={type}
                                {...field}
                                value={field.value ?? ''} // Fallback to empty string if field.value is null or undefined
                                style={{ paddingRight: '40px' }} // Add space for the icons inside the input
                            />
                            {clipboard && (
                                <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                                    <IconButton
                                        onClick={() => handleCopy(field.value ?? '')} // Fallback to empty string if field.value is null
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
