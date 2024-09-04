import React from 'react';
import LabelField from './LabelField';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';

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
}

const InputField = <T extends FieldValues>({
    label,
    type = 'text',
    name,
    placeholder,
    control,
    disabled,
    readonly = false, 
    id = name
}: InputFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <LabelField label={label} htmlFor={name} />
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                                id={id}
                                placeholder={placeholder}
                                autoComplete='off'
                                className='input-class'
                                disabled={disabled}
                                readOnly={readonly} // Pass readonly prop to Input
                                type={type}
                                {...field}
                                value={field.value as any} // Cast to `any` for handling different types
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    );
};

export default InputField;
