import React from "react";
import { useContext, useEffect } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { ProfileDriverContext } from "../../pages/vehicles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles'

import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import RoomIcon from '@mui/icons-material/Room';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';



const CategoryDriver = () => {


    const { selectedProfile, setSelectedProfile } = useContext(ProfileDriverContext);

    const theme = useTheme()

    const rows = [
        {
            id: 1,
            name: 'Juan Pérez',
        },
        {
            id: 2,
            name: 'María García',
        },
        {
            id: 3,
            name: 'Pedro Sánchez',
        },
    ];


    const driverOfCategory = rows.find((row) => row.id === selectedProfile);



    return (
        <>

            {driverOfCategory ? (

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: 2 }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar variant="rounded" sx={{bgcolor: theme.palette.primary.main}}>
                                <LocalShippingIcon sx={{color: theme.palette.common.white}}  />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Cantidad de Vehículos" secondary={12} />
                    </ListItem>
                </List>

            ) : (
                <Typography>Seleccione un perfil</Typography>
            )}

        </>

    )
}

export default CategoryDriver;