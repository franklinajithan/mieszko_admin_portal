import React, { FC, useState } from "react";
import LabelField from "./LabelField";

export interface MultiInputFieldProps {
    label?: string; // Main Label text
    startDatePlaceholder?: string; // Placeholder for the "Start Date" input
    endDatePlaceholder?: string; // Placeholder for the "End Date" input
    instantPlaceholder?: string; // Placeholder for the "Instant" input
    defaultStartDate?: string; // Default value for the "Start Date" input
    defaultEndDate?: string; // Default value for the "End Date" input
    defaultInstant?: string; // Default value for the "Instant" input
    onChange?: (values: { startDate: string; endDate: string; instant: string }) => void;
}

const MultiDateField: FC<MultiInputFieldProps> = ({
    label = "",
    startDatePlaceholder = "Start Date",
    endDatePlaceholder = "End Date",
    instantPlaceholder = "Instant",
    defaultStartDate = "",
    defaultEndDate = "",
    defaultInstant = "",
    onChange,
}) => {
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [instant, setInstant] = useState(defaultInstant);

    const handleChange = () => {
        if (onChange) {
            onChange({ startDate, endDate, instant });
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="flex space-x-4 items-start w-1 /4">
                {label && <LabelField label={label} />}
            </div>

            <div className="flex space-x-4 items-start w-3/4">
                <div className="flex flex-col space-y-1 w-1/2">
                    <label className="text-gray-700 font-medium">Start Date</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2"
                        placeholder={startDatePlaceholder}
                        value={startDate}
                        onChange={(e) => {
                            setStartDate(e.target.value);
                            handleChange();
                        }}
                    />
                </div>

                <div className="flex flex-col space-y-1 w-1/2">
                    <label className="text-gray-700 font-medium">End Date</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2"
                        placeholder={endDatePlaceholder}
                        value={endDate}
                        onChange={(e) => {
                            setEndDate(e.target.value);
                            handleChange();
                        }}
                    />
                </div>


            </div>
        </div>
    );
};

export default MultiDateField;
