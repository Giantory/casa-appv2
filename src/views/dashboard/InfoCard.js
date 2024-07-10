import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const InfoCard = ({ icon, value, description, percentage, color }) => {
  return (
    <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            sx={{
              backgroundColor: `${color}.main`,
              borderRadius: '20%',
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: 40, color: `${color}.contrastText` } })}
          </Box>
          <Box ml={2}>
            <Typography variant="h4">{value}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ color: 'green' }}>+{percentage}</span> esta semana
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
