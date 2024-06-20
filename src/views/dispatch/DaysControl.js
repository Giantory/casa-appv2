import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import DistributionForm from './DistributionForm'
import ConsumTable from './ConsumTable';
import DistributionTable from './DistributionTable';


import { Grid } from '@mui/material';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >        •
    </Box>
);

export default function DaysControl() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <Card variant="outlined" sx={{ minHeight: 300  }}>
            <CardContent>
                <Grid container spacing={2} >
                    <Grid item container spacing={2} xs={12}>
                        <Grid item xs={7} >
                            <TextField
                                size='small'
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SearchIcon fontSize='small' />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button variant="contained" sx={{ marginLeft: 5 }}>
                                OK
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Divider />
                    </Grid>
                    <Grid item xs={12} >
                        <DistributionTable/>
                    </Grid>
                </Grid>
            </CardContent>
            <DistributionForm showModal={{ open, setOpen }} />
        </Card>
    );
}