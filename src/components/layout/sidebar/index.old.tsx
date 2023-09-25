import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import React, { Children, useEffect, useState } from "react";
import { SUPERADMINITEM } from "./SuperAdminMenu";
import FirstPageSharpIcon from "@mui/icons-material/FirstPageSharp";
import LastPageSharpIcon from "@mui/icons-material/LastPageSharp";
import {
  DrawerHeader,
  DivFlex,
  FlexRow,
  TypographyStyled,
  ListItemTextStyled,
  
} from "./sidebar.styles";
import Image from "next/image";


export default function MiniDrawer() {
  const [collapse, setCollapse] = useState(false);

  const isTablet = useMediaQuery("(max-width: 960px)");

  useEffect(() => {
    setCollapse(isTablet);
  }, [isTablet]);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const drawerWidth = collapse ? 80 : 200;

  return (
    <Box sx={{ display: "flex", border:"2px solid black"}}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          border:"2px solid red",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
            // overflowY: "hidden",
            overflowY: collapse && isTablet ? "scroll" : "hidden",
            transition: "all 0.3s ease-in-out",
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
        <Divider sx={{ width: "10rem", marginInline: "auto" }} />
        <List
          sx={{
            overflowX: "hidden",
            // overflowY: collapse && isTablet ? "scroll" : "hidden",
            padding: 0,
          }}
        >
          {SUPERADMINITEM.map((menuItem) => (
            <ListItem key={menuItem.title} sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapse ? 0 : 4,
                    justifyContent: "center",
                  }}
                >
                  {collapse ? menuItem.icon : menuItem.icon}
                </ListItemIcon>
                {!collapse && <ListItemTextStyled primary={menuItem.title} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <FlexRow onClick={toggleCollapse}>
          {!collapse ? <FirstPageSharpIcon /> : ""}
          <TypographyStyled paddingLeft={collapse ? 0 : 1.5} >
            {collapse ? <LastPageSharpIcon /> : "Collapse"}
          </TypographyStyled>
        </FlexRow>
      </Drawer>

      helo
    </Box>
  );
}
