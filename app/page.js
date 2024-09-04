"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomBarChart from './components/CustomBarChart';
import CustomLineChart from './components/CustomLineChart';
import CustomPieChart from './components/PieChart';
import CandlestickChart from './components/CandlestickChart';

const Dashboard = () => {
  // State variables to hold chart data
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  // Fetch data from multiple API endpoints on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching candlestick data
        const candlestickRes = await axios.get('http://localhost:8000/api/candlestick-data/');
        setCandlestickData(candlestickRes.data.data);

        // Fetching line chart data
        const lineChartRes = await axios.get('http://localhost:8000/api/line-chart-data/');
        setLineChartData(lineChartRes.data);

        // Fetching bar chart data
        const barChartRes = await axios.get('http://localhost:8000/api/bar-chart-data/');
        setBarChartData(barChartRes.data);

        // Fetching pie chart data
        const pieChartRes = await axios.get('http://localhost:8000/api/pie-chart-data/');
        setPieChartData(pieChartRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Execute the fetchData function on component mount
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Dashboard title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Dashboard</h1>

      {/* Main container for the charts */}
      <div className="space-y-10 max-w-6xl mx-auto">

        {/* Line Chart Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Line Chart</h2>
          <div className="w-full h-96">
            {/* Render the CustomLineChart component with data */}
            <CustomLineChart data={lineChartData} />
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bar Chart</h2>
          <div className="w-full h-96">
            {/* Render the CustomBarChart component with data */}
            <CustomBarChart data={barChartData} />
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pie Chart</h2>
          <div className="w-full h-96">
            {/* Render the CustomPieChart component with data */}
            <CustomPieChart data={pieChartData} />
          </div>
        </div>

        {/* Candlestick Chart Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Candlestick Chart</h2>
          <div className="w-full h-auto">
            {/* Render the CandlestickChart component with data */}
            <CandlestickChart data={candlestickData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;