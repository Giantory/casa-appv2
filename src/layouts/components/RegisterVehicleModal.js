import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const RegisterVehicleModal = ({ open, handleClose, vehicle }) => {
  const [formData, setFormData] = useState({
    placa: '',
    descripcion: '',
    horometraje: '',
    kilometraje: '',
    consumProm: '',
    maxConsum: '',
    minConsum: '',
  });

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const url = vehicle ? `http://localhost:3001/api/vehicles/${vehicle.placa}` : 'http://localhost:3001/api/vehicles';
    const method = vehicle ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        handleClose();
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{vehicle ? 'Actualizar Vehículo' : 'Registrar Vehículo'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Placa"
          type="text"
          fullWidth
          name="placa"
          value={formData.placa}
          onChange={handleChange}
          disabled={!!vehicle} // Disable the field if updating
        />
        <TextField
          margin="dense"
          label="Descripción"
          type="text"
          fullWidth
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Horometraje"
          type="text"
          fullWidth
          name="horometraje"
          value={formData.horometraje}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Kilometraje"
          type="text"
          fullWidth
          name="kilometraje"
          value={formData.kilometraje}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Consumo Prom."
          type="text"
          fullWidth
          name="consumProm"
          value={formData.consumProm}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Consumo Máx."
          type="text"
          fullWidth
          name="maxConsum"
          value={formData.maxConsum}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Consumo Min."
          type="text"
          fullWidth
          name="minConsum"
          value={formData.minConsum}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterVehicleModal;
