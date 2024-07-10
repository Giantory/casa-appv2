import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const RegisterConsumptionModal = ({ open, handleClose, handleSave, vehicle }) => {
  const [fechaDespacho, setFechaDespacho] = useState(dayjs().format('YYYY-MM-DD'));
  const [horometraje, setHorometraje] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [galones, setGalones] = useState('');

  const handleSubmit = () => {
    // handleSave({
    //   fechaDespacho,
    //   horometraje: parseFloat(horometraje),
    //   kilometraje: parseFloat(kilometraje),
    //   galones: parseFloat(galones),
    // });
    handleClose();
  };

  const handleSaveNewConsum = (newConsumption) => {
    fetch('http://localhost:3001/api/consums/addConsum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            placa: vehicle,
            operador: 1,
            fechaDespacho: fechaDespacho,
            horometraje: horometraje,
            kilometraje: kilometraje,
            galones: galones
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Consumo añadido:', data);
        handleClose();
        // Aquí puedes actualizar la lista de vehículos con el nuevo consumo registrado.
    })
    .catch(error => {
        console.error('Error al añadir consumo:', error);
    });
};
  console.log(vehicle)
  return (
    
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Registrar Nuevo Consumo
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Placa"
          type="text"
          value={vehicle}
          disabled
          onChange={(e) => setKilometraje(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Fecha Despacho"
          type="date"
          value={fechaDespacho}
          onChange={(e) => setFechaDespacho(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Horometraje"
          type="number"
          value={horometraje}
          onChange={(e) => setHorometraje(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Kilometraje"
          type="number"
          value={kilometraje}
          onChange={(e) => setKilometraje(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Galones"
          type="number"
          value={galones}
          onChange={(e) => setGalones(e.target.value)}
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} sx={{ mr: 2 }}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveNewConsum}>Guardar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

RegisterConsumptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default RegisterConsumptionModal;
