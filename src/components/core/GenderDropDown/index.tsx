import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

import { StyledFormControl, StyledSelect } from "./index.styles";

enum Gender {
  Male = "male",
  Female = "female",
  Others = "others",
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
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

const values = Object.values(Gender);

export default function GenderDropDown({ value, setFieldValue, props }: any) {
  const [selectedGender, setSelectedGender] = useState<string>();

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedGender(event.target.value as string);
    setFieldValue(`gender`, event.target.value);
  };
  return (
    <StyledFormControl>
      <StyledSelect
        MenuProps={MenuProps}
        placeholder={"Select Gender"}
        onChange={handleSelectChange}
        value={value}
        {...props}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {capitalizeFirstLetter(value)}
          </MenuItem>
        ))}
      </StyledSelect>
      {/* <>{error.gender ? error.gender : ""}</> */}
    </StyledFormControl>
  );
}
