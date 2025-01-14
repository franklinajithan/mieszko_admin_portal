import React, { useState, useRef, useEffect } from "react";
import LabelField from "./LabelField";
import { Control, Controller } from "react-hook-form";

interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  label: string;
  name: string;
  control: Control<any>;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ label, options, name, control }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div>
          <LabelField label={label} />
          <div className="" ref={dropdownRef}>
            <div className={`flex flex-wrap gap-2 p-2 border border-zinc-300 rounded-md cursor-pointer min-h-[35px]`} onClick={toggleDropdown}>
              {value && value.length > 0 ? (
                value.map((optionValue: string, index: number) => (
                  <div key={index} className="flex items-center bg-zinc-300 rounded px-1 py-1 text-xs">
                    {options.find((option) => option.value === optionValue)?.label}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(value.filter((item: string) => item !== optionValue));
                      }}
                      className="ml-1 text-zinc-600 hover:text-zinc-900 font-bold"
                    >
                      &times;
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-zinc-500">Select options...</span>
              )}
            </div>

            {dropdownOpen && (
              <div className="absolute mt-1 w-96 bg-white border border-zinc-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 cursor-pointer hover:bg-zinc-200 ${value && value.includes(option.value) ? "bg-zinc-100" : ""}`}
                    onClick={() => {
                      const newValue = value?.includes(option.value) ? value.filter((item: string) => item !== option.value) : [...(value || []), option.value];
                      onChange(newValue);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default MultiSelectDropdown;
