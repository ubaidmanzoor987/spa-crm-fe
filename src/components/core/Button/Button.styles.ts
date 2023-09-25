import styled from "@emotion/styled";
import { COLORS } from "@/constants/colors";

export const ButtonStyled = styled.button<{
  backgroundColor?: string;
  hoverColor?: string;
  isTransparent?: boolean;
  CaretColor?: string;
  Pan?: string;
  isHover?: boolean;
}>`
  ${({ isTransparent, backgroundColor }) =>
    isTransparent
      ? ` background-color: rgb(226, 236, 243) ;
      width:100%;
       font-weight:600;
      font-size:18px;
      height:48px;
   
      border:none;
      color: red};
         border: none; `
      : `
  border: 0px;
  border-radius:5px;
  font-weight:600;
  font-size:20px;
   
`}
  ${({ isHover }) =>
    isHover
      ? ` 
  &:hover {
    background-color:#73a144;
  }
   `
      : `
`}
  padding: 10px 25px;
  background-color: #8bc152;
  color: white;

  cursor: pointer;

  transition: 0.5s;
  background-size: 200% auto;
  display: block;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
