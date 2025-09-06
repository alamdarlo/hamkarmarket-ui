import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import { navigationChildren, SidebarMenuItems } from "./menuItems";
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

interface IProps {
  children?: React.ReactNode;
  onCollapse: () => void;
  collapsed: boolean;
}

export default function Sidebar(props: IProps) {

  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleClick = (item: navigationChildren) => {
    setOpenItems((prev) => ({
      ...prev,
      [item.name]: !prev[item.name],
    }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Backdrop
        open={props.collapsed}
        sx={{ zIndex: (theme) => theme.zIndex.drawer - 1, backgroundColor: "rgba(0, 0, 0, 0)" }}
        onClick={props.onCollapse}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={props.collapsed}
        onClose={props.onCollapse}
      >
        <DrawerHeader dir="ltr">
          <IconButton
            onClick={props.onCollapse}
            color="primary"
            sx={{
              fontSize: "xx-large",
              color: "black",
              width: 64,
              height: 60,
            }}
          >
            <MenuOpenIcon fontSize="large" />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <SidebarItems /> */}
        {SidebarMenuItems?.map((item, index) => (
          <List className="py-0 " sx={{ direction: "rtl" }} key={"List" + item.name + index}>
            {item.subChild?.length != null && item.subChild?.length > 0 ?
              (
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    className="py-2"
                    onClick={(e) => { e.preventDefault(); handleClick(item); }}
                  >
                    <ListItemIcon sx={{ padding: "0" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                    <ListItemIcon className="min-w-0" >
                      {openItems[item.name] ? (
                        <KeyboardArrowDownIcon sx={{ padding: "0", minWidth: "0" }} />
                      ) : (
                        <ArrowDropUpIcon sx={{ padding: "0", minWidth: "0" }} />
                      )}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              )
              : (
                <Link href={item.link ?? "/"} passHref legacyBehavior>
                  <ListItem disablePadding>
                    <ListItemButton className="" sx={{ pl: 4 }}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              )}
            <Divider />
            {item.subChild?.map((subItem, subIndex) => (
              <Collapse
                className="p-0 bg-gray-100 border-b-2"
                in={openItems[item.name] ?? false}
                key={"Collapse" + subItem.name + subIndex}
              >
                <List className="" key={"SubList" + subItem.name + subIndex}>
                  <Link href={subItem.link ?? "/"} >
                    <ListItem disablePadding className="">
                      <ListItemButton className="" sx={{ pl: 4 }}>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.title} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
            ))}
          </List>

        ))
        }
      </Drawer>
      {/* .div */}
    </Box>
  );
}
