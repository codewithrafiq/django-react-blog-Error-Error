import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { gql, useQuery } from "@apollo/client";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyle = makeStyles((theme) => ({
  navContainer: {
    width: 250,
    background: "#511",
    height: "100%",
  },
  avatorImage: {
    display: "block",
    margin: "0.5rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  listItem: {
    color: "tan",
  },
}));

const NavBar = () => {
  const { loading, error, data } = useQuery(PROFILE_IMAGE);

  const classes = useStyle();
  const [showmenu, setShowmenu] = useState(false);
  const sMenue = () => {
    setShowmenu(!showmenu);
  };

  const sideMenue = () => (
    <Box onClick={sMenue} className={classes.navContainer}>
      <Avatar
        className={classes.avatorImage}
        src={data?.profile?.image}
        alt="Rafiqul"
      />
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon className={classes.listItem}>
            <Home />
          </ListItemIcon>
          <ListItemText className={classes.listItem} primary="Home" />
        </ListItem>
        <Divider />

        <ListItem button component={Link} to="/profile">
          <ListItemIcon className={classes.listItem}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItem} primary="Profile" />
        </ListItem>
        <Divider />

        <ListItem button component={Link} to="/addpost">
          <ListItemIcon className={classes.listItem}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItem} primary="Add Post" />
        </ListItem>
        <Divider />
        <ListItem alignItems="end" button component={Link}>
          <ListItemIcon className={classes.listItem}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItem} primary="LogOut" />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
  return (
    <>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography>
            <IconButton onClick={sMenue}>
              <MenuIcon
                style={{
                  color: "#fff",
                }}
              />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={showmenu} onClose={sMenue}>
        {sideMenue()}
      </Drawer>
    </>
  );
};

const PROFILE_IMAGE = gql`
  {
    profile {
      image
    }
  }
`;
export default NavBar;
