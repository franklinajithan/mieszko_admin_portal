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
  onChange?: (value: string | number | boolean) => void;
  options: { value: string | number | boolean; label: string }[];
  required?: boolean;
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  placeholder,
  control,
  disabled,
  onChange,
  options,
  required = false,
}: SelectFieldProps<T>) => {
  const [internalValue, setInternalValue] = useState<string | number | boolean>(''); // Internal state for non-form usage
  const id = `select-${name}`;

  const handleChange = (val: string) => {
    // Parse the value back to its original type
    const parsedValue = options.find(option => String(option.value) === val)?.value;
    if (onChange && parsedValue !== undefined) {
      onChange(parsedValue); // Return the correct type (string, number, or boolean)
    }
    setInternalValue(parsedValue!); // Update internal state for standalone use
  };

  const formatValue = (value: string | number | boolean): string => {
    // For display, always convert to string
    return typeof value === 'boolean' || typeof value === 'number' ? String(value) : value;
  };

  if (control) {
    return (
      <FormField
        control={control}
        name={name as FieldPath<T>}
        render={({ field, fieldState }) => {
          const { onChange: formOnChange, value } = field;
          const selectedValue = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? value : '';

          const handleFormChange = (val: string) => {
            const parsedValue = options.find(option => String(option.value) === val)?.value;
            if (parsedValue !== undefined) {
              formOnChange(parsedValue);
              if (onChange) onChange(parsedValue);
            }
          };

          return (
            <div className='w-full'>
              <FormItem>
                <LabelField label={label} htmlFor={id} required={required}/>
         
                <FormControl>
                  <Select
                    value={formatValue(selectedValue)}
                    onValueChange={handleFormChange}
                    disabled={disabled}
                  >
                    <SelectTrigger id={id} aria-label={label} aria-disabled={disabled}>
                      <SelectValue placeholder={placeholder || "Select an option"} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={String(option.value)} value={String(option.value)}>
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
                  <FormMessage className='form-message mt-2'>
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
        <LabelField label={label} htmlFor={id} required={required}/>
        <Select
          value={formatValue(internalValue)}
          onValueChange={(val) => handleChange(val)}
          disabled={disabled}
        >
          <SelectTrigger id={id} aria-label={label} aria-disabled={disabled}>
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={String(option.value)} value={String(option.value)}>
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
