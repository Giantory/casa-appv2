import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import ContactIcon from '@mui/icons-material/ContactPage';
import AboutIcon from '@mui/icons-material/Info';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 370;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MenuButton = styled(Button)({
  marginLeft: 'auto',
});

const DriverCategoryInfo = (props) => {

  const { isOpenCategoryInfo, setIsOpenCategoryInfo } = props.showSideBar;


  const theme = useTheme();

  const toggleDrawer = () => {
    setIsOpenCategoryInfo(!isOpenCategoryInfo);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={isOpenCategoryInfo}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <DrawerHeader>
          {/* <IconButton onClick={toggleDrawer} color="primary" aria-label="add to shopping cart">
            <CloseIcon />
          </IconButton> */}
        </DrawerHeader>
       
        <Grid container>
          <Grid item p={2} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              width={100}
              height={100}
              src='/images/worker.png'
            />
          </Grid>
          <Grid item p={2} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Stack direction={'column'}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Juan Pérez
              </Typography>
              <Chip label="XYZ-123" color='primary' />
            </Stack>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={6}>
              <Stack direction={'column'} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="subtitle2">
                  Consumo
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  140
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction={'column'} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="subtitle2">
                  Consumo
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  140
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h6" p={1.5} sx={{ fontWeight: 500 }}>
                Información del conductor
                <Divider />
              </Typography>
              <Typography variant="subtitle2" p={1.5}>
                Nombres: Juan Carlos
              </Typography>
              <Typography variant="subtitle2" p={1.5}>
                Apellidos: Pérez Flores
              </Typography>
              <Typography variant="subtitle2" p={1.5}>
                DNI: 78996654
              </Typography>
              <Typography variant="subtitle2" p={1.5}>
                Correo: juan@gmail.com
              </Typography>
              <Typography variant="subtitle2" p={1.5}>
                Celular: 963852741
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default DriverCategoryInfo;

