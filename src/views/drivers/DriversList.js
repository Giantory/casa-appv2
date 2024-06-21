import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import RegisterOperatorModal from 'src/layouts/components/RegisterDriverModal';

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

export default function DriversList() {
  const [driversList, setDriversList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/drivers', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(response => setDriversList(response));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (driver) => {
    setSelectedDriver(driver);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDriver(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDriversList = driversList.filter(driver =>
    driver.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // driver.idOperador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.numLicencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.telefono.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredDriversList.length) : 0;

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ padding: 2 }}>
        <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          placeholder="Buscar"
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer sx={{ flex: 1, overflow: 'auto', minHeight: 500 }}>
        <Table sx={{ minWidth: 800 }} aria-label='drivers table'>
          <TableHead>
            <TableRow>
              <TableCell>Número de Licencia</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredDriversList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredDriversList
            ).map((row) => (
              <TableRow hover key={row.idOperador} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.numLicencia}</TableCell>
                <TableCell>{row.nombres}</TableCell>
                <TableCell>{row.apellidos}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={5}
        component="div"
        count={driversList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      {selectedDriver && (
        <RegisterOperatorModal
          open={modalOpen}
          handleClose={handleCloseModal}
          driver={selectedDriver}
        />
      )}
    </Box>
  );
}
