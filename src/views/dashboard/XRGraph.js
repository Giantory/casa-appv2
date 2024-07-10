// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical';

// ** Custom Components Imports
import dynamic from 'next/dynamic';
const ReactApexcharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const XRGraph = () => {
  // ** Hook
  const theme = useTheme();

  const options = {
    series: [{
      data: [8100, 8200, 8300, 8500, 8600, 8700, 8800] // Datos dummy
    }],
    chart: {
      height: 350,
      type: 'line',
      id: 'linechart-1'
    },
    annotations: {
      yaxis: [{
        y: 8200,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: 'Support',
        }
      }, {
        y: 8600,
        y2: 9000,
        borderColor: '#000',
        fillColor: '#FEB019',
        opacity: 0.2,
        label: {
          borderColor: '#333',
          style: {
            fontSize: '10px',
            color: '#333',
            background: '#FEB019',
          },
          text: 'Y-axis range',
        }
      }],
      xaxis: [{
        x: new Date('2023-11-23').getTime(),
        strokeDashArray: 0,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: 'Anno Test',
        }
      }, {
        x: new Date('2023-11-26').getTime(),
        x2: new Date('2023-11-28').getTime(),
        fillColor: '#B3F7CA',
        opacity: 0.4,
        label: {
          borderColor: '#B3F7CA',
          style: {
            fontSize: '10px',
            color: '#fff',
            background: '#00E396',
          },
          offsetY: -10,
          text: 'X-axis range',
        }
      }],
      points: [{
        x: new Date('2023-12-01').getTime(),
        y: 8607.55,
        marker: {
          size: 8,
          fillColor: '#fff',
          strokeColor: 'red',
          radius: 2,
          cssClass: 'apexcharts-custom-class'
        },
        label: {
          borderColor: '#FF4560',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#FF4560',
          },
          text: 'Point Annotation',
        }
      }, {
        x: new Date('2023-12-08').getTime(),
        y: 9340.85,
        marker: {
          size: 0
        },
        image: {
          path: '../../assets/images/ico-instagram.png'
        }
      }]
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      padding: {
        right: 30,
        left: 20
      }
    },
    title: {
      text: 'Line with Annotations',
      align: 'left'
    },
    labels: ['2023-11-23', '2023-11-24', '2023-11-25', '2023-11-26', '2023-11-27', '2023-11-28', '2023-11-29'], // Fechas dummy
    xaxis: {
      type: 'datetime',
    },
  };

  return (
    <Card>
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='line' height={350} options={options} series={options.series} />
      </CardContent>
    </Card>
  );
};

export default XRGraph;
