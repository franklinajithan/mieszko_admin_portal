import React from "react";
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import LabelField from "./LabelField";

interface RadioOption {
  value: string | number;
  label: string;
}

interface RadioFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  options: RadioOption[];
  required?: boolean;
  linePerRow?: number;
}

const RadioField = <T extends FieldValues>({ name, control, label, options, required = false, linePerRow=5 }: RadioFieldProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <div className="w-full">
      {label && <LabelField label={label} htmlFor={`${label}`} aria-label={label} />}
      <div className={`grid grid-cols-${linePerRow} gap-2`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer" onClick={() => field.onChange(option.value)}>
            <input type="radio" id={`${name}-${option.value}`} value={option.value} checked={field.value === option.value} onChange={() => field.onChange(option.value)} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />

          <span className="mt-2"> <LabelField label={option.label} htmlFor={`${name}-${option.value}`} aria-label={label} /></span> 
          </div>
        ))}
      </div>
      {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message || "This field is required"}</p>}
    </div>
  );
};

export default RadioField;
