import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Select, FormControl, MenuItem } from "@mui/material";
export const StyledSelect = styled(Select)<{
  isCenter?: boolean;
}>`
  border-radius: 10px;
  margin-top: 0px;
  height: 45px;
  ${({ isCenter }) =>
    isCenter
      ? ``
      : `margin-left:-25px;
      width: 250px;`}
  .css-bujr72-MuiButtonBase-root-MuiMenuItem-root.Mui-selected {
    backgroundcolor: ${COLORS.GREEN_THEME};
  }
`;
export const StyledMenuItem = styled(MenuItem)`
  &.Mui-selected {
    background-color: ${COLORS.LIGHT_GREEN};
  }
  &.mui-selected: hover {
    background-color: ${COLORS.LIGHT_GREEN};
  }
`;

export const StyledButton = styled.button`
margin-top: 10px;
margin-left: 35px;
height: 40px;
width: 100px;
border: 1px solid #8BC152;
border-radius:5px;
background-color:#8BC152;
color:white;
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
