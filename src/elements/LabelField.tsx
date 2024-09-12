import { Label } from '@/components/ui/label';
import React from 'react';

interface LabelFieldProps {
  label?: string;
  htmlFor? : any;
}

const LabelField: React.FC<LabelFieldProps> = ({ label,htmlFor }) => {
  return (
   
      <Label htmlFor={htmlFor} className='form-label text-zinc-500 flex items-center'>{label}</Label>

  
  
  );
};

export default LabelField;
