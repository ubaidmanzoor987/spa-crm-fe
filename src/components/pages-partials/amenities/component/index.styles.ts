import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const Container = styled(Grid)`
  margin-top: 4rem;
`;
export const FlexRowGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-inline: 2rem;
`;
export const FlexCol = styled(Grid)`
  display: flex;
  flex-direction: column;
  .input_width {
    width: 42rem;
  }

  @media (max-width: 820px) {
    .input_width {
      width: 30rem;
    }
  }
  @media (max-width: 560px) {
    .input_width {
      width: 17.5rem;
    }
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
    padding: 15px 35px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-inline: 3.9rem;
    padding-bottom: 3rem;
  }
  .btn-close {
    background-color: black;
    margin-right: 2rem;
    font-size: 14px;
  }
  .btn-save {
    font-size: 14px;
    background-color: #8bc152;
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
  font-family: Argentum Sans;
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
  "& .MuiDataGrid-toolbarContainer": {
    padding: "15px",
    justifyContent: "flex-end",
  },
  "& .css-x21m3b-MuiButtonBase-root-MuiButton-root ": {
    backgroundColor: "#8bc152",
    color: "white !important",
    textTransform: "capitalize",
    padding: "7px 15px",
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 24px;
  border-radius: 1rem;
  /* padding: 4rem; */
  @media (max-width: 820px) {
    width: 35rem;
  }
  @media (max-width: 560px) {
    width: 25rem;
  }
`;
export const StyledAddMainButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
`;
export const H1 = styled.h1`
  color: ${COLORS.THEME_COLOR};
  font-weight: 700;
  font-size: 24px;
  /* padding: 1.5rem; */
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
  .Poiner {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
export const LebalHeading = styled.div`
  font-weight: 600;
  font-size: 16px;
  font-style: normal;
  padding-bottom: 0.8rem;
`;

export const DivFlexRow = styled.div`
  display: flex;
  padding-left: 3.5rem;
  margin-bottom: 2.5rem;
`;

export const StyledDivider = styled(Divider)`
  width: 92%;
  margin-inline: auto;
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
  margin-top: 20px;
`;
