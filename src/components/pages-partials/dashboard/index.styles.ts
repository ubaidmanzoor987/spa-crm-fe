import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Button, Grid, Typography } from "@mui/material";

export const DivBanner = styled.div`
  background: linear-gradient(180deg, #f05f97 8%, #f5a2c8 88.29%);
  margin-top: 3rem;
  display: flex;
  align-items: center;  
  justify-content: space-between;
  padding-block: 4rem;
  padding-inline: 3rem;
  position: relative;
  @media (max-width: 960px) {
    flex-direction: column;
    padding-inline: 1rem;
    width: 100%;
  }
`;

export const StyledColorGrid = styled(Grid)`
  background: linear-gradient(180deg, #f05f97 8%, #f5a2c8 88.29%);
  margin-top: 3rem;
  display: flex;
  align-items: center;  
  justify-content: space-between;
  padding-block: 4rem;
  padding-inline: 3rem;
`

export const TypographyStyle = styled(Typography)`
  color: ${COLORS.WHITE_100};
  font-weight: 700;
  font-size: 24px;
  @media (max-width: 960px) {
    font-size: 18px;
  }
`;

export const DivButton = styled(Button)`
  color: ${COLORS.WHITE_100};
  background-color: ${COLORS.GREEN_THEME};
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 16px;
  margin-right: 3.6rem;
  text-transform: none;
  &:hover {
    -ms-transform: scale(0.9);
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
    background-color: ${COLORS.GREEN_THEME};
  }
  @media (max-width: 960px) {
    font-size: 14px;
  }
`;

export const Container = styled(Grid)`
`;

export const GridStyle = styled(Grid)`
  padding-inline: 2rem;
`;

export const GridContainer = styled(Grid)`
  margin-left: 0;
  justify-content: start;
  margin-top: 0rem;
`;
