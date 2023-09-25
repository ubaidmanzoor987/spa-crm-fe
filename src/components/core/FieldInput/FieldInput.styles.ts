import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

import { COLORS } from "@/constants/colors";

export const FieldInputStyled = styled(TextField)<{
  isShadow?: boolean;
  isEndContent?: string;
}>`
  ${({ isShadow }) =>
    isShadow
      ? `
  box-shadow: 0px 4px 3px 1px rgba(0, 0, 0, 0.25);
      `
      : `
`}
  ${({ isEndContent }) =>
    isEndContent && isEndContent?.length > 0
      ? `
    ::after {
      content: '${isEndContent}';
      position: absolute;
      right: 30px;
      top: 12px;
    }
    `
      : `
    `}

  width: 100%;
  color: #7e7e7e;
  position: relative;
  border-radius: 10px;
  &.MuiTextField-root > div {
    border-radius: 10px;
    background-color: ${COLORS.WHITE_100};
    font-size: 14px;
    font-style: normal;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }
  &.error {
    border-color: ${COLORS.RED_100};
    border-width: 2px;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-width: 0.5px;
      border-color: ${COLORS.BLUE_THEME};
    }
  }
  & .MuiInputBase-input {
    height: 18px;
    font-weight: 800;
    padding: 13.5px 14px;
  }
`;
