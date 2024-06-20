import React, { useState, useContext, useEffect } from 'react'

import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Stack } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//context
import { vehiclesConsumContext } from './TabRegisterDispatch'
import { SnackbarContext } from '../layout/UserLayout';
import dayjs from 'dayjs'

const DistributionFormV2 = () => {

    const current = new Date();
    const [totalConsum, setTotalConsum] = useState(0);
    const { vehiclesListConsum, setVehiclesListConsum } = useContext(vehiclesConsumContext);
    const { snackbarState, setSnackbarState } = useContext(SnackbarContext)

    const [vehicleConsum, setVehicleConsum] = useState({ code: '', hourmeter: 0, kilometer: 0, gallons: 0 });
    const [dispatchesList, setDispatchesList] = useState([]);
    const [dispatchSelected, setDispatchSelected] = useState(0);


    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const theme = useTheme();

    useEffect(() => {
        fetch('http://localhost:3001/api/dispatches', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                setDispatchesList(response)

            })
    }, [])


    const addVehicle = (e) => {
        e.preventDefault();
        console.log(vehicleConsum)
        fetch('http://localhost:3001/api/consums/processConsum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                placa: vehicleConsum.code,
                horometraje: parseFloat(vehicleConsum.hourmeter),
                kilometraje: parseFloat(vehicleConsum.kilometer),
                galones: parseFloat(vehicleConsum.gallons)
            }),
        }).then(res => {
            return res.json();
        }).then(response => {
            if (!response[0]) {
                setSnackbarState({
                    open: true,
                    message: 'Error al procesar',
                    status: 'error'
                })
            } else {
                setVehiclesListConsum([...vehiclesListConsum, response[0]]);
                setSnackbarState({
                    open: true,
                    message: 'Procesado con éxito',
                    status: 'success'
                })
                cleanFields()
            }
        })

        const cleanFields = () => {
            setVehicleConsum({ code: '', hourmeter: 0, kilometer: 0, gallons: 0 });
        }
        const newTotalConsumption = vehiclesListConsum.reduce((total, vehicle) => {
            return total + parseFloat(vehicle.consum);
        }, 0);

        setTotalConsum(newTotalConsumption);

        setVehicleConsum((prevVehicleConsum) => ({
            ...prevVehicleConsum,
            id: prevVehicleConsum.id + 1
        }));

    }

    const handleSelectDispatch = (event) => {
        setDispatchSelected(event.target.value);
    }

    return (
        <Box sx={{ height: '100%' }} >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant={'h6'} component="div" sx={{ color: theme.palette.primary.light, fontWeight: 'bold', m: 1 }}>
                        Registrar consumo
                    </Typography>
                </Grid>
                {/* <Grid item xs={12} p={2} sx={{ display: "flex", justifyContent: "center" }}>
                    {dispatchesList.length > 0 && (<FormControl sx={{ width: "100%", }}>
                        <InputLabel>Día despacho</InputLabel>
                        <Select
                            size='small'
                            value={dispatchSelected}
                            onChange={handleSelectDispatch}
                            label="Día Despacho"
                        >
                            <MenuItem value={0}>
                                Selecciona
                            </MenuItem>
                            {dispatchesList.map((dispatch) => {
                                return <MenuItem key={dispatch.idDespacho} value={dispatch.idDespacho} >
                                    {dayjs(dispatch.fechaDespacho).format('DD-MM-YYYY')}
                                </MenuItem>
                            })}
                        </Select>
                    </FormControl>)}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} component="div" sx={{ fontWeight: 'bold', m: 1 }}>
                        {date}
                    </Typography>
                </Grid> */}
                <Grid item xs={12}>
                    <Stack direction="column" spacing={4} p={1}>
                        <TextField
                            size='small'
                            type='text'
                            label='Placa/Serie'
                            placeholder='ANM-797'
                            value={vehicleConsum.code}
                            onChange={(e) => {
                                setVehicleConsum({
                                    ...vehicleConsum,
                                    code: e.target.value
                                })
                            }}
                        />
                        <TextField
                            size='small'
                            type='number'
                            label='Galones'
                            value={vehicleConsum.gallons}
                            onChange={(e) => {
                                setVehicleConsum({
                                    ...vehicleConsum,
                                    gallons: e.target.value
                                })
                            }}
                        />
                        <TextField
                            size='small'
                            type='number'
                            label='Kilometraje'
                            placeholder='276628'
                            value={vehicleConsum.kilometer}
                            onChange={(e) => {
                                setVehicleConsum({
                                    ...vehicleConsum,
                                    kilometer: e.target.value
                                })
                            }}
                        />
                        <TextField
                            size='small'
                            type='number'
                            label='Horómetro'
                            placeholder='276628'
                            value={vehicleConsum.hourmeter}
                            onChange={(e) => {
                                setVehicleConsum({
                                    ...vehicleConsum,
                                    hourmeter: e.target.value
                                })
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", marginTop: 4 }} >
                    <Stack direction="row" spacing={4} p={1}>
                        <Button size='small' variant="contained" onClick={addVehicle}>
                            Añadir
                        </Button>
                        <Button size='small' variant="outlined">
                            Cancelar
                        </Button>
                    </Stack>

                </Grid>
            </Grid>
        </Box >

    )
}

export default DistributionFormV2