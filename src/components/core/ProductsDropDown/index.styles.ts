import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Select, FormControl } from "@mui/material";

export const StyledSelect = styled(Select)(() => ({
  borderRadius: 10,
  "& .css-bujr72-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
    backgroundColor: `${COLORS.GREEN_THEME}`,
  },
}));

export const StyledFormControl = styled(FormControl)(() => ({
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
    {
      display: "flex",
      justifyContent: "space-between",
      padding:"11px 14px"
      // border:"1px solid red"
    },
}));
