import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material';
import ReactApexcharts from 'src/@core/components/react-apexcharts'


const RecentConsumChart = () => {
    const theme = useTheme();
    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch data from your API endpoint that runs the SQL query
        fetch('http://localhost:3001/api/analytic/getGallonsPerMonth')
            .then(response => response.json())
            .then(data => {
                const seriesData = [];
                const categoryData = [];

                data.forEach(item => {
                    const { mes, total_galones } = item;
                    categoryData.push(mes);
                    seriesData.push(total_galones);
                });

                setSeries([{ name: 'Total Galones', data: seriesData }]);
                setCategories(categoryData);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const options = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: true
            }
        },
        colors: ['#77B6EA'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Consumo Mensual de Galones',
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Mes'
            }
        },
        yaxis: {
            title: {
                text: 'Galones'
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
            <ReactApexcharts type='line' options={options} series={series} />
        </Box>
    );
}

export default RecentConsumChart;