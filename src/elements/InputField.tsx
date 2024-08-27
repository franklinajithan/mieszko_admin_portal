import React from 'react';
import LabelField from './LabelField';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';

interface InputFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label: string;
    type: 'text' | 'number' | 'date' | 'email' | 'time' | 'password' | 'tel' | 'url'; // Added more types for completeness
    placeholder?: string;
    value?: string | number; // Adjust to support the types you need
    disabled?: boolean;
}

const InputField = <T extends FieldValues>({ label, type, name, placeholder, control, disabled }: InputFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <LabelField label={label} />
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                                id={name}
                                placeholder={placeholder}
                                className='input-class'
                                disabled={disabled}
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
