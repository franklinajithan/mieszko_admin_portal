import React from 'react';
import LabelField from './LabelField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage, // Import FormMessage
} from "@/components/ui/form";

interface SelectFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void; // Specify the type for onChange
  options: { value: string; label: string }[];
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  placeholder,
  control,
  disabled,
  onChange,
  options
}: SelectFieldProps<T>) => {
  // Generate a unique id for the select element based on the name
  const id = `select-${name}`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { onChange: formOnChange, value } = field; // Destructure field properties

        // Ensure the value is either a string or undefined
        const selectedValue = typeof value === 'string' ? value : undefined;

        const handleChange = (val: string) => {
          formOnChange(val); // Update the form state
          if (onChange) onChange(val); // Call the custom onChange handler if provided
        };

        return (
          <div className='w-full'>
            <FormItem>
              <LabelField label={label} htmlFor={id} /> {/* Ensure LabelField supports htmlFor */}
              <FormControl>
                <Select onValueChange={handleChange} value={selectedValue} defaultValue={selectedValue}>
                  <SelectTrigger id={id} disabled={disabled} aria-label={label} aria-disabled={disabled}>
                    <SelectValue placeholder={placeholder || "Select an option"} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage className='text-cyan-500 mt-1'>
                  {fieldState.error?.message} {/* Display error message */}
                </FormMessage>
              )}
            </FormItem>
          </div>
        );
      }}
    />
  );
};

export default SelectField;
