import React from "react";
import AddIcon from "@mui/icons-material/Add";

import { StyledDivAddButton } from "./index.styles";

interface IProps {
  text: string;
}

export const DivAddText = ({ text} : IProps) => {
  return (
    <StyledDivAddButton>
      {/* <AddIcon /> */}
      <span>{text}</span>
    </StyledDivAddButton>
  );
};
