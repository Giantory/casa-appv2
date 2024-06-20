import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material';
import ReactApexChart from 'react-apexcharts';



const TankReferenceChart = () => {

    // ** Hook
    const theme = useTheme()

    const series = [76]


    const options = {

        chart: {
            height: 450,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                },
                track: {
                    background: '#fff',
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels

                },

                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '17px'
                    },
                    value: {
                        formatter: function (val) {
                            return parseInt(val);
                        },
                        color: '#111',
                        fontSize: '36px',
                        show: true,
                    }
                }
            }
        },
        fill: {
            type: 'solid',
            color: [theme.palette.primary.main],
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 1,
                gradientToColors: [theme.palette.primary.main,],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        labels: ['Total'],
    }





    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                height: '100%', 
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: theme.palette.secondary.main
            }}>
            <ReactApexChart type='radialBar'  options={options} series={series} />
        </Box>
    )
}


export default TankReferenceChart