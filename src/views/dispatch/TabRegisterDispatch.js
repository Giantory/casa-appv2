import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Button from '@mui/material/Button';
import DistributionTable from './DistributionTable';
import DistributionFormV2 from './DistributionFormV2';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/';
import Badge from '@mui/material/Badge';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import DispatchForm from './DispatchForm';
import VehiclesCards from './VehiclesCards';
import AddVehicleForm from './AddVehicleForm';

import { SnackbarContext } from '../../layouts/UserLayout';
export const vehiclesConsumContext = createContext({});

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}));
const TabRegisterDispatch = () => {
    const [openCleanDialog, setOpenCleanDialog] = useState(false);
    const [nameExcelFile, setNameExcelFile] = useState(null);
    const [excelFile, setExcelFile] = useState(null);
    const [vehiclesListConsum, setVehiclesListConsum] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openDispatchForm, setOpenDispatchForm] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const { setSnackbarState } = useContext(SnackbarContext);
    const theme = useTheme();

    const fileInputRef = useRef(null);

    useEffect(() => {
        const savedVehiclesList = JSON.parse(localStorage.getItem('vehiclesListConsum'));
        if (savedVehiclesList) {
            setVehiclesListConsum(savedVehiclesList);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('vehiclesListConsum', JSON.stringify(vehiclesListConsum));
    }, [vehiclesListConsum]);

    const updateVehiclesListConsum = (newList) => {
        setVehiclesListConsum(newList);
        localStorage.setItem('vehiclesListConsum', JSON.stringify(newList));
    };

    const handleClickOpenCleanDialog = () => {
        setOpenCleanDialog(true);
    };

    const handleCloseCleanDialog = () => {
        setOpenCleanDialog(false);
    };

    const cleanTable = () => {
        updateVehiclesListConsum([]);
        setOpenCleanDialog(false);
        setExcelFile(null);
        setNameExcelFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const processConsums = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', excelFile);
        fetch('http://localhost:3001/api/consums/processManyConsums', {
            method: 'POST',
            body: formData
        }).then(res => {
            return res.json();
        }).then(response => {
            if (!response[0]) {
                setSnackbarState({
                    open: true,
                    message: 'Error al procesar',
                    status: 'error'
                });
            } else {
                let newVehiclesList = [];
                response.forEach((vehicleConsum) => {
                    newVehiclesList.push(vehicleConsum);
                });
                updateVehiclesListConsum([...vehiclesListConsum, ...newVehiclesList]);

                setSnackbarState({
                    open: true,
                    message: 'Procesado con éxito',
                    status: 'success'
                });
                setExcelFile(null);
                setNameExcelFile(null);
            }
        });
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
        setSelectedVehicle(null);
    };

    const handleSave = () => {
        if (vehiclesListConsum.length === 0) {
            setSnackbarState({
                open: true,
                message: 'Agregue un consumo antes de guardar',
                status: 'error'
            });
        } else {
            const hasNewVehicle = vehiclesListConsum.some(vehicle => vehicle.estadoCodigo === 6);
            if (hasNewVehicle) {
                setSnackbarState({
                    open: true,
                    message: 'Registre el vehículo nuevo antes de guardar',
                    status: 'error'
                });
            } else {
                setOpenDispatchForm(true);
            }
        }
    };
    
    const handleCleanExcelFile = () => {
        setExcelFile(null);
        setNameExcelFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleVehicleSelect = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    const clearSavedConsumptions = () => {
        const validConsumptions = vehiclesListConsum.filter(consumo => consumo.estadoDescripcion === 'Inválido');
        updateVehiclesListConsum(validConsumptions);
    };

    return (
        <>
            <vehiclesConsumContext.Provider value={{ vehiclesListConsum, setVehiclesListConsum: updateVehiclesListConsum }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Stack direction="row" spacing={2} sx={{ display: "flex", width: '100%', alignItems: 'center' }}>
                            <ButtonStyled component='label' variant='contained' startIcon={<UploadIcon />}>
                                Subir
                                <input
                                    hidden
                                    type='file'
                                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                    id='account-settings-upload-image'
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                        const archivo = e.target.files[0];
                                        setNameExcelFile(archivo ? archivo.name : null);
                                        setExcelFile(archivo);
                                    }}
                                />
                            </ButtonStyled>
                            <InsertDriveFileIcon />
                            <Typography variant={'subtitle1'} component="div" sx={{ fontWeight: 'light', m: 1 }}>
                                {nameExcelFile ? nameExcelFile : 'No file'}
                            </Typography>
                            {nameExcelFile && (
                                <Button size='small' variant="contained" color='error' startIcon={<DeleteIcon />} onClick={handleCleanExcelFile}>
                                    Limpiar archivo
                                </Button>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={6} sx={{ display: "flex" }}>
                        <Stack direction="row" spacing={4} sx={{ display: "flex", width: '100%', justifyContent: "flex-end" }}>
                            <Button disabled={!nameExcelFile} size='small' variant="contained" color='success'
                                startIcon={<PublishedWithChangesIcon />} onClick={processConsums}>
                                Procesar
                            </Button>
                            <Button size='small' variant="contained" startIcon={<AddIcon />}
                                sx={{ backgroundColor: theme.palette.primary.light }} onClick={toggleDrawer(true)}>
                                Añadir
                            </Button>
                            <Button size='small' variant="contained" startIcon={<ExitToAppIcon />}
                                sx={{ backgroundColor: theme.palette.primary.light }}>
                                Exportar
                            </Button>
                            <Button size='small' variant="contained" startIcon={<SaveIcon />}
                                sx={{ backgroundColor: theme.palette.primary.light }} onClick={handleSave}>
                                Guardar
                            </Button>
                            <Button size='small' variant="contained" color='error' startIcon={<DeleteIcon />} onClick={handleClickOpenCleanDialog}>
                                Limpiar
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <DistributionTable />
                    </Grid>
                </Grid>
                <Drawer anchor='right' open={openDrawer} onClose={toggleDrawer(false)}>
                    <div role="presentation" style={{ width: 350, padding: 16 }}>
                        {!selectedVehicle ? (
                            <VehiclesCards onSelectVehicle={handleVehicleSelect} />
                        ) : (
                            <AddVehicleForm selectedVehicle={selectedVehicle} onClose={() => {
                                setSelectedVehicle(null);
                                setOpenDrawer(false);
                            }} />
                        )}
                    </div>
                </Drawer>
                <Dialog open={openCleanDialog} onClose={handleCloseCleanDialog}>
                    <DialogTitle>¿Está seguro de limpiar la tabla?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Esta acción eliminará todos los registros de la tabla.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCleanDialog}>Cancelar</Button>
                        <Button onClick={cleanTable} color='error'>Limpiar</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDispatchForm} onClose={() => setOpenDispatchForm(false)}>
                    <DialogTitle id="form-dialog-title">Información del Despacho</DialogTitle>
                    <DialogContent>
                        <DispatchForm onClose={() => setOpenDispatchForm(false)} consumos={vehiclesListConsum.filter(consumo => consumo.estadoDescripcion !== 'Inválido')} onClearConsumptions={clearSavedConsumptions} />
                    </DialogContent>
                </Dialog>
            </vehiclesConsumContext.Provider>
        </>
    );
};

export default TabRegisterDispatch;