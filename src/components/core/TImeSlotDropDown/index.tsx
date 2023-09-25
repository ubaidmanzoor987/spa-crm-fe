import React from "react";
import { Field, FieldProps } from "formik";
import { Select, MenuItem, SelectProps } from "@mui/material";
import { COLORS } from "@/constants/colors";

interface TimeSlotDropdownProps extends SelectProps {
  name: string;
}

const TimeSlotDropdown = ({ name, ...rest }: TimeSlotDropdownProps) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 1;
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    return `${start} to ${end}`;
  });
  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: true });

  console.log({currentTime, timeSlots})

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Select
          {...field}
          {...rest}
          label="Time Slot"
          error={Boolean(form.touched[name] && form.errors[name])}
          style={{ width: "100%", color: COLORS.BLACK_100 }}
        >
          {timeSlots.map((slot) => (
            <MenuItem key={slot} value={slot} disabled={slot < currentTime}>
              {slot}
            </MenuItem>
          ))}
        </Select>
      )}
    </Field>
  );
};

export default TimeSlotDropdown;
