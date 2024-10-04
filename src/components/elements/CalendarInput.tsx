import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormField, FormControl, FormMessage } from "@/components/ui/form";
import React from "react";

interface CalendarInputProps {
  onChange?: (date: Date | undefined) => void;
  label?: string;
  description?: string;
  control?: any; // control prop from the form library (e.g., react-hook-form)
  name: string; // field name in the form
}

export function CalendarInput({
  onChange,
  label,
  description,
  control,
  name,
}: CalendarInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className='form-item w-full'>
          <FormControl className="relative">
            <div className="flex flex-col">
              <label>{label}</label>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-[240px] justify-between text-left font-normal", !field.value && "text-muted-foreground")}
                  >
                    <span className="flex-grow">{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</span>
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date); // Update form field value
                      if (onChange) onChange(date); // Call onChange if provided
                      setIsOpen(false); // Close the popover
                    }}
                    fromYear={1960}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
              {description && <p className="text-sm text-muted">{description}</p>}
            </div>
          </FormControl>
          <FormMessage className='form-message mt-2' />
        </div>
      )}
    />
  );
}
