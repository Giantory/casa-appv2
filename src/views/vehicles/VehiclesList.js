import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material';
import RegisterVehicleModal from 'src/layouts/components/RegisterVehicleModal';
import RegisterConsumptionModal from './RegisterConsumptionModal';
import dayjs from 'dayjs';

const statusObj = {
  Desmedido: { color: 'error' },
  Sospechoso: { color: 'warning' },
  Regular: { color: 'success' },
  Indeterminado: { color: 'secondary' },
};

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Row(props) {
  const { row, onAddConsumption } = props;
  const [open, setOpen] = React.useState(false);
  const [vehicleDetails, setVehicleDetails] = React.useState([]);
  const [modalAddConsumOpen, setModalAddConsumOpen] = useState(false);
  const [modalAddVehicleOpen, setModalAddVehicleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchVehicleDetails = (vehicleCode) => {
    fetch(`http://localhost:3001/api/vehicle-details/${vehicleCode}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setVehicleDetails(data);
        } else {
          setVehicleDetails([]);
        }
      })
      .catch(error => {
        console.error('Error fetching vehicle details:', error);
        setVehicleDetails([]);
      });
  };

  const handleExpandClick = () => {
    if (!open) {
      fetchVehicleDetails(row.placa);
    }
    setOpen(!open);
  };

  const handleOpenAddConsumModal = () => {
    setSelectedVehicle(row.placa);
    setModalAddConsumOpen(true);
  };

  const handleCloseAddConsumModal = () => {
    setModalAddConsumOpen(false);
    setSelectedVehicle(null);
  };

  const handleOpenRegisterVehicleModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalAddVehicleOpen(true);
  };

  const handleCloseRegisterVehicleModal = () => {
    setModalAddVehicleOpen(false);
    setSelectedVehicle(null);
  };

  const handleSaveNewConsum = (newConsumption) => {
    onAddConsumption(selectedVehicle, newConsumption);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleExpandClick}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.placa}</TableCell>
        <TableCell>{row.descripcion}</TableCell>
        <TableCell>{row.horometraje}</TableCell>
        <TableCell>{row.kilometraje}</TableCell>
        <TableCell>{row.consumProm}</TableCell>
        <TableCell>{row.maxConsum}</TableCell>
        <TableCell>{row.minConsum}</TableCell>
        <TableCell>
          <IconButton onClick={() => handleOpenRegisterVehicleModal(row)}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1, textAlign: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6" gutterBottom component="div">
            Detalle de Consumos
          </Typography>
          <IconButton
            aria-label="add consumption"
            size="small"
            onClick={handleOpenAddConsumModal}
            sx={{ alignItems: 'flex-start' }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Table size="small" aria-label="vehicle details" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Fecha Despacho</TableCell>
              <TableCell>Horometraje</TableCell>
              <TableCell>Kilometraje</TableCell>
              <TableCell>Galones</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleDetails.length > 0 ? vehicleDetails.map((detail) => (
              <TableRow key={detail.id} >
                <TableCell>{dayjs(detail.fechaDespacho).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{detail.horometraje}</TableCell>
                <TableCell>{detail.kilometraje}</TableCell>
                <TableCell>{detail.galones}</TableCell>
                <TableCell>
                  <Chip
                    label={detail.mensajeEstado}
                    color={statusObj[detail.mensajeEstado]?.color || 'default'}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 },
                    }}
                  />
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No hay consumos</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  </TableCell>
</TableRow>

      {modalAddConsumOpen && (
        <RegisterConsumptionModal
          open={modalAddConsumOpen}
          handleClose={handleCloseAddConsumModal}
          handleSave={handleSaveNewConsum}
          vehicle={selectedVehicle}
        />
      )}
      {
        modalAddVehicleOpen && (
          <RegisterVehicleModal
            open={modalAddVehicleOpen}
            handleClose={handleCloseRegisterVehicleModal}
            vehicle={selectedVehicle}
          />
        )
      }
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    placa: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    horometraje: PropTypes.number.isRequired,
    kilometraje: PropTypes.number.isRequired,
    consumProm: PropTypes.number.isRequired,
    maxConsum: PropTypes.number.isRequired,
    minConsum: PropTypes.number.isRequired,
  }).isRequired,
  onAddConsumption: PropTypes.func.isRequired,
};

export default function VehiclesList({ role, plan, status, searchTerm }) {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    fetch('http://localhost:3001/api/vehicles', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(response => setVehiclesList(response));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddConsumption = (placa, newConsumption) => {
    // Aquí puedes manejar la lógica para añadir el nuevo consumo a la lista de vehículos.
    console.log('Añadir consumo para:', placa, newConsumption);
    // Aquí puedes actualizar la lista de vehículos o enviar la información al backend.
  };

  const filteredVehicles = vehiclesList.filter(vehicle => {
    const matchesRole = role ? vehicle.role === role : true;
    const matchesPlan = plan ? vehicle.plan === plan : true;
    const matchesStatus = status ? vehicle.status === status : true;
    const matchesSearch = vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRole && matchesPlan && matchesStatus && matchesSearch;
  });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredVehicles.length) : 0;

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper} sx={{ minHeight: 550, width: "100%" }}>
        <Table aria-label="vehicles table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Placa</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Horometraje</TableCell>
              <TableCell>Kilometraje</TableCell>
              <TableCell>Consumo Promedio</TableCell>
              <TableCell>Consumo Máximo</TableCell>
              <TableCell>Consumo Mínimo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(vehicle => (
              <Row key={vehicle.placa} row={vehicle} onAddConsumption={handleAddConsumption} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredVehicles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Box>
  );
}

VehiclesList.propTypes = {
  role: PropTypes.string,
  plan: PropTypes.string,
  status: PropTypes.string,
  searchTerm: PropTypes.string,
};
