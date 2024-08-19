import React from 'react';

interface LabelFieldProps {
  label?: string;
  htmlFor? : any;
}

const LabelField: React.FC<LabelFieldProps> = ({ label,htmlFor }) => {
  return (
    <div className="flex items-center">
     <label htmlFor={htmlFor} className='form-label'>{label}</label>
    </div>
  );
};

export default LabelField;
