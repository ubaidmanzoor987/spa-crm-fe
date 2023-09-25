import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";


import { StyledDivAddButton, StyledText } from "./index.styles";

interface IProps {
  text: string;
}

export const DivPrintText = ({ text }: IProps) => {
  return (
    <StyledDivAddButton>
      <Image src={'/svgs/printIcon.svg'} width={15} height={15} />
      <StyledText>{text}</StyledText>
    </StyledDivAddButton>
  );
};
