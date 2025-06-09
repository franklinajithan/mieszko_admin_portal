import React, { useState } from "react";
import LabelField from "./LabelField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import "flag-icons/css/flag-icons.min.css";

interface SelectFieldProps<T extends FieldValues> {
  name: string;
  control?: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string | number | boolean) => void;
  options: { value: string | number | boolean; label: string }[];
  required?: boolean;
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  placeholder,
  control,
  disabled,
  onChange,
  options,
  required = false,
}: SelectFieldProps<T>) => {
  const [internalValue, setInternalValue] = useState<string | number | boolean>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const id = `select-${name}`;

  const handleChange = (val: string) => {
    const parsedValue = options.find((option) => String(option.value) === val)?.value;
    if (onChange && parsedValue !== undefined) {
      onChange(parsedValue);
    }
    setInternalValue(parsedValue!);
  };

  const formatValue = (value: string | number | boolean): string => {
    return typeof value === "boolean" || typeof value === "number" ? String(value) : value;
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setSearchTerm(""); // Clear search term when closing
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    event.stopPropagation(); // Prevent event propagation
  };

  const renderSelect = (value: string | number | boolean, onChangeFn: (val: string) => void) => (
    <Select
      value={formatValue(value)}
      onValueChange={onChangeFn}
      disabled={disabled}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger
        id={id}
        aria-label={label}
        aria-disabled={disabled}
        className="h-7 text-sm"
      >
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {/* Search input fixed at top */}
        <div className="p-2 border-b border-gray-200 bg-white sticky top-0">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            className="autocomplete-input w-full px-2 py-1 text-sm border border-gray-300 rounded"
          />
        </div>
        {/* Scrollable area for options */}
        <div className="max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <SelectItem
                key={String(option.value)}
                value={String(option.value)}
                className="text-sm py-1.5"
              >
                {name === "country" && (
                  <span
                    className={`fi fi-${String(option.value).toLowerCase()} mr-2 w-4 h-4`}
                  ></span>
                )}
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">No results found</div>
          )}
        </div>
      </SelectContent>
    </Select>
  );

  if (control) {
    return (
      <FormField
        control={control}
        name={name as FieldPath<T>}
        render={({ field, fieldState }) => {
          const { onChange: formOnChange, value } = field;
          const selectedValue =
            typeof value === "string" || typeof value === "number" || typeof value === "boolean"
              ? value
              : "";

          const handleFormChange = (val: string) => {
            const parsedValue = options.find((option) => String(option.value) === val)?.value;
            if (parsedValue !== undefined) {
              formOnChange(parsedValue);
              if (onChange) onChange(parsedValue);
            }
          };

          return (
            <div className="w-full">
              <FormItem>
                <LabelField label={label} htmlFor={id} required={required} />
                <FormControl>
                  {renderSelect(selectedValue, handleFormChange)}
                </FormControl>
                {fieldState.error?.message && (
                  <FormMessage className="form-message mt-2">
                    {fieldState.error.message}
                  </FormMessage>
                )}
              </FormItem>
            </div>
          );
        }}
      />
    );
  } else {
    return (
      <div className="w-full">
        <LabelField label={label} htmlFor={id} required={required} />
        {renderSelect(internalValue, handleChange)}
      </div>
    );
  }
};

export default SelectField;
