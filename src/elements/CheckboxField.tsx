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
import { divIcon } from 'leaflet';

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




          <>
           <FormItem>
            <div className="flex items-end h-full">


              <div className="w-full">
                <div className="btn-toggle-zinc flex items-center">
                  <div className="mr-2 ml-2 mt-2">
                  <LabelField htmlFor={id} label={label} />
                  </div>
                  <div className="ml-auto">
                  <FormControl>
                 
                  <Checkbox
                      id={id}
                      name={name}
                      checked={field.value}
                      onCheckedChange={handleChange} // Use custom handleChange function
                    />
                   
                    </FormControl>
                  </div>
                </div>

              </div>

            </div>
            </FormItem>








          </>

















        );
      }}
    />
  );
};

export default CheckboxField;
