import { useEffect, useState, useContext, forwardRef } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles'

import Grid from '@mui/material/Grid'
import { Modal } from '@mui/material'
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'



import dayjs from 'dayjs';

//context

import { SnackbarContext } from '../layout/UserLayout';


const CustomInput = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const DistributionForm = (props) => {

    const current = new Date();
    const [date, setDate] = useState(null)

    const [driversList, setDriversList] = useState([]);
    const [driverSelected, setDriverSelected] = useState(0);
    const [dateDispatch, setDateDispatch] = useState(dayjs(`${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`));
    const [dispatch, setDispatch] = useState({ dateDispatch: dayjs(`${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`), idDriver: 0 });
    const adapter = new AdapterDayjs();

    const { snackbarState, setSnackbarState } = useContext(SnackbarContext)

    // useEffect(() => {

    //     fetch('http://localhost:3001/api/drivers', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },

    //     })
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(response => {
    //             setDriversList(response)

    //         })
    // }, [])
    const { openModal, setOpenModal } = props.showModal;

    const handleClose = () => {
        setOpenModal(false);
    }
    const handleSelectDriver = (event) => {
        setDriverSelected(event.target.value);
    }
    const theme = useTheme()



    const addDispatch = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/api/dispatches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idOperador: dispatch.idDriver, fechaDespacho: dayjs(dispatch.dateDispatch).format('YYYY-MM-DD') })
        }).then(res => {
            if (res.status === 200) {
                setSnackbarState({
                    open: true,
                    message: 'Despacho creado exitosamente',
                    status: 'success'
                })
                handleClose()
            } else {
                setSnackbarState({
                    open: true,
                    message: 'Error al crear despacho',
                    status: 'error'
                })
                handleClose()
            }

        })

    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={openModal}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle1'} component="div" sx={{ color: theme.palette.primary, fontWeight: 'bold', m: 1 }}>
                            Registrar despacho
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateCalendar']}>
                                <DateCalendar
                                    value={dispatch.dateDispatch}
                                    onChange={(date) => setDispatch({ ...dispatch, dateDispatch: dayjs(date) })} />

                            </DemoContainer>
                        </LocalizationProvider> */}
                        <DatePickerWrapper>
                            <DatePicker
                                selected={date}
                                showYearDropdown
                                showMonthDropdown
                                id='disppatch-info'
                                placeholderText='MM-DD-YYYY'
                                customInput={<CustomInput />}
                                onChange={(date) => setDispatch({ ...dispatch, dateDispatch: dayjs(date) })}
                            />
                        </DatePickerWrapper>
                    </Grid>
                    <Grid item xs={6}>
                        {driversList.length > 0 && (<FormControl sx={{ width: "100%", }}>
                            <InputLabel>Operador</InputLabel>
                            <Select
                                value={dispatch.idDriver}
                                label="Operador"
                                onChange={(e) => {
                                    setDispatch({
                                        ...dispatch,
                                        idDriver: e.target.value
                                    })
                                }}
                            >
                                <MenuItem value={0}>
                                    Selecciona
                                </MenuItem>
                                {driversList.map((driver) => {
                                    return <MenuItem key={driver.idOperador} value={driver.idOperador} >
                                        {driver.nombres + " " + driver.apellidos}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>)}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="contained" onClick={addDispatch}>
                            Aceptar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal >
    )

}

export default DistributionForm;