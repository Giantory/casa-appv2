import React, { useState, useEffect, useContext } from 'react';
import { TextField, Card, CardContent, Typography, Grid } from '@mui/material';
import { vehiclesConsumContext } from './TabRegisterDispatch';

import InputAdornment from '@mui/material/InputAdornment'
import Magnify from 'mdi-material-ui/Magnify'

const VehiclesCards = ({ onSelectVehicle }) => {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/vehicles', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch(err => console.error(err));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <TextField
                size='small'
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                onChange={handleSearch}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Magnify fontSize='small' />
                        </InputAdornment>
                    )
                }}
            />
            <Grid container spacing={2}>
                {filteredVehicles.map(vehicle => (
                    <Grid item xs={12} key={vehicle.placa}>
                        <Card onClick={() => onSelectVehicle(vehicle)} style={{ cursor: 'pointer' }}>
                            <CardContent>
                                <Typography variant="h6">{vehicle.descripcion}</Typography>
                                <Typography variant="body2">Placa: {vehicle.placa}</Typography>
                                <Typography variant="body2">Modelo: {vehicle.modelo}</Typography>
                                <Typography variant="body2">Marca: {vehicle.marca}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default VehiclesCards;
