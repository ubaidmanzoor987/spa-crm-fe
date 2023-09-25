import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Button, Grid, Paper } from "@mui/material";

export const Container = styled(Grid)`
  margin-top: 4rem;
  marging-right: 14rem;
  heigh: 100%;
`;

export const ImageDiv = styled.div`
  .btn-choose {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    width: auto;
    background-color: ${COLORS.LIGHT_GREEN};
    border-radius: 25px;
  }
  padding: 10px;
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 20px;
  .image-style {
    object-fit: cover;
    border-radius: 25px;
    display: block;
  }
`;

export const ModelBotton = styled.div`
  margin-top: 20px;
  margin-left: 50px;
  // padding-right: 2.3rem;
  width: 100%;
  button {
    padding: 15px 35px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 2rem;
  }
  .btn-close {
    background-color: black;
    margin-right: 2rem;
    font-size: 14px;
  }
  .btn-save {
    font-size: 14px;
  }
`;

export const DIV = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

// export const DivStyle = styled.div`
//   margin-left: 15px;
//   margin-bottom: 20px;
//   position: relative;
//   :hover .css-16r5cjy-MuiInputBase-root-MuiOutlinedInput-root {
//     border: none;
//   }
// `;

export const StyleGrid = styled(Grid)`
  display: "flex";
  background-color: ${COLORS.WHITE_100};
  overflow-x: auto;
  margin: 2rem auto;
  border-radius: 1rem;
`;

export const BoxStyle = styled(Paper)`
  margin-left: 55px;
  margin-top: 20px;
  margin-bottom: 20px;
  transform: translate(-2%, 0%);
  width: 94rem;
  background-color: white;
  box-shadow: 24px;
  border-radius: 1rem;
  padding: 25px;
  .btn-style {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 1600px) {
    width: 80rem;
    margin-top: 20px;
  }
  @media (max-width: 1500px) {
    width: 65rem;
    margin-top: 30px;
  }
  @media (max-width: 1300px) {
    width: 50rem;
    margin-top: 40px;
  }
  @media (max-width: 1100px) {
    width: 35rem;
    margin-top: 40px;
  }
`;

export const BoxForm = styled(Grid)`
  margin-left: 55px;
  margin-bottom: 30px;
  margin-top: 40px;
  transform: translate(-2%, 0%);
  width: 94rem;
  background-color: white;
  box-shadow: 24px;
  border-radius: 1rem;
  padding: 25px;

  @media (max-width: 1600px) {
    width: 80rem;
    margin-top: 20px;
  }
  @media (max-width: 1500px) {
    width: 65rem;
    margin-top: 30px;
  }
  @media (max-width: 1300px) {
    width: 50rem;
    margin-top: 40px;
  }
  @media (max-width: 1100px) {
    width: 35rem;
    margin-top: 40px;
  }
`;

export const LebalHeading = styled.div`
  font-family: "Argentum Sans";

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  padding-bottom: 12px;
  padding-left: 3px;
  color: #f05f97;
  display: inline-block;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
background-color: ${COLORS.BUTTON_COLOR};
  width: 160px;
  border-radius: 10px;
  margin-top: 10px;
  height: 50px;
  align-item: center;
  margin-bottom: 10px;
  color: white;
  font-weight: 700;
  text-transform: capitalize;
  &:hover {
    background-color: ${COLORS.BUTTON_COLOR};
  }
  margin-right: 25px;
`;
