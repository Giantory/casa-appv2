import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
//import MultipleDatesPicker from '@ambiot/material-ui-multiple-dates-picker'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';




import { useTheme } from '@mui/material/styles'

export default function QuickActionsList() {

  const [open, setOpen] = useState(false)

  const theme = useTheme()

  return (
    <>
      <List sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Button variant='outlined' size='small' sx={{ textTransform: 'none', minWidth: 370, backgroundColor: "white" }}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <AirlineSeatReclineNormalIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </ListItemAvatar>
            <ListItemText
              primary="Editar conductores de referencia"
            />
          </ListItem>
        </Button>
        <Button variant='outlined' size='small' onClick={() => setOpen(!open)} sx={{ textTransform: 'none', minWidth: 370, backgroundColor: "white" }}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <CalendarMonthIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </ListItemAvatar>
            <ListItemText
              primary="Resumir consumo por día(s)"
            />
          </ListItem>
        </Button>
        <Button variant='outlined' size='small' sx={{ textTransform: 'none', minWidth: 370, backgroundColor: "white" }}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <StarIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </ListItemAvatar>
            <ListItemText
              primary="Editar conductores de referencia"
            />
          </ListItem>
        </Button>
      </List>
      {/* <MultipleDatesPicker
        open={open}
        selectedDates={[]}
        onCancel={() => setOpen(false)}
        onSubmit={dates => console.log('selected dates', dates)}
      /> */}
    </>

  );
}
