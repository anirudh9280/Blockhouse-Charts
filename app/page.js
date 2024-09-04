"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomBarChart from './components/CustomBarChart';
import CustomLineChart from './components/CustomLineChart';
import CustomPieChart from './components/CustomPieChart';
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
    <div className="min-h-screen bg-gray-900 text-gray-200 py-10 px-6">
      {/* Dashboard title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Dashboard</h1>

      {/* Main grid container for the charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Line Chart Section */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Line Chart</h2>
          <div className="w-full h-96">
            <CustomLineChart data={lineChartData} />
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Bar Chart</h2>
          <div className="w-full h-96">
            <CustomBarChart data={barChartData} />
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Pie Chart</h2>
          <div className="w-full h-96">
            <CustomPieChart data={pieChartData} />
          </div>
        </div>

        {/* Candlestick Chart Section */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Candlestick Chart</h2>
          <div className="w-full h-auto">
            <CandlestickChart data={candlestickData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;