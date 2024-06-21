import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const RegisterOperatorModal = ({ open, handleClose, driver }) => {
  const [formData, setFormData] = useState({
    idOperador: '',
    numLicencia: '',
    nombres: '',
    apellidos: '',
    telefono: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (driver) {
      setFormData(driver);
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.numLicencia) newErrors.numLicencia = 'El número de licencia es obligatorio';
    if (!formData.nombres) newErrors.nombres = 'Los nombres son obligatorios';
    if (!formData.apellidos) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.telefono) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d+$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe contener solo números';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const url = driver ? `http://localhost:3001/api/drivers/${driver.idOperador}` : 'http://localhost:3001/api/drivers';
    const method = driver ? 'PUT' : 'POST';

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
      <DialogTitle>{driver ? 'Actualizar Operador' : 'Registrar Operador'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Número de Licencia"
          type="text"
          fullWidth
          name="numLicencia"
          value={formData.numLicencia}
          onChange={handleChange}
          error={!!errors.numLicencia}
          helperText={errors.numLicencia}
        />
        <TextField
          margin="dense"
          label="Nombres"
          type="text"
          fullWidth
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          error={!!errors.nombres}
          helperText={errors.nombres}
        />
        <TextField
          margin="dense"
          label="Apellidos"
          type="text"
          fullWidth
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          error={!!errors.apellidos}
          helperText={errors.apellidos}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          type="text"
          fullWidth
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          error={!!errors.telefono}
          helperText={errors.telefono}
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

export default RegisterOperatorModal;
