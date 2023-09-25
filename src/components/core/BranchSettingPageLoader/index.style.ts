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
  margin-top: 35px;
`;
export const StyledHeader = styled(Skeleton)`
  margin-left: 2px;
`;
export const StyledImage = styled(Skeleton)`
  margin-bottom: 50px;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 20px;
`;
export const StyledTable = styled(Skeleton)`
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 20px;
`;
export const StyledForm = styled(Skeleton)`
  //   margin-bottom: 50px;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  //   border-radius:20px;
`;
export const Div = styled.div`
  padding-right: 95px;
`;
export const StyledGrid = styled(Grid)`
  overflow: hidden;
  width: 100%;
`;
