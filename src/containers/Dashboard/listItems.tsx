import React, {useEffect} from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BusinessIcon from '@mui/icons-material/Business';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useBusiness, IBusinessItem } from "@redux/Business";
import { useAuth } from "@redux/Auth";

const { user } = useAuth();
const { business, ListBusinessRedux } = useBusiness();
useEffect(() => {
  ListBusinessRedux(user.id);
  console.log(business);
}, [business]);

export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" >
      <EngineeringIcon style={{marginRight: "10px"}}/> Contratistas
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ArrowRightIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div">
    <BusinessIcon  style={{marginRight: "10px"}} />  Empresas
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ArrowRightIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
  </React.Fragment>
);