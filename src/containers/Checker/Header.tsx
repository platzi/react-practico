import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "@logos/green.png";
import { useAuth } from "@redux/Auth";
import { useAviato } from "@redux/Aviato";
import "@styles/Header.scss";

function Header(props: any) {
  const history = useHistory();
  const { LogoutRedux, user } = useAuth();
  const { onDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { contractor, business } = useAviato();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await LogoutRedux();
    handleClose();
    if (user === undefined) {
      window.location.href = "/";
    }
  };

  const redirect = (page: string) => {
    window.location.href = page;
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/checker/perfil"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="logo-item"
                style={{ width: "50%" }}
              //onClick={() => redirect(`/checker/perfil`)}
            />
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => redirect(`/checker/perfil`)}
          >
            <HomeIcon />
          </IconButton>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs />
            <Grid item className="alertas">
              <Tooltip title="Alerts • No alerts">
                <IconButton color="success" id="alerts">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton
                color="success"
                id="profile"
                sx={{ p: 0.5 }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Avatar src={"https://i.pravatar.cc/300"} alt="My Avatar" />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <AccountCircleIcon></AccountCircleIcon>Perfil
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon></ExitToAppIcon>Logout
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
