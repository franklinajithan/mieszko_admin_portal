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
import { FormField, FormControl } from "@/components/ui/form";

interface CalendarInputProps {
  value: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  description?: string;
  control: any; // control prop from the form library (e.g., react-hook-form)
  name: string; // field name in the form
}

export function CalendarInput({
  value,
  onChange,
  label,
  description,
  control,
  name,
}: CalendarInputProps) {
  const [isOpen, setIsOpen] = useState(false); // Manage popover open state

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl className="relative">
          <div className="flex flex-col">
            <label>{label}</label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  onClick={() => setIsOpen(!isOpen)} // Toggle popover on button click
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? format(new Date(field.value), "dd-MM-yyyy")
                    : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-90" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setIsOpen(false); // Close popover after selecting a date
                  }}
                //   disabled={(date) =>
                //     date > new Date() || date < new Date("1900-01-01")
                //   }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {description && <p className="text-sm text-muted">{description}</p>}
          </div>
        </FormControl>
      )}
    />
  );
}
