import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";

export const Container = styled(Grid)`
  height: 100vh;
`;

export const Main = styled(Grid)`
  position: relative;
  height: 100%;
`;

export const DivLogo = styled.div`
  padding-top: 5%;
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 380px) {
    width: 100px;
    height: 100px;
  }
`;

export const DivTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: 700;
  font-size: 40px;
  margin-top: 4rem;
  color: ${COLORS.WHITE_100};

  @media (max-width: 900px) {
    font-size: 32px;
  }
  @media (max-width: 500px) {
    font-size: 20px;
    text-align: center;
    margin-top: 1rem;
  }
  text-align: center;
`;

export const StyleDiv = styled(Grid)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
`;

export const DivDesc = styled.div`
  padding: 0 20px;
  margin-top: 3rem;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  color: ${COLORS.WHITE_100};
  @media (min-width: 1300px) {
    padding-inline: 10rem;
  }
  @media (max-width: 1092px) {
    font-size: 16px;
  }
`;

export const DivButton = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  Button {
    padding-inline: 4rem;
  }
`;

export const Icon = styled.img`
  margin-left: 1rem;
`;

export const StyledTypography = styled(Typography)`
  position: fixed;
  bottom: 0;
  left: 0;
  color: ${COLORS.WHITE_100};
  padding-left: 1rem;
  padding-bottom: 1rem;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
`;
