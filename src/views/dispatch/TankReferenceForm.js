import React, { useEffect, useState } from 'react'
import { Grid } from "@mui/material";
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/';
import CircularProgress from '@mui/material/CircularProgress'
import TankReferenceChart from './TankReferenceChart';

const TankReferenceForm = (props) => {
    const [progress, setProgress] = useState(80)
    useEffect(() => {
        // const timer = setInterval(() => {
        //     setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 10))
        // }, 800)

        return () => {
            // clearInterval(timer)
        }
    }, [])

    const theme = useTheme();


    return (
       
            <Grid container spacing={1}>

                <TextField
                    size='small'
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}

                />
            </Grid>
      
    )
}

export default TankReferenceForm