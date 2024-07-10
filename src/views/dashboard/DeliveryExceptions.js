// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical';

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts';

const DeliveryExceptions = () => {
  // ** Hook
  const theme = useTheme();

  const options = {
    chart: {
      type: 'donut',
      parentHeightOffset: 0,
    },
    labels: ['Exceptions', 'Normal'],
    colors: [theme.palette.error.main, theme.palette.success.main],
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`,
    },
  };

  const series = [30, 70];

  return (
    <Card>
      <CardHeader
        title='Delivery Exceptions'
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
        <ReactApexcharts type='donut' height={350} options={options} series={series} />
      </CardContent>
    </Card>
  );
};

export default DeliveryExceptions;
