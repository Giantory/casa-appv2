import * as React from 'react';
import { createContext, useState } from "react";

import EnhancedTable from '../../views/dispatch/DistributionTable';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Button from '@mui/material/Button';
import DistributionForm from '../../views/dispatch/DistributionForm';
import DaysControl from '../../views/dispatch/DaysControl';
import DaysControlSummary from '../../views/dispatch/DaysControlSummary';
import QuickActionsList from '../../views/dispatch/QuickActionsList';
import Calendar from '../../views/dispatch/Calendar';
import ProfilesTable from '../../views/vehicles/ProfilesTable';
import CategoryDriver from '../../views/vehicles/CategoryDriver';
import CategoriesTable from '../../views/vehicles/CategoriesTable';
import VehiclesCounter from '../../views/vehicles/VehiclesCounter';
import VehiclesList from '../../views/vehicles/VehiclesList';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CategoryCard from '../../views/vehicles/CategoryCard';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

export const ProfileDriverContext = createContext({});
export const CategoryContext = createContext({});

const Vehicles = () => {

    const [selectedProfile, setSelectedProfile] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(1);

    return (
        <>
            <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
                <ProfileDriverContext.Provider value={{ selectedProfile, setSelectedProfile }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} >
                            <Stack direction="row" justifyContent={"flex-end"}>
                                <Button size='small' variant="contained" startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>
                                    Añadir vehículo
                                </Button>
                            </Stack>
                        </Grid>
                        {/* <Grid container item xs={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                            <Grid item xs={12} >
                                <Stack direction="row" spacing={1}>
                                    <CategoryDriver />
                                    <VehiclesCounter />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <SearchIcon fontSize='small' />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <VehiclesList />
                            </Grid>
                        </Grid> */}
                        <Grid item xs={12}>
                            <VehiclesList />
                        </Grid>
                        {/* <Grid item xs={6}>
                            <RecentConsumChart />
                        </Grid> */}
                    </Grid>
                </ProfileDriverContext.Provider>
            </CategoryContext.Provider>
        </>
    );
}

export default Vehicles;