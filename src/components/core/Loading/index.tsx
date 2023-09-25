import React from "react";
import { Loader, StyledPreloader } from "./index.styles";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
// import { COLORS } from "@/constants/colors";


interface IProps {
  isSubmitting: boolean;
  content: string;
  text: string;
}

export const Loading = () => {
  return (
    <>
      <StyledPreloader>

          <Loader>
            <Image src={"/svgs/saving.svg"} width={300} height={200} />
          </Loader>

      </StyledPreloader>
    </>
  );
};
