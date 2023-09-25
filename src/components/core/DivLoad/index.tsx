import React from "react";
import { StyledDivload } from "./index.styles";
import { CircularProgress } from "@mui/material";
import { COLORS } from "@/constants/colors";

interface IProps {
  isSubmitting: boolean;
  content: string;
  text: string;
}

export const DivLoad = ({ isSubmitting, content, text }: IProps) => {
  return (
    <>
      {isSubmitting === true ? (
        <StyledDivload>
          <span> {content}</span>
          <CircularProgress style={{ color: COLORS.WHITE_100 }} size={15} />
        </StyledDivload>
      ) : (
        <>{text}</>
      )}
    </>
  );
};
