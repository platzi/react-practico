import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
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
      <Tab icon={<ContactPhoneIcon />} iconPosition="start" label="Datos" onClick={() => redirect('/dashboard/empresa/perfil')}/>
      <Tab icon={<EngineeringIcon />} iconPosition="start" label="Puestos" onClick={() => redirect('/dashboard/empresa/puestos')}/>
      <Tab icon={<EngineeringIcon />} iconPosition="start" label="Residentes" onClick={() => redirect('/dashboard/empresa/residentes')}/>
      <Tab icon={<ApartmentIcon />} iconPosition="start" label="Obras" onClick={() => redirect('/dashboard/empresa/construction-site')}/>
    </Tabs>
  );
}
