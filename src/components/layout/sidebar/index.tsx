import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import FirstPageSharpIcon from "@mui/icons-material/FirstPageSharp";
import LastPageSharpIcon from "@mui/icons-material/LastPageSharp";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Menu, MenuItem, Toolbar, useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import Image from "next/image";
import { useRouter } from "next/router";
// import Link from "next/link";
import { SUPERADMINITEM } from "./SuperAdminMenu";
import { BRANCHITEM } from "./BranchMenu";
import {
  DivFlex,
  FlexRow,
  ListItemTextStyled,
  TypographyStyled,
  DrawerHeader,
  MainStyle,
  DivRow,
  DivTitle,
  DivProfile,
  AppBarStyle,
  DivOne,
  DivTwo,
  DivThree,
  DIV,
  ListItemTextStyledActive,
} from "./sidebar.styles";

import { AppState } from "@/store/rootReducer";
import { IRole } from "@/store/auth/types";
import { useEffect } from "react";
import {
  getAllAmenitiesThunk,
  getAllRoomsThunk,
  getAllServicesThunk,
  getAllTherapistThunk,
  getAllBookingsThunk,
  getAllStaffThunk,
  getAllProductsThunk,
  getDefaultCurrency,
  getCurrency,
  getAllBranchThunk,
} from "@/store/app/appSlice";

import { Settings, Logout } from "@mui/icons-material";
import { getAuthDataSelector, resetUser } from "@/store/auth";
import path from "path";
import { BRANCHSETTING } from "./BranchSettingMenu";
interface Props {
  children: React.ReactNode;
  pageTitle: string;
}
export default function LeftDrawer({ children, pageTitle }: Props) {
  const role = useAppSelector((state: AppState) => state.auth.user.role);
  const {
    user: { branch_id },
  } = useAppSelector(getAuthDataSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isTablet = useMediaQuery("(max-width: 960px)");
  const isScroll = useMediaQuery("(max-width: 1295px) and (max-height:768px)");

  const [collapse, setCollapse] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGoToSettings = () => {
    router.push("/branchSetting");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(resetUser);
    setAnchorEl(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    setCollapse(isTablet);
  }, [isTablet]);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };
  useEffect(() => {
    if (branch_id) {
      dispatch(getAllServicesThunk());
      dispatch(getAllAmenitiesThunk());
      dispatch(getAllRoomsThunk());
      dispatch(getAllTherapistThunk());
      dispatch(getAllBookingsThunk());
      dispatch(getAllStaffThunk());
      dispatch(getAllProductsThunk());
      dispatch(getCurrency());
      dispatch(getDefaultCurrency(branch_id));
      dispatch(getAllBranchThunk());
    }
  }, []);

  const drawerWidth = collapse ? 80 : 240;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarStyle position="fixed" open={true} drawerwidth={drawerWidth}>
        <Toolbar
          sx={{
            background: "white",
            paddingBlock: "3.2rem",
          }}
        >
          <DivRow>
            <DivTitle>Home | {pageTitle}</DivTitle>
            <DivProfile>
              <DivOne>
                {/* <Image src={"/svgs/bell.svg"} width={25} height={25} /> */}
              </DivOne>
              <DivTwo>
                {/* <Image src={"/svgs/search.svg"} width={25} height={25} /> */}
              </DivTwo>
              <DivThree>
                <Image
                  src={"/svgs/dummyprofile.svg"}
                  width={50}
                  height={50}
                  onClick={handleClick}
                />
              </DivThree>
            </DivProfile>
          </DivRow>
        </Toolbar>
      </AppBarStyle>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            // overflowX: "hidden",
            // overflowY: "hidden",
            overflowY: "visible",
            transition: "all 0.1s ease-in-out",
            boxShadow: "8px 0 10px -6px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DrawerHeader>
          <DivFlex>
            {collapse ? (
              <Image src={"/svgs/cms-spa-logo.svg"} width={60} height={60} />
            ) : (
              <Image src={"/svgs/cms-spa-logo.svg"} width={85} height={85} />
            )}
          </DivFlex>
        </DrawerHeader>
        <Divider
          sx={
            collapse
              ? { width: "4rem", marginInline: "auto" }
              : { width: "12rem", marginInline: "auto" }
          }
        />
        <DIV>
          <List
            sx={{
              overflowX: "hidden",
              overflowY: isScroll ? "hidden" : "hidden",
              padding: 0,
            }}
          >
            {router.pathname === "/branchSetting"
              ? BRANCHSETTING.map((branchItem) => (
                  <ListItem
                    key={branchItem.title}
                    sx={{ display: "block", paddingBottom: "0px" }}
                  >
                    {/* <Link href={branchItem.path}> */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: "center",
                      }}
                      onClick={() => router.push(branchItem.path)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: collapse ? 0 : 4,
                          justifyContent: "center",
                        }}
                      >
                        {/* {collapse ? branchItem.icon : branchItem.icon} */}
                        {!collapse &&
                        router &&
                        router.pathname.includes(branchItem.page)
                          ? branchItem.icon1
                          : branchItem.icon}
                      </ListItemIcon>
                      {!collapse &&
                        (router && router.pathname.includes(branchItem.page) ? (
                          <ListItemTextStyledActive
                            primary={branchItem.title}
                          />
                        ) : (
                          <ListItemTextStyled primary={branchItem.title} />
                        ))}
                    </ListItemButton>
                    {/* </Link> */}
                  </ListItem>
                ))
              : role === IRole.BRANCH_ADMIN ||
                role === IRole.RECECPTIONIST ||
                role === IRole.THERAPIST
              ? BRANCHITEM.map((branchItem) => (
                  <ListItem
                    key={branchItem.title}
                    sx={{ display: "block", paddingBottom: "0px" }}
                  >
                    {/* <Link href={branchItem.path}> */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: "center",
                      }}
                      onClick={() => router.push(branchItem.path)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: collapse ? 0 : 4,
                          justifyContent: "center",
                        }}
                      >
                        {/* {collapse ? branchItem.icon1 : branchItem.icon} */}
                        {!collapse &&
                        router &&
                        router.pathname.includes(branchItem.page)
                          ? branchItem.icon1
                          : branchItem.icon}
                      </ListItemIcon>

                      {!collapse &&
                        (router && router.pathname.includes(branchItem.page) ? (
                          <ListItemTextStyledActive
                            primary={branchItem.title}
                          />
                        ) : (
                          <ListItemTextStyled primary={branchItem.title} />
                        ))}
                    </ListItemButton>
                    {/* </Link> */}
                  </ListItem>
                ))
              : SUPERADMINITEM.map((superAdminItem) => (
                  <ListItem
                    key={superAdminItem.title}
                    sx={{ display: "block", paddingBottom: "0px" }}
                  >
                    {/* <Link href={superAdminItem.path}> */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: "center",
                      }}
                      onClick={() => router.push(superAdminItem.path)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: collapse ? 0 : 4,
                          justifyContent: "center",
                        }}
                      >
                        {/* {collapse ? superAdminItem.icon : superAdminItem.icon1} */}
                        {!collapse &&
                        router &&
                        router.pathname.includes(superAdminItem.page)
                          ? superAdminItem.icon1
                          : superAdminItem.icon}
                      </ListItemIcon>
                      {!collapse &&
                        (router &&
                        router.pathname.includes(superAdminItem.page) ? (
                          <ListItemTextStyledActive
                            primary={superAdminItem.title}
                          />
                        ) : (
                          <ListItemTextStyled primary={superAdminItem.title} />
                        ))}
                    </ListItemButton>
                    {/* </Link> */}
                  </ListItem>
                ))}
          </List>
          <FlexRow onClick={toggleCollapse}>
            {!collapse ? <FirstPageSharpIcon /> : ""}
            <TypographyStyled paddingLeft={collapse ? 0 : 1.5}>
              {collapse ? <LastPageSharpIcon /> : ""}
            </TypographyStyled>
          </FlexRow>
        </DIV>
      </Drawer>
      <MainStyle open={true} drawerwidth={drawerWidth}>
        {children}
      </MainStyle>
      {/* DropDown Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            //            "& .css-ptiqhd-MuiSvgIcon-root":{
            // color:red;
            //             },
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "& .css-ptiqhd-MuiSvgIcon-root": {
              color: "#F05F97",
            },
            "& .css-1a2vgp9-MuiButtonBase-root-MuiMenuItem-root ": {
              fontSize: "16px",
              fontWeight: "700",
            },

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        <MenuItem onClick={handleGoToSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Branch Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
            {/* <Logout fontSize="small" /> */}
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
