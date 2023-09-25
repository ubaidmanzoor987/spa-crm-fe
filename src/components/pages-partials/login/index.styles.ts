import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { TextField, Grid, Typography } from "@mui/material";

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Container = styled(Grid)`
  background-color: ${COLORS.THEME_COLOR};
  height: 100vh;
  .css-sk2g6h-MuiFormHelperText-root.Mui-error {
    color: white;
}
`;

export const StyledGridLeft = styled(Grid)`
  position: relative;
  & > * {
    filter: brightness(40%);
  }
  & > *:last-child {
    filter: none;
  }
`;

export const StyledGridRight = styled(Grid)`
  background-color: ${COLORS.THEME_COLOR};
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 100%
  }
  .css-uscfho-MuiFormHelperText-root.Mui-error {
    color: white !important;
  }
`;


export const StyledGridLogo = styled(Grid)`
  position: relative;
  width: 400px;
`;

export const Heading = styled.div`
  text-align: center;
  font-style: bold;
  font-weight: 700;
  font-size: 48px;
  color: #ffffff;
`;

export const Input = styled(TextField)`
  width: 100%;
  margin: 2rem auto;
  margin-bottom: 0rem !important;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background: ${COLORS.WHITE_100};
  border-radius: 0.8rem;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0px auto;
  justify-content: space-between;
`;

export const InnerFlex = styled.div`
  display: flex;
  margin-left: -10px;
`;

export const H4 = styled.h4`
  color: ${COLORS.WHITE_100};
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
`;

export const DivButton = styled.div`
  margin-top: 40px !important;
  margin: 0px auto;
  display: flex;
  justify-content: center;

  button {
    padding: 10px 100px;
  }
  @media(max-width:400px){
    button {
      padding: 10px 50px;
    }
  }

`;
export const P = styled.p`
  margin-top: 20px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.WHITE_100};
  font-size: 12px;
  margin: 0 auto;
  font-weight: bold;
`;
export const SPAN = styled.span`
  color: #8bc152;
  cursor: pointer;
  padding-left: 4px;
  font-weight: bold;
`;

export const StyledTypography = styled(Typography)`
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${COLORS.WHITE_100};
  padding-left: 1rem;
  padding-bottom: 1rem;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
`;

export const DivSpace= styled.div`
margin-block: 1rem;
`