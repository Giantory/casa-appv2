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

  const handleSubmit = () => {
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
          label="ID Operador"
          type="text"
          fullWidth
          name="idOperador"
          value={formData.idOperador}
          onChange={handleChange}
          disabled={!!driver} // Disable the field if updating
        />
        <TextField
          margin="dense"
          label="Número de Licencia"
          type="text"
          fullWidth
          name="numLicencia"
          value={formData.numLicencia}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Nombres"
          type="text"
          fullWidth
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Apellidos"
          type="text"
          fullWidth
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          type="text"
          fullWidth
          name="telefono"
          value={formData.telefono}
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

export default RegisterOperatorModal;
