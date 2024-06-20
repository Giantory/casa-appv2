import React from "react";
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    TableSortLabel,
    TablePagination
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';


import { CategoryContext } from "../../pages/vehicles";

import CategoryInfo from "./DriverCategoryInfo";
import { ProfileDriverContext } from "../../pages/vehicles";




const rows = [
    {
        id: 1,
        category: 'Categoría 1',
        idDriver: 1
    },
    {
        id: 2,
        category: 'Categoría 2',
        idDriver: 2
    },
    {
        id: 3,
        category: 'Categoría 3',
        idDriver: 3
    },
    {
        id: 1,
        category: 'Categoría 1',
        idDriver: 1
    },
    {
        id: 2,
        category: 'Categoría 2',
        idDriver: 2
    },
    {
        id: 3,
        category: 'Categoría 3',
        idDriver: 3
    },
    {
        id: 1,
        category: 'Categoría 1',
        idDriver: 1
    },
    {
        id: 2,
        category: 'Categoría 2',
        idDriver: 2
    },
    {
        id: 3,
        category: 'Categoría 3',
        idDriver: 3
    },
    {
        id: 1,
        category: 'Categoría 1',
        idDriver: 1
    },
    {
        id: 2,
        category: 'Categoría 2',
        idDriver: 2
    },
    {
        id: 3,
        category: 'Categoría 3',
        idDriver: 3
    },
    {
        id: 1,
        category: 'Categoría 1',
        idDriver: 1
    },
    {
        id: 2,
        category: 'Categoría 2',
        idDriver: 2
    },
    {
        id: 3,
        category: 'Categoría 3',
        idDriver: 3
    },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



const headCells = [
    {
        id: 'category',
        numeric: true,
        disablePadding: false,
        label: 'categoría',
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function CategoriesTable() {

    
    const [isOpenCategoryInfo, setIsOpenCategoryInfo] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(12);

    const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
     const { selectedProfile, setSelectedProfile } = useContext(ProfileDriverContext);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleCategoryClick = (category) => {

        // setIsOpenCategoryInfo(!isOpenCategoryInfo);
        // setSelectedCategory(category);
        setSelectedProfile(category.idDriver);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Card >
                <CardContent>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 150, minHeight: 350 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleCategoryClick(row)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell component="th" id={labelId} >{row.category}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={5}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>
            <CategoryInfo showSideBar={{ isOpenCategoryInfo, setIsOpenCategoryInfo }} />
        </Box>
    );
}
