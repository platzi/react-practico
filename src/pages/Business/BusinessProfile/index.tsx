// ** React Imports
import { SyntheticEvent, useState } from "react";

// ** MUI Imports
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";
// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
// ** Demo Tabs Imports
import TabAccount from "./account-settings/TabAccount";
import ConstructionSite from "../ConstructionSite";
import Jobs from "../Jobs";
import Resident from "../Resident";
// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const BusinessProfile = () => {
  // ** State
  const classes = useStyles();
  const [value, setValue] = useState<string>("Perfil");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card className={classes.root}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
          value="Perfil"
            icon={<AccountOutline />}
            iconPosition="start"
            label={<TabName>Perfil</TabName>}
          />
          <Tab
          value="Puestos"
            icon={<EngineeringIcon />}
            iconPosition="start"
            label={<TabName>Puestos</TabName>}
          />
          <Tab
          value={"Residentes"}
            icon={<EngineeringIcon />}
            iconPosition="start"
            label={<TabName>Residentes</TabName>}
          />
          <Tab
          value={"Obras"}
            icon={<ApartmentIcon />}
            iconPosition="start"
            label={<TabName>Obras</TabName>}
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="Perfil">
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="Puestos">
          <Jobs />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="Residentes">
          <Resident />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="Obras">
          <ConstructionSite />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default BusinessProfile;
