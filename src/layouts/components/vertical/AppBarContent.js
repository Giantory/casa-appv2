import React, { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EngineeringIcon from '@mui/icons-material/Engineering';

// ** Icons Imports
import Menu1 from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import RegisterOperatorModal from '../RegisterDriverModal';
import RegisterVehicleModal from '../RegisterVehicleModal';
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
// import DistributionForm from '../../../views/home/DistributionForm';


const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const [openOperatorModal, setOpenOperatorModal] = useState(false);
  const [openVehicleModal, setOpenVehicleModal] = useState(false);

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const pages = ['Products', 'Pricing', 'Blog'];
  const options = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClick = () => {
    setOpenModal(true)
  };

  const handleOpenOperatorModal = () => {
    setOpenOperatorModal(true);
  };

  const handleCloseOperatorModal = () => {
    setOpenOperatorModal(false);
  };

  const handleOpenVehicleModal = () => {
    setOpenVehicleModal(true);
  };

  const handleCloseVehicleModal = () => {
    setOpenVehicleModal(false);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu1 />
          </IconButton>
        ) : null}
        {/* <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        /> */}
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Stack direction="row" spacing={2}>
              <Chip variant='outlined' label="Registrar despacho" deleteIcon={<LocalGasStationIcon />} color={'primary'} onDelete={handleClick} onClick={handleClick} />
              <Chip variant='outlined' label="Registrar vehículo" deleteIcon={<LocalShippingIcon />} color={'primary'} onDelete={handleOpenVehicleModal} onClick={handleOpenVehicleModal} />
              <Chip variant='outlined' label="Registrar opreador" deleteIcon={<EngineeringIcon />} color={'primary'} onDelete={handleOpenOperatorModal} onClick={handleOpenOperatorModal} />
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {options.map((index, option) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{option}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <RegisterOperatorModal open={openOperatorModal} handleClose={handleCloseOperatorModal} />
            <RegisterVehicleModal open={openVehicleModal} handleClose={handleCloseVehicleModal} />
          </Box>
        </Toolbar>
        {/* <DistributionForm showModal={{ openModal, setOpenModal }} /> */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>

        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* <NotificationDropdown /> */}
        {/* <UserDropdown /> */}
      </Box>
    </Box>
  )
}

export default AppBarContent
