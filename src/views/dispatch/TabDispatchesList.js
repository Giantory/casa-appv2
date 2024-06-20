import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs'; // Importa dayjs

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
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{dayjs(row.fechaDespacho).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{row.nombres} {row.apellidos}</TableCell>
                <TableCell align="right">{row.totalGalones}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalle Despacho
                            </Typography>
                            <Table size="small" aria-label="detalle despacho">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Placa</TableCell>
                                        <TableCell align="right">Horometraje Anterior</TableCell>
                                        <TableCell align="right">Horometraje Después</TableCell>
                                        <TableCell align="right">Kilometraje Anterior</TableCell>
                                        <TableCell align="right">Kilometraje Después</TableCell>
                                        <TableCell align="right">Galones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.detalle.map((detalleRow) => (
                                        <TableRow key={detalleRow.idConsumo}>
                                            <TableCell>{detalleRow.placa}</TableCell>
                                            <TableCell align="right">{detalleRow.inHorometraje}</TableCell>
                                            <TableCell align="right">{detalleRow.horometraje}</TableCell>
                                            <TableCell align="right">{detalleRow.inKilometraje}</TableCell>
                                            <TableCell align="right">{detalleRow.kilometraje}</TableCell>
                                            <TableCell align="right">{detalleRow.galones}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        fechaDespacho: PropTypes.string.isRequired,
        nombres: PropTypes.string.isRequired,
        apellidos: PropTypes.string.isRequired,
        totalGalones: PropTypes.number.isRequired,
        detalle: PropTypes.arrayOf(
            PropTypes.shape({
                idConsumo: PropTypes.number.isRequired,
                placa: PropTypes.string.isRequired,
                inHorometraje: PropTypes.number.isRequired,
                horometraje: PropTypes.number.isRequired,
                inKilometraje: PropTypes.number.isRequired,
                kilometraje: PropTypes.number.isRequired,
                galones: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dispatchesList, setDispatchesList] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3001/api/dispatches', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(response => {
                if (Array.isArray(response)) {
                    const formattedData = response.reduce((acc, current) => {
                        const existingDispatch = acc.find(d => d.idDespacho === current.idDespacho);
                        if (existingDispatch) {
                            existingDispatch.detalle.push({
                                idConsumo: current.idConsumo,
                                placa: current.placa,
                                inHorometraje: current.inHorometraje,
                                horometraje: current.horometraje,
                                inKilometraje: current.inKilometraje,
                                kilometraje: current.kilometraje,
                                galones: current.galones,
                            });
                            existingDispatch.totalGalones += current.galones;
                        } else {
                            acc.push({
                                idDespacho: current.idDespacho,
                                fechaDespacho: dayjs(current.fechaDespacho).format('YYYY-MM-DD'),
                                nombres: current.nombres,
                                apellidos: current.apellidos,
                                totalGalones: current.galones,
                                detalle: [{
                                    idConsumo: current.idConsumo,
                                    placa: current.placa,
                                    inHorometraje: current.inHorometraje,
                                    horometraje: current.horometraje,
                                    inKilometraje: current.inKilometraje,
                                    kilometraje: current.kilometraje,
                                    galones: current.galones,
                                }],
                            });
                        }
                        return acc;
                    }, []);
                    setDispatchesList(formattedData);
                } else {
                    console.error('Response is not an array:', response);
                    setDispatchesList([]);
                }
            })
            .catch(error => {
                console.error('Error fetching dispatches:', error);
                setDispatchesList([]);
            });
    }, []);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dispatchesList.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <TableContainer component={Paper} sx={{ minHeight: 550, width: "100%" }}>
                <Table aria-label="collapsible table" >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Fecha de Despacho</TableCell>
                            <TableCell>Operador</TableCell>
                            <TableCell align="right">Total Galones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? dispatchesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : dispatchesList
                        ).map((row) => (
                            <Row key={row.idDespacho} row={row} />
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        {dispatchesList.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No hay registros disponibles
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                colSpan={6}
                count={dispatchesList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                    select: {
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Box>
    );
}