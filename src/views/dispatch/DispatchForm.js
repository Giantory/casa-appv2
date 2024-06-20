import React, { useEffect, useState, useContext } from 'react';
import { Button, TextField, DialogActions } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { SnackbarContext } from 'src/layouts/UserLayout';

const DispatchForm = ({ onClose, consumos, onClearConsumptions }) => {
    const current = new Date();
    const [driversList, setDriversList] = useState([]);
    const [dispatch, setDispatch] = useState({
        fechaDespacho: dayjs(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`).format('YYYY-MM-DD'),
        idOperador: 0
    });
    const { setSnackbarState } = useContext(SnackbarContext);

    useEffect(() => {
        fetch('http://localhost:3001/api/drivers', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(response => {
                setDriversList(response);
            });
    }, []);

    const handleSave = () => {
        fetch('http://localhost:3001/api/dispatches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consumos, dispatch }),
        })
            .then(res => res.json())
            .then(response => {
                if (response.error) {
                    setSnackbarState({
                        open: true,
                        message: 'Error al procesar',
                        status: 'error'
                    });
                } else {
                    setSnackbarState({
                        open: true,
                        message: 'Creado con éxito',
                        status: 'success'
                    });
                    onClearConsumptions();
                    onClose();
                }
            });
    };

    return (
        <form>
            {driversList.length > 0 && (
                <FormControl fullWidth>
                    <Select
                        value={dispatch.idOperador}
                        onChange={(e) => {
                            setDispatch({
                                ...dispatch,
                                idOperador: e.target.value
                            });
                        }}
                    >
                        <MenuItem value={0}>Selecciona operador</MenuItem>
                        {driversList.map((driver) => (
                            <MenuItem key={driver.idOperador} value={driver.idOperador}>
                                {driver.nombres + " " + driver.apellidos}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            <TextField
                sx={{ marginTop: 4 }}
                margin="dense"
                id="date"
                label="Fecha"
                type="date"
                fullWidth
                defaultValue={dispatch.fechaDespacho}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => {
                    setDispatch({
                        ...dispatch,
                        fechaDespacho: e.target.value
                    });
                }}
            />
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </form>
    );
};

export default DispatchForm;
