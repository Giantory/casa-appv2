import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';

//context
import { vehiclesConsumContext } from '../../pages/dispatch';


const columns = [
  {
    field: 'placa',
    headerName: 'Código',
    width: 200,
    editable: true,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 200,
    editable: true,
  },
  {
    field: 'horometraje',
    headerName: 'Horometraje',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'kilometraje',
    headerName: 'Kilometraje',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'consumProm',
    headerName: 'Consumo Prom.',
    type: 'number',
    width: 115,
    editable: true,
  },
  {
    field: 'maxConsum',
    headerName: 'Consumo Máx.',
    type: 'number',
    width: 115,
    editable: true,
  },
  
  {
    field: 'minConsum',
    headerName: 'Consumo Min.',
    type: 'number',
    width: 115,
    editable: true,
  },
  

];



export default function VehiclesList() {

  const [vehiclesList, setVehiclesList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/vehicles', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        setVehiclesList(response)

      })
  }, [])

  const theme = useTheme();
  return (
    <Box sx={{
      height: 560,
      width: '100%',
      bgcolor: 'background.paper',
      borderRadius: 2,
    }}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={vehiclesList}
        getRowId={(row) => row.placa}
        columns={columns}
        columnHeaderHeight={40}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        rowHeight={40}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick

      />
    </Box>
  );
}
