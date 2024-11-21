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
    canView?: boolean;
    canEdit?: boolean;
    minLength?: number;
    maxLength?: number;
    onChange?: (value: string | number) => void;
    errorId?: string;
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
    minLength,
    maxLength,
    onChange,
    errorId,
}: InputFieldProps<T>) => {
    const [copied, setCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        field.onChange(type === 'number' ? 0 : '');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = type === 'number' ? Number(e.target.value) : e.target.value;
        field.onChange(value);

        if (onChange) {
            onChange(value);
        }
    };

    if (!canView) {
        return null; // If the user doesn't have view permission, hide the field
    }

    return (
        <FormField
            control={control}
            name={name as FieldPath<T>}
            render={() => (
                <div className="form-item w-full">
                    <LabelField label={label} htmlFor={name} required={required} />

                    <FormControl className="relative">
                        <div className="relative w-full">
                            <Input
                                id={id}
                                name={name}
                                placeholder={placeholder}
                                autoComplete="off"
                                className="input-class pr-24 form-control"
                                disabled={disabled || !canEdit}
                                readOnly={readonly || !canEdit}
                                type={showPassword && type === 'password' ? 'text' : type}
                                value={field.value ?? (type === 'number' ? 0 : '')}
                                onChange={handleChange}
                                minLength={minLength}
                                maxLength={maxLength}
                            />
                            {clipboard && (
                                <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                                    <IconButton
                                        onClick={() => handleCopy(field.value ?? '')}
                                        className="absolute right-12 top-0 h-full"
                                        style={{
                                            position: 'absolute',
                                            right: '40px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            padding: '0',
                                        }}
                                    >
                                        <ContentCopyIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {showPasswordToggle && type === 'password' && (
                                <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                                    <IconButton
                                        id="toggle-password"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-8 top-0 h-full"
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '80%',
                                            transform: 'translateY(0%)',
                                            padding: '0',
                                        }}
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </Tooltip>
                            )}
                            {clearInput && (
                                <Tooltip title="Clear">
                                    <IconButton
                                        onClick={handleClear}
                                        className="absolute right-24 top-0 h-full"
                                        style={{
                                            position: 'absolute',
                                            right: '70px',
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
                    </FormControl>
                    <FormMessage className="form-message mt-2" data-testid={errorId}/>
                </div>
            )}
        />
    );
};

export default InputField;
