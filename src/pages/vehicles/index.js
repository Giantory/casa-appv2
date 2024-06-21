import * as React from 'react';
import { createContext, useState } from "react";
import Grid from '@mui/system/Unstable_Grid/Grid';
import Button from '@mui/material/Button';
import VehiclesList from '../../views/vehicles/VehiclesList';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RegisterVehicleModal from 'src/layouts/components/RegisterVehicleModal';

export const ProfileDriverContext = createContext({});
export const CategoryContext = createContext({});

const Vehicles = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (vehicle) => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={12} >
                    <Stack direction="row" justifyContent={"flex-end"}>
                        <Button size='small' variant="contained" startIcon={<AddIcon />} sx={{ textTransform: 'none' }} onClick={() => handleOpenModal()}>
                            Añadir vehículo
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <VehiclesList />
                </Grid>
            </Grid>
            <RegisterVehicleModal
                open={modalOpen}
                handleClose={handleCloseModal}
            />
        </>
    );
}

export default Vehicles;