import * as React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import AddIcon from '@mui/icons-material/Add';
import "@styles/Navigator.scss";
import logo from "@logos/green.png";
import CreateContractor from "@components/modal/CreateContractor";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Navigator(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const { ...other } = props;
  const classes = useStyles();
  const redirect = (page: string) => {
    history.push(page);
  };
  return (
    <Drawer variant="permanent" {...other} className="navigation">
      <List>
        <img src={logo} alt="logo" className="logo-item" onClick={() => redirect(`/dashboard`)}/>
      </List>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Contratistas
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button className="list-item item-selected">
          <ListItemIcon>
            <PersonIcon className="label"/>
          </ListItemIcon>
          <ListItemText primary="Tomas Naranjo" className="label"/>
        </ListItem>
        <ListItem button className="list-item">
          <ListItemIcon>
            <AddIcon className="label"/>
          </ListItemIcon>
          <ListItemText primary="Agregar contratista" className="label" onClick={() => {handleClickOpen();}}/>
          <CreateContractor close={handleClose} open={open} setOpen={setOpen}/>
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
        <ListItem button className="list-item">
          <ListItemIcon>
            <BusinessIcon className="label"/>
          </ListItemIcon>
          <ListItemText primary="Grupo Vidanta" className="label"/>
        </ListItem>
        <ListItem button className="list-item">
          <ListItemIcon>
            <AddIcon className="label"/>
          </ListItemIcon>
          <ListItemText primary="Agregar empresa" className="label"/>
        </ListItem>
      </List>
    </Drawer>
  );
}
