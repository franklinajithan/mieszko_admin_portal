import React from 'react';
import { Control, FieldPath } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface CheckboxFieldProps<T extends object> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  id?: any;
  checked?: boolean;
}

const CheckboxField = <T extends object>({ name, control, label, id, checked = false }: CheckboxFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
