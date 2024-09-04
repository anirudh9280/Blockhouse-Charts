import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';

const CustomPieChart = () => {
    const [chartData, setChartData] = useState([]);

    // Define custom colors for each slice
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#9370DB'];

    // Fetch data from the backend
    useEffect(() => {
        axios.get('http://localhost:8000/api/pie-chart-data/')
            .then(response => {
                const { labels, data } = response.data;

                // Format the data for the PieChart
                const formattedData = labels.map((label, index) => ({
                    label: label,
                    value: data[index],
                }));

                setChartData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching the pie chart data:', error);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>

                {/* Tooltip to show values on hover */}
                <Tooltip />

                {/* Legend to describe each slice */}
                <Legend />

                {/* Pie chart with custom colors for each slice */}
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"

                    // Custom label inside each slice
                    label={({ label, value }) => `${label}: ${value}`}
                    labelLine={false}
                >
                    {/* Assign a unique color to each slice */}
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};


export default CustomPieChart;
