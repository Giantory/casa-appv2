import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { SnackbarContext } from 'src/layouts/UserLayout';


const RegisterVehicleModal = ({ open, handleClose, vehicle, isNew }) => {
  const initialFormData = {
    placa: '',
    descripcion: '',
    horometraje: '',
    kilometraje: '',
    idMarca: 0,
    idModelo: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const { snackbarState, setSnackbarState } = useContext(SnackbarContext)


  useEffect(() => {
    if (vehicle && isNew) {
      setFormData({
        ...initialFormData,
        placa: vehicle.placa,
        horometraje: vehicle.horometraje,
        kilometraje: vehicle.kilometraje,
      });
    } else if (vehicle && !isNew) {
      setFormData(vehicle);
    } else {
      setFormData(initialFormData);
    }
  }, [vehicle, isNew]);

  useEffect(() => {
    fetch('http://localhost:3001/api/brands')
      .then(response => response.json())
      .then(data => {
        const uniqueBrands = Array.from(new Set(data.map(item => ({
          id: item.idMarca,
          name: item.descripcion.trim()
        }))));
        setBrands(uniqueBrands);
      });
  }, []);

  useEffect(() => {
    if (formData.idMarca) {
      fetch(`http://localhost:3001/api/models/${formData.idMarca}`)
        .then(response => response.json())
        .then(data => {
          setModels(data);
        });
    }
  }, [formData.idMarca]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Actualizar los nombres de marca y modelo seleccionados
    if (name === 'idMarca') {
      const brand = brands.find(brand => brand.id === parseInt(value));
      setSelectedBrand(brand ? brand.name : '');
    }

    if (name === 'idModelo') {
      const model = models.find(model => model.idModelo === parseInt(value));
      setSelectedModel(model ? model.descripcion.trim() : '');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.placa) newErrors.placa = 'La placa es obligatoria';
    if (!formData.descripcion) newErrors.descripcion = 'La descripción es obligatoria';
    if (formData.horometraje && isNaN(formData.horometraje)) newErrors.horometraje = 'El horometraje debe ser un número';
    if (formData.kilometraje && isNaN(formData.kilometraje)) newErrors.kilometraje = 'El kilometraje debe ser un número';
    if (!formData.idMarca) newErrors.idMarca = 'La marca es obligatoria';
    if (!formData.idModelo) newErrors.idModelo = 'El modelo es obligatorio';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const url = isNew ? 'http://localhost:3001/api/vehicles' : `http://localhost:3001/api/vehicles/${vehicle.placa}`;
    const method = isNew ? 'POST' : 'PUT';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        const { message, results } = response;

        // Verificamos si `changedRows` o `affectedRows` es mayor a 0
        if (results.changedRows > 0 || results.affectedRows > 0) {
          setSnackbarState({
            open: true,
            message: message || 'Actualizado con éxito',
            status: 'success',
          });
          handleClose();
          setFormData(initialFormData); // Limpia el formulario
          setErrors({}); // Limpia los errores
        } else {
          setSnackbarState({
            open: true,
            message: 'No se realizaron cambios',
            status: 'info',
          });
        }
      })
      .catch((error) => {
        setSnackbarState({
          open: true,
          message: 'Error en la solicitud',
          status: 'error',
        });
        console.error('Error:', error);
      });

  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        setFormData(initialFormData);  // Limpia el formulario al cerrar el modal
        setErrors({});                 // Limpia los errores al cerrar el modal
      }}
    >
      <DialogTitle>{isNew ? 'Registrar Vehículo' : 'Actualizar Vehículo'}</DialogTitle>
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
        <FormControl fullWidth margin="dense">
          <Select
            labelId="idMarca-label"
            name="idMarca"
            value={formData.idMarca}
            onChange={handleChange}
            error={!!errors.idMarca}
          >
            <MenuItem value={0}>Selecciona marca</MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
            ))}
          </Select>
          {errors.idMarca && <p style={{ color: 'red' }}>{errors.idMarca}</p>}
        </FormControl>
        <FormControl fullWidth margin="dense">
          <Select
            labelId="idModelo-label"
            name="idModelo"
            value={formData.idModelo}
            onChange={handleChange}
            error={!!errors.idModelo}
            disabled={!formData.idMarca}
          >
            <MenuItem value={0}>Selecciona modelo</MenuItem>
            {models.map(model => (
              <MenuItem key={model.idModelo} value={model.idModelo}>{model.descripcion.trim()}</MenuItem>
            ))}
          </Select>
          {errors.idModelo && <p style={{ color: 'red' }}>{errors.idModelo}</p>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          handleClose();
          setFormData(initialFormData);  // Limpia el formulario al cerrar el modal
          setErrors({});                 // Limpia los errores al cerrar el modal
        }} color="primary">
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
