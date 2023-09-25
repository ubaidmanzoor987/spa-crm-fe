import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { COLORS } from "@/constants/colors";

export const GridStyle = styled(Grid)`
  border-radius: 35px;
  min-height: 30px;
  min-width: 200px;
  h1 {
    font-size: 20px;
    font-weight: bold;
  }
  p {
    font-size: 12px;
  }
`;
export const ToastImage = styled(Grid)`
  padding-top: 2px;
  padding-left: 5px;
`;
export const Heading = styled.div`
  font-family: "Argentum Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 15px;
  color: ${COLORS.WHITE_100};
  margin-bottom:5px;
`;
export const Description = styled.div`
  font-family: "Argentum Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${COLORS.WHITE_100};
`;
