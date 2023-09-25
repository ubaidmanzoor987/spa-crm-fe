import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Select, FormControl, TextField } from "@mui/material";

export const StyledSelect = styled(Select)(() => ({
  width: "100%",
  borderRadius: 10,
  "& .css-bujr72-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
    backgroundColor: `${COLORS.GREEN_THEME}`,
  },
}));

export const StyledFormControl = styled(FormControl)(() => ({
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    height: "12px !important",
    minHeight: "12px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  display: "flex",
  flexDirection: "row",
}));
