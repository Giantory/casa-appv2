import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material';
import ReactApexChart from 'react-apexcharts';


const CategoriesChart = () => {

  // ** Hook
  const theme = useTheme()

  const series = [44, 55, 41, 17, 15]

  const options = {

    chart: {
      height: 450,

      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
      <ReactApexChart height={800} type='donut' options={options} series={series} />
    </Box>
  )
}


export default CategoriesChart