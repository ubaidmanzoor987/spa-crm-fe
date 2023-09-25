import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Field } from "formik";

export const Container = styled(Grid)`
  margin-top: 4rem;
`;
export const StyledTextArea = styled(Field)`
  border-radius: 8px;
  resize: none;
  padding: 10px;
  height: 90px;
  width: 100%;
`;
export const StyledAddMainButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
`;
export const FlexRowGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-inline: 2rem;
`;
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .theme_color {
    color: ${COLORS.THEME_COLOR};
    padding: 0px !important;
  }
  #id-helper-text {
    color: red;
    margin-left: -1px;
  }
`;

export const TypographyStyle = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const DivButton = styled.div`
  button {
    padding: 15px 35px;
  }

  &:hover {
    -ms-transform: scale(0.9);
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
`;

export const ModelBotton = styled.div`
  button {
    padding: 10px 25px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* padding-inline: 5.5rem; */
    padding-right: 1.9rem;
    padding-bottom: 3rem;
  }
  .btn-close {
    background-color: black;
    margin-right: 2rem;
    font-size: 14px;
  }
  .btn-save-bookin {
    background-color: ${COLORS.THEME_COLOR};
    margin-right: 2rem;
    font-size: 14px;
  }
  .btn-save {
    font-size: 14px;
  }
  .btn-remove {
    padding: 12px 25px;
    font-size: 12px;
    background-color: ${COLORS.THEME_COLOR};
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .btn-add-service {
    padding: 15px 25px;
    font-size: 16px;
    font-weight: 700;
  }
`;

export const StyledColorGrid = styled(Grid)`
  background: linear-gradient(180deg, #f05f97 8%, #f5a2c8 88.29%);
  margin-top: 2rem;
  margin-inline: 2rem;
  /* padding-block: 4rem; */
  border-radius: 1rem;
`;

export const Input = styled(TextField)`
  width: 100%;
  /* margin: 2rem auto; */
  margin-bottom: 2rem !important;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background: ${COLORS.WHITE_100};
  border-radius: 10px;
  margin-inline: 2rem;
`;

export const P = styled.p`
  font-size: 16px;
  font-weight: 550;
  color: ${COLORS.WHITE_100};
  margin-inline: 0;
  margin: 15px 0 15px 15px;
`;

export const DIV = styled(Grid)`
  display: flex;
  flex-direction: column;
`;
export const IconDiv = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  align-items: center;
  width: 3.5rem;
`;
export const PointerDiv = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const DivStyle = styled.div`
  margin-left: 15px;
  margin-bottom: 20px;
  position: relative;
`;

export const HeaderTag = styled.h1`
  color: ${COLORS.BLACK_100};
  font-weight: bolder;
  font-size: 16px;
`;

export const StyleGrid = styled(Grid)`
  display: "flex";
  background-color: ${COLORS.WHITE_100};
  overflow-x: auto;
  margin: 2rem auto;
  border-radius: 1rem;
  .css-t89xny-MuiDataGrid-columnHeaderTitle {
    font-weight: 800;
    font-family: Argentum Sans;
    font-size: 16px;
    color: black;
  }
`;

export const DataGridStyle = styled(DataGrid)(() => ({
  paddingLeft: "25px",
  "& .MuiDataGrid-cell ": {
    padding: "0 44px",
  },
  "& .css-1al08jm": {
    justifyContent: "flex-start",
  },
  border: "0px",
  "& .css-ltf0zy-MuiDataGrid-iconButtonContainer ": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader:focus-within": {
    outline: "none !important",
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignContent: "space-around",
    paddingLeft: "32px",
  },
  "& .MuiDataGrid-sortIcon": {
    display: "none",
  },

  "& .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    width: "0.4em",
    height: "0.4em",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
    background: `${COLORS.THEME_COLOR}`,
    borderRadius: "7px",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
    backgroundColor: `${COLORS.GREEN_THEME}`,
    borderRadius: "10px",
  },
  "& .MuiCheckbox-root svg": {
    width: 20,
    height: 20,
    backgroundColor: "transparent",
    border: "1px solid #d9d9d9",
    borderRadius: 2,
  },
  "& .MuiCheckbox-root svg path": {
    display: "none",
  },
  "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
    backgroundColor: `${COLORS.GREEN_THEME}`,
    borderColor: `${COLORS.GREEN_THEME}`,
  },
  "& .MuiDataGrid-toolbarContainer": {
    padding: "15px",
    justifyContent: "flex-end",
  },
  "& .css-x21m3b-MuiButtonBase-root-MuiButton-root ": {
    backgroundColor: "#8bc152",
    color: "white !important",
    padding: "7px 15px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#73a144",
    },
  },
}));

export const DivSearch = styled.div`
  position: absolute;
  margin-top: 0.9rem;
  margin-left: 0.9rem;
  z-index: 10;
`;

export const BoxStyle = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  height: 95%;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 24px;
  border-radius: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.2em;
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.THEME_COLOR};
    border-radius: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.GREEN_THEME};
    border-radius: 10px;
  }
  @media (max-width: 960px) {
    width: 35rem;
  }
  @media (max-width: 560px) {
    width: 25rem;
  }
`;

export const H1 = styled.h1`
  color: ${COLORS.THEME_COLOR};
  font-weight: 700;
  font-size: 24px;
  margin-inline: auto;
`;

export const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-inline: 3rem;
  margin-bottom: 0.5rem;
  /* padding-block: 1rem; */
  padding-top: 0.5rem;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  .Poiner {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
export const LebalHeading = styled.div`
  font-weight: 600;
  font-size: 14px;
  font-style: normal;
  padding-bottom: 0.8rem;
  color: ${COLORS.BLACK_100};
`;
export const LebalHeadingMain = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  font-style: normal;
  color: ${COLORS.BLACK_100};
`;
export const LebalHeadingSide = styled.div`
  font-weight: 600;
  font-size: 15px;
  font-style: normal;
  padding-top: 0.8rem;
  color: ${COLORS.BLACK_100};
`;
export const LebalHeadingCheck = styled.div`
  font-weight: 600;
  font-size: 15px;
  font-style: normal;
  margin-bottom: -2px;
  color: ${COLORS.BLACK_100};
`;
export const DivHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Anchor = styled.a`
  text-decoration: none;
`;
export const DivFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 1.5rem;
  margin-bottom: 2.5rem;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const StyledDivider = styled(Divider)`
  width: 92%;
  margin-inline: auto;
`;

export const ButtonStyle = styled(Button)`
  background-color: ${COLORS.GREEN_THEME};
  font-size: 12px;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
  padding: 10px 15px;
  &:hover {
    background-color: ${COLORS.THEME_COLOR};
  }
`;

export const BoxFormStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-inline: 1rem;
  padding-block: 1rem;

  // .Field_Row {
  //   display: flex;
  //   flex-direction: row;
  //   width: 100%;
  //   margin-top: 0.3rem;

  //   @media (max-width: 960px) {
  //     flex-direction: column;
  //   }
  //   @media (max-width: 460px) {
  //     padding-inline: 1rem;
  //   }
  // }
  // @media (max-width: 460px) {
  //   .RP {
  //     width: 18rem;
  //     /* padding-inline: 1rem; */
  //     padding-left: 1rem;
  //   }
  // }
`;
export const BoxModel = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 1rem;
  @media (max-width: 960px) {
    flex-direction: column;
  }
  .choose_btn {
    display: flex;
    flex-direction: row;
  }

  .field_Column {
    display: flex;
    flex-direction: column;
  }
  .field_Column .margin {
    margin-top: 0.3rem;
  }
  .styled_button {
    background-color: ${COLORS.GREEN_THEME};
    font-size: 12px;
    margin-top: 1rem;
    margin-bottom: 2.5rem;
    padding: 10px 15px;
    height: 5vh;
    margin-top: 18vh;
    &:hover {
      background-color: ${COLORS.THEME_COLOR};
    }
    @media (max-width: 960px) {
      margin-top: 1vh;
    }
  }
`;

export const StyledFormControl = styled(FormControl)(() => ({
  // width: 400,
  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "13.4px 14px",
  },
  "& .css-17ttchb-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {
    borderRadius: "10px",
  },
  "& .css-yf8vq0-MuiSelect-nativeInput": {
    bottom: "17px",
    left: "10px",
    position: "absolute",
    opacity: "1",
    width: "100%",
    border: "0",
  },
}));

export const OptionButton = styled(Button)<{
  backgroundColor: string;
  colorX: string;
  borderColor: string;
}>(({ backgroundColor, colorX, borderColor }) => ({
  backgroundColor: `${backgroundColor}`,
  color: `${colorX}`,
  border: "1px solid",
  borderColor: `${borderColor}`,
  fontSize: "12px",
  fontWeight: 500,
  padding: "6px 17px",
  marginRight: "1rem",

  "&:hover": {
    backgroundColor: `${colorX}`,
    color: `${COLORS.WHITE_100}`,
  },
}));

export const DivFlexCol = styled.div`
  display: flex;
  align-items: center;
  .Margin {
    margin-right: 1rem;
  }
`;
export const DivFlexColM = styled.div`
  display: flex;
  align-items: center;
  .Margin {
    margin-right: 1rem;
  }
  margin-top: 1.5rem;
`;
export const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
export const TrStyle = styled.tr`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; */
  width: 100%;
  padding: 0.5rem;
  border-bottom: 2px solid #eee;
`;

export const TrDataStyle = styled.tr`
  width: 100%;
  padding-block: 0.5rem;
  /* padding-inline:2rem; */

  border-bottom: 2px solid #eee;
  .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
export const TdStyleName = styled.td`
  /* border:2px solid black; */
`;
export const TdStyle = styled.td`
  /* border:2px solid black; */
`;
export const GridLayoutStyle = styled.div<{ isSuperAdmin?: boolean }>`
  ${({ isSuperAdmin }) =>
    isSuperAdmin
      ? `
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 37px;
   `
      : ``}
`;
export const StyledBranchDropDown = styled.div`
margin-left: 30px;  
margin-right: 30px;
margin-bottom: 20px;
`;
