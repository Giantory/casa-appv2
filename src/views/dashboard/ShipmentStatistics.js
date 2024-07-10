// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical';

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts';

const ShipmentStatistics = () => {
  // ** Hook
  const theme = useTheme();

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper],
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8'],
      tickPlacement: 'on',
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        formatter: (value) => `${value}`,
      },
    },
  };

  const series = [
    {
      name: 'Deliveries',
      data: [40, 30, 20, 27, 18, 23, 34, 43],
    },
  ];

  return (
    <Card>
      <CardHeader
        title='Shipment Statistics'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' },
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        <ReactApexcharts type='bar' height={350} options={options} series={series} />
      </CardContent>
    </Card>
  );
};

export default ShipmentStatistics;
