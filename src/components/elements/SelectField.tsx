import React, { useState } from 'react';
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
import 'flag-icons/css/flag-icons.min.css';

interface SelectFieldProps<T extends FieldValues> {
  name: string;
  control?: Control<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void; // Ensuring this is a string
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
  const [internalValue, setInternalValue] = useState<string>(''); // Internal state for non-form usage
  const id = `select-${name}`;

  const handleChange = (val: string) => {
    if (onChange) onChange(val); // Ensure onChange receives a string
    setInternalValue(val); // Update internal state for standalone use
  };

  if (control) {
    return (
      <FormField
        control={control}
        name={name as FieldPath<T>}
        render={({ field, fieldState }) => {
          const { onChange: formOnChange, value } = field;
          const selectedValue = typeof value === 'string' ? value : '';

          const handleFormChange = (val: string) => {
            formOnChange(val);
            if (onChange) onChange(val); // Ensure onChange receives a string
          };

          return (
            <div className='w-full'>
              <FormItem>
                <LabelField label={label} htmlFor={id} />
                <FormControl>
                  <Select
                    value={selectedValue}
                    onValueChange={handleFormChange}
                    disabled={disabled}
                  >
                    <SelectTrigger id={id} aria-label={label} aria-disabled={disabled}>
                      <SelectValue placeholder={placeholder || "Select an option"} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {name === 'country' && (
                            <span className={`fi fi-${String(option.value).toLowerCase()} mr-2 w-4 h-4`}></span>
                          )}
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
  } else {
    // Standalone usage without form context
    return (
      <div className='w-full'>
        <LabelField label={label} htmlFor={id} />
        <Select
          value={internalValue}
          onValueChange={handleChange}
          disabled={disabled}
        >
          <SelectTrigger id={id} aria-label={label} aria-disabled={disabled}>
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {name === 'country' && (
                  <span className={`fi fi-${String(option.value).toLowerCase()} mr-2 w-4 h-4`}></span>
                )}
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
};

export default SelectField;
