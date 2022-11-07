import React, { useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from "@mui/icons-material/Business";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddIcon from "@mui/icons-material/Add";
import logo from "@logos/green.png";
import { ToastContainer, toast } from "react-toastify";
import CreateContractor from "@components/modal/CreateContractor";
import CreateBusiness from "@components/modal/CreateBusiness";
import { useHistory, useParams } from "react-router-dom";
import { useBusiness, IBusinessItem } from "@redux/Business";
import { useAuth } from "@redux/Auth";
import { useContractor, IContractorItem } from "@redux/Contractor";
import { useAviato } from "@redux/Aviato";

const settings = ["Profile", "Logout"];
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://andejecruher.com">
        Andejecruher
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(6),
      },
    }),
  },
}));

const mdTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00ab55",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#ACD9B2",
    },
    error: {
      main: "#f44336",
    },
    buttonPrimary: {
      main: "#00ab55",
      contrastText: "#FFF",
    },
    buttonSecondary: {
      main: "#f44336",
      contrastText: "#FFF",
    },
    inputPrimary: {
      main: "#000000",
      contrastText: "#000000",
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiTooltip: {
      arrow: true,
    },
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
  },
  shape: {
    borderRadius: 4,
  },
  direction: "rtl",
  spacing: 8,
});

function DashboardContent({ children }: any) {
  const { user, LogoutRedux } = useAuth();
  const {
    businessSelected,
    contractorSelected,
    setContractorRedux,
    setBusinessRedux,
  } = useAviato();
  const { business, ListBusinessRedux } = useBusiness();
  const { contractor, ListContractorRedux } = useContractor();
  const history = useHistory();
  const [openContractor, setOpenContractor] = React.useState(false);
  const [openBusiness, setOpenBusiness] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedBusinessIndex, setSelectedBusinessIndex] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      handleLogout();
    }
  };
  const handleLogout = async () => {
    await LogoutRedux().then(() => {
      window.location.href = "/iniciar-sesión";
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenContractor = () => {
    setOpenContractor(true);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setBusinessRedux({});
    setSelectedBusinessIndex(0);
    setContractorRedux(contractor.find((item: any) => item.id === index));
    setSelectedIndex(index);
    history.push("/dashboard/contratista");
  };

  const handleListItemBusinessClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setContractorRedux({});
    setSelectedIndex(0);
    setBusinessRedux(business.find((item: any) => item.id === index));
    setSelectedBusinessIndex(index);
    history.push("/dashboard/empresa");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseContractor = () => {
    setOpenContractor(false);
  };

  const handleClickOpenBusiness = () => {
    setOpenBusiness(true);
  };

  const handleCloseBusiness = () => {
    setOpenBusiness(false);
  };

  const redirect = (page: string) => {
    history.push(page);
  };

  const GetBusinessRedux = async () => {
    await ListContractorRedux(user.id);
    await ListBusinessRedux(user.id);
    if (user.role === "admin") {
      if (contractor.length > 0) {
        if (contractor[0]?.id !== undefined || null) {
          setSelectedIndex(contractor[0].id);
          const list = document.getElementsByClassName(
            "item-contractor"
          )[0] as HTMLElement;
          list.click();
        }
      } else {
        history.push("/dashboard/perfil");
      }
    }
  };

  useEffect(() => {
    if (user) {
      GetBusinessRedux();
    }
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Avatar sx={{ width: 100, height: 56 }} alt="Aviato" src={logo} />
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {contractorSelected?.name ||
                businessSelected?.name ||
                user?.name ||
                "Aviato"}
            </Typography>
            <IconButton color="inherit" style={{ marginRight: "10px" }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListSubheader component="div">
              <EngineeringIcon style={{ marginRight: "10px" }} /> Contratistas
            </ListSubheader>
            {contractor.map((item: IContractorItem) => (
              <ListItemButton
                key={item.id}
                style={
                  selectedIndex === item.id
                    ? {
                        backgroundColor: "#20c997",
                        color: "#FFF",
                      }
                    : {}
                }
                onClick={(event) => handleListItemClick(event, item.id)}
                className="item-contractor"
              >
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
            <ListItemButton
              onClick={() => {
                setSelectedBusinessIndex(0);
                handleClickOpenContractor();
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div">
              <BusinessIcon style={{ marginRight: "10px" }} /> Empresas
            </ListSubheader>
            {business.map((item: IBusinessItem) => (
              <ListItemButton
                key={item.id}
                style={
                  selectedBusinessIndex === item.id
                    ? { backgroundColor: "#20c997", color: "#FFF" }
                    : {}
                }
                onClick={(event) => handleListItemBusinessClick(event, item.id)}
              >
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
            <ListItemButton
              onClick={() => {
                setSelectedIndex(0);
                handleClickOpenBusiness();
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Contenido */}
              <Grid item xs={12}>
                {children}
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      <CreateBusiness
        close={handleCloseBusiness}
        open={openBusiness}
        setOpen={setOpenBusiness}
      />
      <CreateContractor
        close={handleCloseContractor}
        open={openContractor}
        setOpen={setOpenContractor}
      />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default DashboardContent;
