import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import axios from "axios"


const CustomLineChart = () => {
    const [chartData, setChartData] = useState([]);

    // Fetch data from the backend
    useEffect(() => {
        axios.get('http://localhost:8000/api/line-chart-data/')
            .then(response => {
                const { labels, data } = response.data;

                // Map the backend data format into a format Recharts expects
                const formattedData = labels.map((label, index) => ({
                    label: label,
                    value: data[index],
                }));

                setChartData(formattedData); // Set the formatted data to state
            })
            .catch(error => {
                console.error('Error fetching the line chart data:', error);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>

                {/* X-axis for labels (e.g., months) */}
                <XAxis dataKey="label" />

                {/* Y-axis for values */}
                <YAxis />

                {/* Grid for better readability */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* Tooltip to show data on hover */}
                <Tooltip />

                {/* Legend to describe what the line represents */}
                <Legend />

                {/* Line element displaying the chart data */}
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
