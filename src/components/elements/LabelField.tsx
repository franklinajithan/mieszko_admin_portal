import { Label } from '@/components/ui/label';
import React from 'react';

interface LabelFieldProps {
  label?: string;
  htmlFor?: string; // Specify as string for consistency with `htmlFor`
  required?: boolean;
}

const LabelField: React.FC<LabelFieldProps> = ({ label, htmlFor, required = false }) => {
  return (
    <Label
      htmlFor={htmlFor}
      aria-label={label} // Add aria-label for accessibility
      className="form-label text-zinc-500 flex items-center"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </Label>
  );
};

export default LabelField;
