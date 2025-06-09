import { TextField } from "@mui/material";
import { useRef, useEffect } from "react";

export const TimeEditCell = ({ id, field, value, api }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <TextField
      inputRef={inputRef}
      type="time"
      size="small"
      value={value || ""}
      onChange={(e) => {
        api.setEditCellValue({ id, field, value: e.target.value }, e);
      }}
      onKeyDown={(e) => {
        // ✅ DO NOT stopPropagation here — let MUI move to next cell
        if (e.key === "Enter") {
          api.stopCellEditMode({ id, field });
        }
      }}
      inputProps={{ step: 300 }}
    />
  );
};
