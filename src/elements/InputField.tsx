import React from 'react';
import LabelField from './LabelField';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';

interface InputFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label: string;
    type: 'text' | 'number' | 'date' | 'email' | 'time';
    placeholder?: string;
    value?: string | number;
    disabled?: boolean;
}

const InputField = <T extends FieldValues>({label,type,name,placeholder,control,disabled,}: InputFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <LabelField label={label} />
                    <div className='flex w-full flex-col'>
                        <FormControl className=''>
                            <Input
                                placeholder={placeholder}
                                className='input-class'
                                disabled={disabled}
                                type={type}
                                {...field} />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    );
};

export default InputField;
