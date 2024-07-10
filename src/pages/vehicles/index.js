import * as React from 'react';
import { createContext, useState } from "react";
import Grid from '@mui/system/Unstable_Grid/Grid';
import Button from '@mui/material/Button';
import VehiclesList from '../../views/vehicles/VehiclesList';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RegisterVehicleModal from 'src/layouts/components/RegisterVehicleModal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export const ProfileDriverContext = createContext({});
export const CategoryContext = createContext({});

const Vehicles = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [role, setRole] = useState('');
    const [plan, setPlan] = useState('');
    const [status, setStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenModal = (vehicle) => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, display: 'flex', flexDirection: 'column', p: 3 }}>
                <Grid container spacing={3}>
                    <Grid container item xs={12}>
                        {/* <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                Filtros
                            </Typography>
                        </Grid> */}
                        {/* <Grid item xs={12}>
                            <Stack direction="row" justifyContent={"space-around"} alignItems={"center"} spacing={2}>
                                <Select value={role} onChange={(e) => setRole(e.target.value)} displayEmpty fullWidth size='small'>
                                    <MenuItem value="">Select Role</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="User">User</MenuItem>
                                    <MenuItem value="Editor">Editor</MenuItem>
                                </Select>
                                <Select value={plan} onChange={(e) => setPlan(e.target.value)} displayEmpty fullWidth size='small'>
                                    <MenuItem value="">Select Plan</MenuItem>
                                    <MenuItem value="Free">Free</MenuItem>
                                    <MenuItem value="Premium">Premium</MenuItem>
                                    <MenuItem value="Enterprise">Enterprise</MenuItem>
                                </Select>
                                <Select value={status} onChange={(e) => setStatus(e.target.value)} displayEmpty fullWidth size='small'>
                                    <MenuItem value="">Select Status</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </Stack>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} spacing={2}>
                                <TextField
                                    size='small'
                                    placeholder="Buscar vehículo"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <SearchIcon fontSize='small' />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button size='small' variant="contained" startIcon={<AddIcon />} sx={{ textTransform: 'none' }} onClick={() => handleOpenModal()}>
                                    Añadir
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <VehiclesList role={role} plan={plan} status={status} searchTerm={searchTerm} />
                        </Grid>

                    </Grid>

                </Grid>
                <RegisterVehicleModal
                    open={modalOpen}
                    handleClose={handleCloseModal}
                />
            </Box>
        </>
    );
}

export default Vehicles;
