import React, {useState, useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import axios from "axios"

const CustomBarChart = () => {
    const [chartData, setChartData] = useState([]);

    // Fetch data from the backend
    useEffect(() => {
        axios.get('http://localhost:8000/api/bar-chart-data/')
            .then(response => {
                const { labels, data } = response.data;

                // Format the data for the BarChart
                const formattedData = labels.map((label, index) => ({
                    label: label,
                    value: data[index],
                }));

                setChartData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching the bar chart data:', error);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>

                {/* X-axis for categories */}
                <XAxis dataKey="label" stroke="#8884d8" />

                {/* Y-axis for values */}
                <YAxis stroke="#8884d8" />

                {/* Grid lines for better visual separation */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* Tooltip to display value details */}
                <Tooltip />

                {/* Legend to describe the bar */}
                <Legend />

                {/* Gradient for bars */}
                <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
                    </linearGradient>
                </defs>

                {/* Bar element with gradient and rounded corners */}
                <Bar
                    dataKey="value"
                    fill="url(#colorBar)"
                    radius={[10, 10, 0, 0]}
                    barSize={30}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};


export default CustomBarChart;
