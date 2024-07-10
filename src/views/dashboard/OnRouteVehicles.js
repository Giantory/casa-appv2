import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress } from '@mui/material';

const vehicles = [
  { location: 'Cagnes-sur-Mer, France', startingRoute: 'Catania, Italy', endingRoute: 'No Warnings', progress: 49 },
  { location: 'Köln, Germany', startingRoute: 'Laspezia, Italy', endingRoute: 'Ecu Not Responding', progress: 24 },
  { location: 'Chambray-lès-Tours, France', startingRoute: 'Hamm, Germany', endingRoute: 'Oil Leakage', progress: 7 },
  { location: 'Berlin, Germany', startingRoute: 'Gelsenkirchen, Germany', endingRoute: 'No Warnings', progress: 95 },
  { location: 'Cergy-Pontoise, France', startingRoute: 'Berlin, Germany', endingRoute: 'No Warnings', progress: 65 },
];

const OnRouteVehicles = () => {
  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography variant="h6">On Route Vehicles</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Starting Route</TableCell>
                <TableCell>Ending Route</TableCell>
                <TableCell>Warnings</TableCell>
                <TableCell>Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle, index) => (
                <TableRow key={index}>
                  <TableCell>{vehicle.location}</TableCell>
                  <TableCell>{vehicle.startingRoute}</TableCell>
                  <TableCell>{vehicle.endingRoute}</TableCell>
                  <TableCell>{vehicle.warnings}</TableCell>
                  <TableCell>
                    <LinearProgress variant="determinate" value={vehicle.progress} />
                    {vehicle.progress}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default OnRouteVehicles;
