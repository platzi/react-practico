import React, { useEffect } from "react";
import clsx from 'clsx';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import AddIcon from "@mui/icons-material/Add";
import CreateContractor from "@components/modal/CreateContractor";
import CreateBusiness from "@components/modal/CreateBusiness";
import { useBusiness, IBusinessItem } from "@redux/Business";
import { useAuth } from "@redux/Auth";
import { useContractor, IContractorItem } from "@redux/Contractor";
import { useAviato } from "@redux/Aviato";
import logo from "@logos/green.png";
import "@styles/Navigator.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  activeItemContractor: {
    backgroundColor: "#E5E5E5",
    color: "#000000",
  },
}));

export default function Navigator(props: any) {
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedBusinessIndex, setSelectedBusinessIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openBusiness, setOpenBusiness] = React.useState(false);
  const { ...other } = props;
  const { user } = useAuth();
  const { setContractorRedux, setBusinessRedux } = useAviato();
  const { business, ListBusinessRedux } = useBusiness();
  const { contractor, ListContractorRedux } = useContractor();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedBusinessIndex(0);
    setContractorRedux(contractor.find((item: any) => item.id === index));
    setSelectedIndex(index);
    history.push("/dashboard/contratista/perfil");
  };

  const handleListItemBusinessClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(0);
    setBusinessRedux(business.find((item: any) => item.id === index));
    setSelectedBusinessIndex(index);
    history.push("/dashboard/empresa/perfil");
  };

  const handleClose = () => {
    setOpen(false);
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
    if(user.role === "admin"){
      if (contractor[0]?.id !== undefined || null) {
        setSelectedIndex(contractor[0].id);
        const list = document.getElementsByClassName("item-contractor")[0] as HTMLElement;
        list.click();
      }
    }
  };

  useEffect(() => {
    GetBusinessRedux();
  }, []);

  return (
    <Drawer variant={props.variant} {...other} className={clsx(classes.root,"navigation")}>
      <List>
        <img
          src={logo}
          alt="logo"
          className="logo-item"
        />
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Contratistas
          </ListSubheader>
        }
      >
        {contractor.map((item: IContractorItem) => (
          <ListItemButton
            className="list-item item-contractor"
            key={item.id}
            style={
              selectedIndex === item.id
                ? { backgroundColor: "#20c997", color: "#FFF", width : "100%"}
                : {}
            }
            onClick={(event) => handleListItemClick(event, item.id)}
          >
            <ListItemIcon>
              <PersonIcon
                style={selectedIndex === item.id ? { color: "#FFF" } : {}}
              />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}

        <ListItem button className="list-item">
          <ListItemIcon>
            <AddIcon
              className="label"
              onClick={() => {
                setSelectedBusinessIndex(0);
                handleClickOpen();
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Agregar contratista"
            className="label"
            onClick={() => {
              setSelectedBusinessIndex(0);
              handleClickOpen();
            }}
          />
          <CreateContractor close={handleClose} open={open} setOpen={setOpen} />
        </ListItem>
      </List>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Empresas
          </ListSubheader>
        }
        className={classes.root}
      >
        {business.map((item: IBusinessItem) => (
          <ListItemButton
            className="list-item"
            key={item.id}
            style={
              selectedBusinessIndex === item.id
                ? { backgroundColor: "#20c997", color: "#FFF" }
                : {}
            }
            onClick={(event) => handleListItemBusinessClick(event, item.id)}
          >
            <ListItemIcon>
              <BusinessIcon
                className="label"
                style={
                  selectedBusinessIndex === item.id ? { color: "#FFF" } : {}
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              style={selectedBusinessIndex === item.id ? { color: "#FFF" } : {}}
              className="label"
            />
          </ListItemButton>
        ))}
        <ListItem button className="list-item">
          <ListItemIcon>
            <AddIcon
              className="label"
              onClick={() => {
                setSelectedIndex(0);
                handleClickOpenBusiness();
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Agregar contratista"
            className="label"
            onClick={() => {
              setSelectedIndex(0);
              handleClickOpenBusiness();
            }}
          />
          <CreateBusiness
            close={handleCloseBusiness}
            open={openBusiness}
            setOpen={setOpenBusiness}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}
