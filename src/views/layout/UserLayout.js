import React, { useState, createContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Toolbar from '@mui/material/Toolbar';

//import HorizontalAppBar from '../shared/navigation/HorizontalAppBar';
//import TopToolbar from '../shared/TopToolbar';



//pages
import Home from '../../pages/dispatch';
import Drivers from '../../pages/vehicles';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


export const NavigationContext = createContext({});
export const SnackbarContext = createContext({});

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

const UserLayout = ({ children }) => {

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        status: ''
    });

    const handleClickSnackbar = (newState) => () => {
        setSnackbarState({ ...newState, open: true });
    };

    const handleCloseSnackbar = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    const { open, message, status } = snackbarState;


    const [value, setValue] = useState(1);

    const switchRenderNavigation = () => {
        switch (value) {
            case 1:
                return <Home />
            case 2:
                return <Drivers />
            case 3:
                return <div>Equipos</div>
            case 4:
                return <div>Historial</div>
            case 5:
                return <div>Estadísticas</div>
            default:
                return <div>Not found</div>
        }
    }
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <SnackbarContext.Provider value={{snackbarState, setSnackbarState}} >
            <NavigationContext.Provider value={{ value, setValue }}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }} >
                    <Grid item xs={12}>
                        <Toolbar >
                            {/* <TopToolbar /> */}
                        </Toolbar>
                    </Grid>
                    <Grid item xs={12} sx={{ minHeight: 610, }}>
                        {switchRenderNavigation()}
                    </Grid>
                    <Grid item xs={12} sx={{ width: '45%' }}>
                        {/* <HorizontalAppBar /> */}
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar} TransitionComponent={SlideTransition}>
                    <Alert onClose={handleCloseSnackbar} severity={status} sx={{ width: '100%', color: 'white' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </NavigationContext.Provider>
        </SnackbarContext.Provider>
    )
}

export default UserLayout;