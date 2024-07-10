import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const DeliveryPerformance = () => {
  const performanceData = [
    { icon: <LocalShippingIcon color="primary" />, label: 'Packages in transit', value: 10000, change: 25.8 },
    { icon: <LocalShippingIcon color="primary" />, label: 'Packages out for delivery', value: 5000, change: 4.3 },
    { icon: <AssignmentTurnedInIcon color="success" />, label: 'Packages delivered', value: 15000, change: -12.5 },
    { icon: <AssignmentTurnedInIcon color="success" />, label: 'Delivery success rate', value: '95%', change: 35.6 },
    { icon: <ThumbUpIcon color="primary" />, label: 'Customer satisfaction', value: '4.5/5', change: 5.7 },
  ];

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography variant="h6">Delivery Performance</Typography>
        {performanceData.map((item, index) => (
          <Box display="flex" alignItems="center" mt={2} key={index}>
            {item.icon}
            <Box ml={2}>
              <Typography variant="body2">{item.label}</Typography>
              <Typography variant="h6">{item.value}</Typography>
              <Typography variant="body2" color={item.change > 0 ? 'green' : 'red'}>
                {item.change > 0 ? `+${item.change}%` : `${item.change}%`} than last month
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default DeliveryPerformance;
