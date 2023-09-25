import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Select, FormControl, MenuItem } from "@mui/material";

export const StyledSelect = styled(Select)(() => ({
  borderRadius: 10,
  "& .css-bujr72-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
    backgroundColor: `${COLORS.GREEN_THEME}`,
  },
}));
export const StyledMenuItem = styled(MenuItem)`
  &.Mui-selected {
    background-color:${COLORS.LIGHT_GREEN};
  }
  &.Mui-selected: hover {
    background-color:${COLORS.LIGHT_GREEN};
  }
`;

export const StyledFormControl = styled(FormControl)(() => ({
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    height: "12px !important",
    minHeight: "12px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
