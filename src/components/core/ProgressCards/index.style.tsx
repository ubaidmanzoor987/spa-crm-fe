import styled from "@emotion/styled";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/constants/colors";

export const CardContentStyle = styled(CardContent)(() => ({
  background: `${COLORS.WHITE_100}`,
  boxShadow: "4px 4px 7px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
}));

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1.5rem;
`;

export const TypographyStyle = styled(Typography)(({ color }) => ({
  color: `${color}`,
  fontSize: "22px",
  fontWeight: 700,
  fontStyle: "normal",
}));
