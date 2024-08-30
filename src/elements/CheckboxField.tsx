import React from 'react';
import { Control, FieldPath } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import LabelField from './LabelField';

interface CheckboxFieldProps<T extends object> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  id?: string;
  onChange?: (checked: boolean) => void; // Optional prop for custom onChange
}

const CheckboxField = <T extends object>({
  name,
  control,
  label,
  id,
  onChange, // Receive custom onChange handler as a prop
}: CheckboxFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleChange = (checked: boolean) => {
          field.onChange(checked); // Call the default field onChange to update form state
          if (onChange) {
            onChange(checked); // Call the custom onChange handler if provided
          }
        };

        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                id={id}
                checked={field.value}
                onCheckedChange={handleChange} // Use custom handleChange function
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <LabelField htmlFor={id} label={label}/>
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default CheckboxField;
