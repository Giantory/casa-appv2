import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

const VehicleOverview = () => {
  const data = [
    { label: 'On the way', value: 39.7, time: '2hr 10min' },
    { label: 'Unloading', value: 28.3, time: '3hr 15min' },
    { label: 'Loading', value: 17.4, time: '1hr 24min' },
    { label: 'Waiting', value: 14.6, time: '5hr 19min' },
  ];

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography variant="h6">Vehicle Overview</Typography>
        {data.map((item, index) => (
          <Box key={index} mt={2}>
            <Typography variant="body2">{item.label}</Typography>
            <LinearProgress variant="determinate" value={item.value} />
            <Typography variant="body2">{item.time}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default VehicleOverview;
