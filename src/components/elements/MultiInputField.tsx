import React, { FC, useState } from "react";
import LabelField from "./LabelField";

export interface MultiInputFieldProps {
    label?: string; // Main Label text
    name?: string; 
    operationOptions?: string[]; // Options for the dropdown
    fromPlaceholder?: string; // Placeholder for the "From" input
    toPlaceholder?: string; // Placeholder for the "To" input
    defaultOperation?: string; // Default value for the dropdown
    defaultFrom?: string; // Default value for the "From" input
    defaultTo?: string; // Default value for the "To" input
    onChange?: (values: { operation: string; from: string; to: string }) => void;
}

const MultiInputField: FC<MultiInputFieldProps> = ({
    label = "",
    name= "",
    operationOptions = ["Between"],
    fromPlaceholder = "£1000",
    toPlaceholder = "£10000",
    defaultOperation = "Between",
    defaultFrom = "",
    defaultTo = "",
    onChange,
}) => {
    const [operation, setOperation] = useState(defaultOperation);
    const [from, setFrom] = useState(defaultFrom);
    const [to, setTo] = useState(defaultTo);

    const handleChange = () => {
        if (onChange) {
            onChange({ operation, from, to });
        }
    };

    return (
        <div className="flex items-center space-x-4 p-2">

            <div className="flex space-x-4 items-start w-1/4 ">
            {label && <LabelField label={label} />}
            </div>
           

            <div className="flex space-x-4 items-start w-3/4 ">
                <div className="flex flex-col space-y-1 w-1/3">
                    <label className="text-zinc-700 font-medium">Operation</label>
                    <select
                        className="border border-zinc-300 rounded-md p-2"
                        value={operation}
                        onChange={(e) => {
                            setOperation(e.target.value);
                            handleChange();
                        }}
                    >
                        {operationOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-1 w-1/3">
                    <label className="text-zinc-700 font-medium">From</label>
                    <input
                        type="text"
                        className="border border-zinc-300 rounded-md p-2"
                        placeholder={fromPlaceholder}
                        value={from}
                        onChange={(e) => {
                            setFrom(e.target.value);
                            handleChange();
                        }}
                    />
                </div>

                <div className="flex flex-col space-y-1 w-1/3">
                    <label className="text-zinc-700 font-medium">To</label>
                    <input
                        type="text"
                        className="border border-zinc-300 rounded-md p-2"
                        placeholder={toPlaceholder}
                        value={to}
                        onChange={(e) => {
                            setTo(e.target.value);
                            handleChange();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MultiInputField;
