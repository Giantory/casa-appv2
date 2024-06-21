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

  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};
    if (!formData.placa) newErrors.placa = 'La placa es obligatoria';
    if (!formData.descripcion) newErrors.descripcion = 'La descripción es obligatoria';
    if (!formData.horometraje || isNaN(formData.horometraje)) newErrors.horometraje = 'El horometraje debe ser un número';
    if (!formData.kilometraje || isNaN(formData.kilometraje)) newErrors.kilometraje = 'El kilometraje debe ser un número';
    if (!formData.consumProm || isNaN(formData.consumProm)) newErrors.consumProm = 'El consumo promedio debe ser un número';
    if (!formData.maxConsum || isNaN(formData.maxConsum)) newErrors.maxConsum = 'El consumo máximo debe ser un número';
    if (!formData.minConsum || isNaN(formData.minConsum)) newErrors.minConsum = 'El consumo mínimo debe ser un número';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
          error={!!errors.placa}
          helperText={errors.placa}
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
          error={!!errors.descripcion}
          helperText={errors.descripcion}
        />
        <TextField
          margin="dense"
          label="Horometraje"
          type="text"
          fullWidth
          name="horometraje"
          value={formData.horometraje}
          onChange={handleChange}
          error={!!errors.horometraje}
          helperText={errors.horometraje}
        />
        <TextField
          margin="dense"
          label="Kilometraje"
          type="text"
          fullWidth
          name="kilometraje"
          value={formData.kilometraje}
          onChange={handleChange}
          error={!!errors.kilometraje}
          helperText={errors.kilometraje}
        />
        <TextField
          margin="dense"
          label="Consumo Prom."
          type="text"
          fullWidth
          name="consumProm"
          value={formData.consumProm}
          onChange={handleChange}
          error={!!errors.consumProm}
          helperText={errors.consumProm}
        />
        <TextField
          margin="dense"
          label="Consumo Máx."
          type="text"
          fullWidth
          name="maxConsum"
          value={formData.maxConsum}
          onChange={handleChange}
          error={!!errors.maxConsum}
          helperText={errors.maxConsum}
        />
        <TextField
          margin="dense"
          label="Consumo Min."
          type="text"
          fullWidth
          name="minConsum"
          value={formData.minConsum}
          onChange={handleChange}
          error={!!errors.minConsum}
          helperText={errors.minConsum}
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
