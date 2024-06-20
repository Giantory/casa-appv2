// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'


// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import ControlPointIconOutline from '@mui/icons-material/ControlPointOutlined';
import FormatListBulletedIconOutline from '@mui/icons-material/FormatListBulletedOutlined';

// ** Demo Tabs Imports
import TabDispatchesList from 'src/views/dispatch/TabDispatchesList'
import TabRegisterDispatch from 'src/views/dispatch/TabRegisterDispatch'
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('list')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }



  return (

    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        aria-label='account-settings tabs'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab
          value='list'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormatListBulletedIconOutline />
              <TabName>Lista de Despachos</TabName>
            </Box>
          }
        />
        <Tab
          value='register'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ControlPointIconOutline />
              <TabName>Registrar</TabName>
            </Box>
          }
        />
      </TabList>
      <TabPanel sx={{ paddingTop: 4 }} value='list'>
        <TabDispatchesList />
      </TabPanel>
      <TabPanel sx={{ paddingTop: 4 }} value='register'>
        <TabRegisterDispatch />
      </TabPanel>
    </TabContext>
  )
}

export default AccountSettings
