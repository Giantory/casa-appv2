import { useEffect, useState } from 'react';

// ** MUI Imports
import Grid from '@mui/material/Grid'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoCard from 'src/views/dashboard/InfoCard';
import ErrorIcon from '@mui/icons-material/Error';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import XRGraph from 'src/views/dashboard/XRGraph';

const Dashboard = () => {

  const [vehiclesCounter, setVehiclesCounter] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/vehiles/vehiclesAmount', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(response => setVehiclesCounter(response[0]));
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={3} md={3}>
          <InfoCard
            icon={<LocalShippingIcon />}
            value={vehiclesCounter.total_vehiculos}
            description="Vehículos existentes"
            percentage={vehiclesCounter.vehiculos_recientes}
            color="primary"
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <InfoCard
            icon={<ErrorIcon />}
            value="23"
            description="Consumos irregulares"
            percentage="5"
            color="warning"
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <InfoCard
            icon={<LocalShippingIcon />}
            value={vehiclesCounter.total_vehiculos}
            description="Vehículos existentes"
            percentage={vehiclesCounter.vehiculos_recientes}
            color="primary"
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <InfoCard
            icon={<PersonRemoveIcon />}
            value="19"
            description="Conductores observados"
            percentage="1"
            color="error"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <XRGraph />
        </Grid>




      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
