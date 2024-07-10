import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { vehiclesConsumContext } from './TabRegisterDispatch';
import { SnackbarContext } from 'src/layouts/UserLayout';

const AddVehicleForm = ({ selectedVehicle, onClose }) => {
    const { vehiclesListConsum, setVehiclesListConsum } = useContext(vehiclesConsumContext);
    console.log(vehiclesListConsum)
    const { snackbarState, setSnackbarState } = useContext(SnackbarContext)
    const [horometraje, setHorometraje] = useState('');
    const [kilometraje, setKilometraje] = useState('');
    const [galones, setGalones] = useState('');
    const [operador, setOperador] = useState('');



    const handleSubmit = () => {
        const newVehicle = {
            ...selectedVehicle,
            horometraje,
            kilometraje,
            galones,
            operador
        };
        fetch('http://localhost:3001/api/consums/processConsum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                placa: newVehicle.placa,
                horometraje: parseFloat(newVehicle.horometraje),
                kilometraje: parseFloat(newVehicle.kilometraje),
                galones: parseFloat(newVehicle.galones),
                operador: newVehicle.operador
            }),
        }).then(res => {
            return res.json();
        }).then(response => {
            if (response.error) {
                setSnackbarState({
                    open: true,
                    message: response.error === 'Problema en los datos retornados' ? response.data.mensaje : 'Error al procesar',
                    status: 'error'
                });
                console.error('Error response:', response);
            } else {
                setVehiclesListConsum([...vehiclesListConsum, response]);
                setSnackbarState({
                    open: true,
                    message: 'Procesado con éxito',
                    status: 'success'
                });
                onClose();
            }
        }).catch(error => {
            console.error('Fetch error:', error);
            setSnackbarState({
                open: true,
                message: 'Error al procesar',
                status: 'error'
            });
        });
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                {selectedVehicle.placa}
            </Typography>
            <TextField
                label="Horometraje"
                type="number"
                fullWidth
                margin="normal"
                value={horometraje}
                onChange={(e) => setHorometraje(e.target.value)}
            />
            <TextField
                label="Kilometraje"
                type="number"
                fullWidth
                margin="normal"
                value={kilometraje}
                onChange={(e) => setKilometraje(e.target.value)}
            />
            <TextField
                label="Galones"
                type="number"
                fullWidth
                margin="normal"
                value={galones}
                onChange={(e) => setGalones(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Añadir
            </Button>
        </>
    );
};

export default AddVehicleForm;
