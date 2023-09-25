import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Select, FormControl } from "@mui/material";

export const StyledSelect = styled(Select)(() => ({
  borderRadius: 10,
  height:'45px',
  "& .css-bujr72-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
    backgroundColor: `${COLORS.GREEN_THEME}`,
  },
}));

export const StyledFormControl = styled(FormControl)(() => ({
  width: '100%',
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "13.4px 14px",
  },
  "& .css-17ttchb-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {
    borderRadius: "10px",
  },
  "& .css-yf8vq0-MuiSelect-nativeInput": {
    bottom: "14px",
    left: "10px",
    position: "absolute",
    opacity: "1",
    width: "100%",
    border: "0",
    fontFamily: "Argentum Sans",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "9px",
  },
}));
