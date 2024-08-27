import * as React from 'react';
import { createContext, useState } from "react";
import Grid from '@mui/system/Unstable_Grid/Grid';
import Button from '@mui/material/Button';
import DriversList from '../../views/drivers/DriversList';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

export const ProfileDriverContext = createContext({});

export const CategoryContext = createContext({});

const Drivers = () => {

    const [selectedProfile, setSelectedProfile] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(1);

    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={12} >
                    <Stack direction="row" justifyContent={"flex-end"}>
                        <Button size='small' variant="contained" startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>
                            Añadir conductor
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <DriversList />
                </Grid>
            </Grid>
        </>
    );
}

export default Drivers;