import * as React from 'react';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';

import { useTheme } from '@mui/material/styles'

const LinearProgressWithLabel = props => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{props.value}%</Typography>
      </Box>
    </Box>
  )
}


export default function DaysControlSummary() {

  const theme = useTheme()

  const [progress, setProgress] = useState(10)
  useEffect(() => {
    // const timer = setInterval(() => {
    //   setProgress(prevProgress => (prevProgress >= 100 ? 10 : prevProgress + 10))
    // }, 800)

    return () => {
      // clearInterval(timer)
    }
  }, [])
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>                 
                    <CheckCircleIcon sx={{ fontSize: 40, color: theme.palette.success.main }}/>                 
                </ListItemAvatar>
                <ListItemText primary="Consumo regular" secondary="0" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>                 
                    <ErrorIcon sx={{ fontSize: 40, color: '#FFCF5C' }}/>                 
                </ListItemAvatar>
                <ListItemText primary="Consumo sospechoso" secondary="0" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>                 
                    <CancelIcon sx={{ fontSize: 40, color: theme.palette.error.main }}/>                 
                </ListItemAvatar>
                <ListItemText primary="Consumo desmedido" secondary="0" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}