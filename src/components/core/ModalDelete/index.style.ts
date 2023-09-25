import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { DialogActions, DialogContentText, DialogTitle } from "@mui/material";

export const DialogTitleStyle = styled(DialogTitle)`
  padding-top: 2rem;
  padding-right: 16rem;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.THEME_COLOR};
`;

export const DialogContentTextStyle = styled(DialogContentText)`
  font-size: 14px;
  font-weight: 400;
`;

export const DialogActionsStyle = styled(DialogActions)`
  button {
    padding: 8px 25px;
    font-size: 14px;
  }
  #btn-1 {
    background-color: ${COLORS.THEME_COLOR};
  }
`;
