import styled from "@emotion/styled";
import { Grid, Skeleton } from "@mui/material";
export const StyledMainGrid = styled(Grid)`
  height: "100%",
  width: "100%",
  backgroundColor: COLORS.WHITE_100,
  opacity: 1,
`;
export const WraperGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  margin-top:50px;
`;

export const StyledGrid = styled(Grid)`
  overflow: hidden;
  width:100%;
`;
export const Div = styled.div`
  padding-right: 95px;

`;
export const StyledHeader = styled(Skeleton)`
  margin-left: 2px;
`;
export const StyledButton = styled(Skeleton)`
  margin-bottom: 50px;
  margin-top: 35px;
  position:absolute;
  right:50px;
`;
export const StyledBar = styled(Skeleton)`
  margin-bottom: 33px;
  margin-top: 115px;
  margin-left: 45px;
 border-radius: 20px;
`;
export const StyledTable = styled(Skeleton)`
  margin-bottom: 50px;
  margin-top: 10px;
  margin-left: 40px;
  margin-right: 50px;
  border-radius: 20px;
  
`;