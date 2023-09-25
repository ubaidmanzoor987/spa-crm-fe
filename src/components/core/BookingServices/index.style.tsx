import styled from "@emotion/styled";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/constants/colors";
import { Button } from "@mui/material";

export const CardContentStyle = styled(CardContent)(() => ({
  background: `${COLORS.WHITE_100}`,
  boxShadow: "-4px 4px 7px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  Width: "45rem",
  paddingBottom: "0px !important",
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
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  /* padding-bottom: 1rem; */
  /* 
   @media (max-width: 768px) {
    flex-direction: column;
    padding-inline: 1rem;
  } */
`;

export const TypographyStyle = styled(Typography)(({ color }) => ({
  color: `${color}`,
  fontSize: "18px",
  fontWeight: 700,
  fontStyle: "normal",
}));

export const SubTypographyStyle = styled(Typography)(({ color }) => ({
  color: `${color}`,
  fontSize: "12px",
  fontWeight: 400,
  fontStyle: "normal",
}));
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const P = styled.p`
  font-size: 10px;
  font-weight: 400;
`;

export const DIV = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
/* width: 110; */
  width: 17rem;
`;

export const DivButton = styled(Button)`
  background: ${COLORS.WHITE_100};
  color: ${COLORS.BLACK_100};
  border: 1px solid;
  border-color: ${COLORS.GREEN_THEME};
  padding-inline: 0.9rem;
`;
