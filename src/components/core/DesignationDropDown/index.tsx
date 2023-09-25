import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

import { StyledFormControl, StyledSelect } from "./index.styles";

enum Designations {
  Male = "therapist",
  Female = "receptionist",
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function capitalizeFirstLetter(str: string) {
  return str?.replace(/\b\w/g, (match) => match.toUpperCase());
}

const values = Object.values(Designations);

export default function DesignationDropDown({
  value,
  setFieldValue,
  props,
}: any) {
  const [selectedDesignation, setSelectedDesignation] = useState<string>();

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedDesignation(event.target.value as string);
    setFieldValue(`department`, event.target.value);
  };
  useEffect(() => {
    setFieldValue(`department`, "therapist");
  }, []);
  return (
    <StyledFormControl>
      <StyledSelect
        MenuProps={MenuProps}
        placeholder={"Select Designation"}
        onChange={handleSelectChange}
        defaultValue="therapist"
        value={value}
        {...props}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {capitalizeFirstLetter(value)}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
}
