import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormControl, FormItem } from '@/components/ui/form';
import LabelField from './LabelField';

interface CheckboxFieldProps<T extends FieldValues> {
  name: string; // Use string for dynamic keys
  control: Control<T>;
  label: string;
  id?: string;
  onChange?: (checked: boolean) => void;
}

const CheckboxField = <T extends FieldValues>({
  name,
  control,
  label,
  id,
  onChange,
}: CheckboxFieldProps<T>) => {
  const { field } = useController({
    name: name as FieldPath<T>,
    control,
  });

  const handleChange = (checked: boolean) => {
    field.onChange(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <FormField
      control={control}
      name={name as FieldPath<T>} // Ensure compatibility with FieldPath
      render={() => (
        <FormItem>
          <div className="flex items-end h-full">
            <div className="w-full">
              <div className="btn-toggle-zinc flex items-center">
                <div className="mr-2 ml-2 mt-2">
                  <LabelField htmlFor={id} label={label} />
                </div>
                <div className="ml-auto mt-1">
                  <FormControl>
                    <Checkbox
                      id={id}
                      checked={field.value}
                      onCheckedChange={handleChange}
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
