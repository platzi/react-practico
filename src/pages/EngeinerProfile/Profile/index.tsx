// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
// ** Demo Tabs Imports
import TabAccount from './account-settings/TabAccount'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100 
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const EngeinerProfile = () => {
  // ** State
  const classes = useStyles();
  const [value, setValue] = useState<string>('Perfil')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card className={classes.root}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='Perfil'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <AccountOutline />
                <TabName>Perfil</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='Perfil'>
          <TabAccount />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default EngeinerProfile
