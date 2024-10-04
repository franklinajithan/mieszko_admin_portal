import React, { useState, useRef, useEffect } from 'react';
import LabelField from './LabelField';

interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  label: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ label, options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSelect = (optionValue: string) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== optionValue));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
        <LabelField label={label}/>
      <div className="" ref={dropdownRef}>
        <div
          className={`flex flex-wrap gap-2 p-2 border border-zinc-300 rounded-md cursor-pointer min-h-[35px]`}
          onClick={toggleDropdown}
        >
          {selectedOptions.length === 0 ? (
            <span className="text-zinc-500">Select options...</span>
          ) : (
            selectedOptions.map((optionValue, index) => (
              <div
                key={index}
                className="flex items-center bg-zinc-200 rounded px-1 py-0.5 text-xs"
              >
                {options.find(option => option.value === optionValue)?.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(optionValue);
                  }}
                  className="ml-1 text-zinc-600 hover:text-zinc-800"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {dropdownOpen && (
          <div className="absolute mt-1 w-96 bg-white border border-zinc-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-zinc-200 ${
                  selectedOptions.includes(option.value) ? 'bg-zinc-100' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
