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
import AssessmentIcon from '@mui/icons-material/Assessment';
// ** Demo Tabs Imports
import TabAccount from "./account-settings/TabAccount";
import Employes from "../Employes";
import ResumePay from "../ResumePay";

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

const ContractorProfile = () => {
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
            value="Trabajadores"
            icon={<EngineeringIcon />}
            iconPosition="start"
            label={<TabName>Trabajadores</TabName>}
          />
          <Tab
            value="Resumen-de-pagos"
            icon={<AssessmentIcon />}
            iconPosition="start"
            label={<TabName>Resumen de pagos</TabName>}
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="Perfil">
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="Trabajadores">
          <Employes />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="Resumen-de-pagos">
          <ResumePay />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default ContractorProfile;
