import Image from "next/image";
import { Box } from "@mui/material";
import { StyledGridOverlay } from "./index.styles";

export default function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <Image src={'/svgs/bell.svg'} width={50} height={50} />
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }