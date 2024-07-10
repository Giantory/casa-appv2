import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

const orders = [
  {
    sender: 'Michael Hughes',
    receiver: 'Daisy Coleman',
    senderAddress: '101 Boulder, California (CA), 933130',
    receiverAddress: '939 Orange, California (CA), 910614',
  },
  {
    sender: 'Glenn Todd',
    receiver: 'Arthur West',
    senderAddress: '1713 Garnet, California (CA), 939573',
    receiverAddress: '156 Blaze, California (CA), 925878',
  },
];

const OrdersByCountries = () => {
  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography variant="h6">Orders by Countries</Typography>
        {orders.map((order, index) => (
          <Box key={index} mt={2}>
            <Typography variant="body2">SENDER</Typography>
            <Typography variant="h6">{order.sender}</Typography>
            <Typography variant="body2">{order.senderAddress}</Typography>
            <Typography variant="body2">RECEIVER</Typography>
            <Typography variant="h6">{order.receiver}</Typography>
            <Typography variant="body2">{order.receiverAddress}</Typography>
            {index < orders.length - 1 && <Divider />}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrdersByCountries;
