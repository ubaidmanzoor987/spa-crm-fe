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
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    height: "12px !important",
    minHeight: "12px !important",
    display:'flex',
    alignItems: "center",
    justifyContent: "space-between",
  },
  // "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
  //   padding: "15px 14px",
  // },
  // "& .css-17ttchb-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {
  //   borderRadius: "10px",
  // },
  // "& .css-yf8vq0-MuiSelect-nativeInput": {
  //   bottom: "17px",
  //   left: "10px",
  //   position: "absolute",
  //   opacity: "1",
  //   width: "100%",
  //   border: "0",
  // },
}));
