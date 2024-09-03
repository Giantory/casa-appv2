import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import MessageIcon from '@mui/icons-material/Message';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

// Context
import { vehiclesConsumContext } from './TabRegisterDispatch';
import RegisterVehicleModal from 'src/layouts/components/RegisterVehicleModal';

const statusObj = {
  Desmedido: { color: 'error' },
  Sospechoso: { color: 'warning' },
  Regular: { color: 'success' },
  Indeterminado: { color: 'secondary' },
  Nuevo: { color: 'info' },
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

export default function DistributionTable() {
  const { vehiclesListConsum, setVehiclesListConsum } = useContext(vehiclesConsumContext);
  console.log(vehiclesListConsum)
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setModalOpen(false);
  };


  const handleSaveVehicle = (savedVehicle, additionalData) => {
    console.log(savedVehicle);
    console.log('Datos adicionales:', additionalData);

    setVehiclesListConsum((prevList) => {
      const updatedList = prevList.map((vehicle) =>
        vehicle.placa == savedVehicle.placa
          ? {
            ...vehicle,
            equipo: savedVehicle.descripcion,
            marca: additionalData.marca,
            modelo: additionalData.modelo,
            estadoCodigo: 4,
            estadoDescripcion: 'Indeterminado',
            mensaje: 'No se pudieron calcular las diferencias de horómetro y/o kilómetro'
          }
          : vehicle
      );

      // Este es el paso clave para asegurarte de que el estado se actualice correctamente.

      return updatedList; // Retorna la lista actualizada para que React actualice el estado local.
    });
  };




  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vehiclesListConsum.length) : 0;

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TableContainer sx={{ flex: 1, overflow: 'auto', minHeight: 500 }}>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Equipo</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Horometraje</TableCell>
              <TableCell>Kilometraje</TableCell>
              <TableCell>Galones</TableCell>
              <TableCell>Rendimiento</TableCell>
              <TableCell>Operador</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Mensaje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? vehiclesListConsum.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : vehiclesListConsum
            ).map((row) => (
              <TableRow hover key={row.index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme.spacing(0.5) }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>{row.equipo}</Typography>
                </TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.modelo}</TableCell>
                <TableCell>{row.placa}</TableCell>
                <TableCell>{row.horometraje}</TableCell>
                <TableCell>{row.kilometraje}</TableCell>
                <TableCell>{row.galones}</TableCell>
                <TableCell>{row.rendimiento}</TableCell>
                <TableCell>{row.operador}</TableCell>
                <TableCell>
                  <Chip
                    label={row.estadoDescripcion}
                    color={statusObj[row.estadoDescripcion]?.color || 'default'}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 },
                      cursor: row.estadoDescripcion === 'Nuevo' ? 'pointer' : 'default'
                    }}
                    onClick={row.estadoDescripcion === 'Nuevo' ? () => handleOpenModal(row) : null}
                  />
                </TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Tooltip title={row.mensaje} placement='top'>
                    <MessageIcon />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={11} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={5}
        component="div"
        count={vehiclesListConsum.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      <RegisterVehicleModal
        open={modalOpen}
        handleClose={handleCloseModal}
        vehicle={selectedVehicle}
        isNew={true}  // Indica que es un nuevo registro
        onSave={handleSaveVehicle}  // Pasa la función para manejar la actualización de la lista
      />
    </Box>
  );
}
