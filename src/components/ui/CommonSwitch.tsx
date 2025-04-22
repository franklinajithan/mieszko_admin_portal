import React from 'react';
import IOSSwitch from '../elements/toggleTheme';

interface CommonSwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CommonSwitch: React.FC<CommonSwitchProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-2">
      <div className="mr-2">
        <span>{label}</span>
      </div>
      <div className="ml-auto">
        <IOSSwitch checked={checked} onChange={onChange} className="ml-2" />
      </div>
    </div>
  );
};

export default CommonSwitch;
