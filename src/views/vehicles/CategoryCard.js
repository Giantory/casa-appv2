import * as React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTheme } from '@mui/material/styles';



export default function CategoryCard() {

    const theme = useTheme();
  
    return (

        <Grid container spacing={2} sx={{bgcolor: 'background.paper'}} >
            <Grid item xs={12}>
                <Typography variant="h4" component="div">
                    Categoría 1
                </Typography>
                <Chip avatar={<LocalShippingIcon />} label="12" />
            </Grid>
        </Grid>
    );
}
