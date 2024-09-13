import React from 'react';
import LabelField from './LabelField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface SelectFieldProps<T extends FieldValues> {
  name: string; // Changed to string for dynamic field names
  control: Control<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
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
  const id = `select-${name}`;

  return (
    <FormField
      control={control}
      name={name as FieldPath<T>} // Cast to FieldPath<T>
      render={({ field, fieldState }) => {
        const { onChange: formOnChange, value } = field;

        // Ensure selectedValue is a string or undefined
        const selectedValue = typeof value === 'string' ? value : undefined;

        const handleChange = (val: string) => {
          formOnChange(val);
          if (onChange) onChange(val);
        };

        return (
          <div className='w-full'>
            <FormItem>
              <LabelField label={label} htmlFor={id} />
              <FormControl>
                <Select
                  value={selectedValue}
                  onValueChange={handleChange}
                  disabled={disabled}
                >
                  <SelectTrigger id={id} aria-label={label} aria-disabled={disabled}>
                    <SelectValue placeholder={placeholder || "Select an option"} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage className='text-cyan-500 mt-1'>
                  {fieldState.error.message}
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
