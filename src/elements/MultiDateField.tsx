import React, { useEffect } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import LabelField from "./LabelField";
import { Input } from "@/components/ui/input";

export interface MultiInputFieldProps<T extends FieldValues> {
    label?: string; // Main Label text
    firstName: FieldPath<T>;
    secondName: FieldPath<T>;
    control: Control<T>;
    startDatePlaceholder?: string; // Placeholder for the "Start Date" input
    endDatePlaceholder?: string; // Placeholder for the "End Date" input
    defaultStartDate?: string; // Default value for the "Start Date" input
    defaultEndDate?: string; // Default value for the "End Date" input
    onChange?: (values: { startDate: string; endDate: string }) => void;
}

const MultiDateField = <T extends FieldValues>({
    label = "",
    firstName,
    secondName,
    control,
    startDatePlaceholder = "Start Date",
    endDatePlaceholder = "End Date",
    defaultStartDate = "",
    defaultEndDate = "",
    onChange,
}: MultiInputFieldProps<T>) => {
    const handleChange = (startDate: string, endDate: string) => {
        if (onChange) {
            onChange({ startDate, endDate });
        }
    };

    useEffect(() => {
        // Ensure the onChange callback is called with initial values if provided
        handleChange(defaultStartDate, defaultEndDate);
    }, [defaultStartDate, defaultEndDate, handleChange]);

    return (
        <div className="grid gap-4 grid-cols-3">
            <div className="flex items-center"> {label &&  <LabelField label={label} />}</div>
            <div className=" "><FormField
                    control={control}
                    name={firstName}
                    render={({ field, fieldState }) => (
                        <div className='form-item'>
                            <LabelField label={label + ' Start Date'} />
                            <div className='flex w-full flex-col'>
                                <FormControl className='mt-2'>
                                    <Input
                                        placeholder={startDatePlaceholder}
                                        className='input-class'
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e); 
                                            handleChange(e.target.value, field.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </div>
                        </div>
                    )}
                /></div>
            <div><FormField
                    control={control}
                    name={secondName}
                    render={({ field, fieldState }) => (
                        <div className='form-item'>
                            <LabelField label={label + ' End Date'} />
                            <div className='flex w-full flex-col'>
                                <FormControl className='mt-2'>
                                    <Input
                                        placeholder={endDatePlaceholder}
                                        className='input-class'
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e); 
                                            handleChange(field.value, e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className='form-message mt-2'>{fieldState.error?.message}</FormMessage>
                            </div>
                        </div>
                    )}
                /></div>
           
           
        </div>
    );
};

export default MultiDateField;
