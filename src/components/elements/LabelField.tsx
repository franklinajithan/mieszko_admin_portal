import { Label } from '@/components/ui/label';
import React from 'react';

interface LabelFieldProps {
  label?: string;
  htmlFor? : any;
  required?: boolean;
}

const LabelField: React.FC<LabelFieldProps> = ({ label,htmlFor, required = false, }) => {
  return (
   
      <Label htmlFor={htmlFor} className='form-label text-zinc-500 flex items-center'>{label}  {required && <span className="text-red-500 ml-1">*</span>}</Label>

  
  
  );
};

export default LabelField;
