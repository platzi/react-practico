import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssessmentIcon from '@mui/icons-material/Assessment';
import "@styles/TabPanel.scss";
export default function IconTabs() {
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  const redirect = (page) => {
    history.push(page);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
      id="iconTabsExample"
      indicatorColor="secondary"
    >
      <Tab icon={<ContactPhoneIcon />} iconPosition="start" label="Datos" onClick={() => redirect('/dashboard/contratista/perfil')}/>
      <Tab icon={<EngineeringIcon />} iconPosition="start" label="Trabajadores" onClick={() => redirect('/dashboard/contratista/trabajadores')}/>
      <Tab icon={<AssessmentIcon />} iconPosition="start" label="Resumen De Pagos" onClick={() => redirect('/dashboard/contratista/resumen-de-pagos/')}/>
    </Tabs>
  );
}
