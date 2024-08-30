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
              <LabelField label={label} />
              <Select onValueChange={handleChange} value={selectedValue} defaultValue={selectedValue}>
                <FormControl>
                  <SelectTrigger disabled={disabled}>
                    <SelectValue placeholder={placeholder || "Select an option"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>
                {fieldState.error?.message} {/* Display error message */}
              </FormMessage>
            </FormItem>
          </div>
        );
      }}
    />
  );
};

export default SelectField;
