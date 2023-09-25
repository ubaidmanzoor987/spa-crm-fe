import { COLORS } from "@/constants/colors";
import styled from "@emotion/styled";
import { ListItemText, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth: number;
}

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const DivFlex = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 1.5rem;
  border: "2px solid black";
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 3.5rem;
  cursor: pointer;
  padding-left: 2rem;
  padding-bottom: 1rem;
  svg{
    position: absolute;
    height: 1em;
    top: 50%;
    right: -19px;
    background-color: white;
    border: 1px solid #8bc152;
    border-radius: 45px;
    color: #8bc152;
    width:35px;
    height:35px;
  }
`;
export const TypographyStyled = styled(Typography)(({ paddingLeft }) => ({
  paddingLeft: `${paddingLeft}rem`,
  fontWeight: 900,
  fontSize: 16,
}));
export const ListItemTextStyled = styled(ListItemText)(() => ({
  display: "flex",
  color: `${COLORS.BLACK_100}`,
  alignItems: "center",
  fontSize: "16px",
  fontStyle: "normal",
  position: "relative",
  "& .MuiTypography-root": {
    fontWeight: 900,
  },
  "&:hover .MuiTypography-root": {
    color: `${COLORS.THEME_COLOR}`,
    "&:after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "40%",
      borderBottom: `2px solid ${COLORS.GREEN_THEME}`,
    },
  },
}));

export const ListItemTextStyledActive = styled(ListItemText)(() => ({
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  fontStyle: "normal",
  position: "relative",
  "& .MuiTypography-root": {
    fontWeight: 900,
    color: `${COLORS.THEME_COLOR}`,
  },
  "&:after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "40%",
    color: `${COLORS.THEME_COLOR}`,
    borderBottom: `2px solid ${COLORS.GREEN_THEME}`,
  },
}));

export const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ open, drawerwidth }) => ({
  background: "white",
  width: `calc(100% - ${drawerwidth}px)`,
  transition: "all 0.3s ease-in-out",
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
    transition: "all 0.1s ease-in-out",
  }),
}));

export const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
  drawerwidth: number;
}>(({ open, drawerwidth }) => ({
  marginTop: "4rem",
  position: "absolute",
  marginLeft: drawerwidth + 120,
  height: "50%",
  width: `calc(100% - ${drawerwidth}px)`,
  transition: "all 0.3s ease-in-out",
  ...(open && {
    width: `calc(98% - ${drawerwidth}px)`,
    marginLeft: drawerwidth,
    transition: "all 0.1s ease-in-out",
  }),
  "& .MuiContainer-root": { marginInline: "0", overflow: "hidden" },
}));

export const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-inline: 2rem;
  width: 100%;
`;

export const DivTitle = styled.h2`
  color: ${COLORS.THEME_COLOR};
  font-style: normal;
  font-weight: 700;
  @media (max-width: 960px) {
    font-size: 18px;
  }
`;

export const DivProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-evenly;
  width: 15%;
  justify-content: flex-end;

  @media (max-width: 1280px) {
    width: 35%;
  }
`;
export const DivOne = styled.div`
  cursor: pointer;
`;
export const DivTwo = styled.div`
  cursor: pointer;
`;
export const DivThree = styled.div`
  cursor: pointer;
`;

export const DIV = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;


export const SvgDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  svg {
    color: #8BC152;
  }
  svg:hover {
    color: #f05f97;
  }
  .css-8pxyhm svg {
    color: #8BC152;
    color: red;
}
`;