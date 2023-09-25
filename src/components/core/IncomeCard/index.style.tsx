import styled from "@emotion/styled";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/constants/colors";

export const CardContentStyle = styled(CardContent)(() => ({
  background: `${COLORS.WHITE_100}`,
  boxShadow: "-4px 4px 7px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  // Width:"10rem",
  // paddingBlock:"0.3rem",
  // border:"2px solid",
  // maxWidth:"10rem",
  paddingBottom: "0rem !important",
}));

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 0.5rem;
  padding-inline: 1rem;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  /* padding-inline: 3rem; */
  /* padding-bottom: 1rem; */
  padding-right: 3rem;
  @media (max-width: 960px) {
    justify-content: start;
    align-items: start;
    flex-direction: column;
  }
`;

export const TypographyStyle = styled(Typography)(({ color }) => ({
  color: `${color}`,
  fontSize: "22px",
  fontWeight: 700,
  fontStyle: "normal",paddingBottom:"0.8rem",
}));

export const SubTypographyStyle = styled(Typography)(({ color }) => ({
  color: `${color}`,
  fontSize: "14px",
  fontWeight: 700,
  fontStyle: "normal",
}));
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

`;
export const P = styled.p`
  font-size: 14px;
  font-weight: 400;
`;
