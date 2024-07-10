import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SummaryCard = ({ icon, title, value, change }) => {
  return (
    <Card sx={{ minWidth: 150, margin: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          {icon}
          <Box ml={2}>
            <Typography variant="h5">{value}</Typography>
            <Typography color="textSecondary">{title}</Typography>
            <Typography variant="body2" color={change > 0 ? 'green' : 'red'}>
              {change > 0 ? `+${change}%` : `${change}%`} than last week
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Summary = () => {
  return (
    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
      <SummaryCard
        icon={<CheckCircleIcon color="primary" />}
        title="On route vehicles"
        value={42}
        change={18.2}
      />
      <SummaryCard
        icon={<WarningIcon color="secondary" />}
        title="Vehicles with errors"
        value={8}
        change={-8.7}
      />
      <SummaryCard
        icon={<ErrorIcon color="error" />}
        title="Deviated from route"
        value={27}
        change={4.3}
      />
      <SummaryCard
        icon={<ErrorIcon color="info" />}
        title="Late vehicles"
        value={13}
        change={2.5}
      />
    </Box>
  );
};

export default Summary;
