import React from "react";
import { Field } from "formik";

interface TimeFieldProps {
  name: string;
  label: string;
}

const TimeField: React.FC<TimeFieldProps> = ({ name, label }) => {
  const currentTime = new Date().toISOString().slice(0, 16);

  return (
    <Field name={name}>
      {({ field, meta }: { field: any; meta: any }) => (
        <div>
          <label htmlFor={name}>{label}</label>
          <input
            {...field}
            type="time"
            id={name}
            min={currentTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedTime = e.target.valueAsNumber;
              const currentTime = Date.now();
              if (selectedTime < currentTime) {
                e.target.setCustomValidity("Please select a future time");
              } else {
                e.target.setCustomValidity("");
              }
            }}
          />
          {meta.touched && meta.error !== undefined && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default TimeField;
