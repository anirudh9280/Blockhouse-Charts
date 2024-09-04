import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
const Candlestick = (props) => {
    const { x, y, width, height, low, high, openClose: [open, close], yAxisMin, yAxisMax } = props;
    const isGrowing = open < close;

    // Set the colors with transparency (0.5 for 50% opacity)
    const bodyColor = isGrowing ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'; // Green for growing, red for declining with 50% transparency
    const wickColor = isGrowing ? 'rgba(76, 175, 80, 1)' : 'rgba(244, 67, 54, 1)'; // Solid color for the wicks

    // Ratio to scale the wicks and body relative to the Y-axis min and max values
    const yAxisRange = yAxisMax - yAxisMin;
    const scaleY = (value) => ((yAxisMax - value) / yAxisRange) * height;

    // Candle body height (between open and close values)
    const candleHeight = Math.abs(scaleY(open) - scaleY(close));

    return (
        <g stroke={wickColor} fill={bodyColor} strokeWidth="2">
            {/* Top wick: Goes from the high value to the top of the candle body */}
            <line
                x1={x + width / 2}
                x2={x + width / 2}
                y1={scaleY(high)}
                y2={scaleY(Math.max(open, close))}
            />
            {/* Bottom wick: Goes from the low value to the bottom of the candle body */}
            <line
                x1={x + width / 2}
                x2={x + width / 2}
                y1={scaleY(Math.min(open, close))}
                y2={scaleY(low)}
            />
            {/* Candle body with transparency */}
            <rect
                x={x}
                y={scaleY(Math.max(open, close))}
                width={width}
                height={candleHeight}
                fill={bodyColor}
            />
        </g>
    );
};

const prepareData = (data) => {
    return data.map(({ open, close, ...rest }) => ({
        ...rest,
        openClose: [open, close],
    }));
};

const CandlestickChart = ({ data }) => {
    const processedData = prepareData(data);

    // Calculate the minimum and maximum values across the data set for proper scaling
    const minValue = Math.min(
        ...processedData.map((d) => Math.min(d.low, d.openClose[0], d.openClose[1]))
    );
    const maxValue = Math.max(
        ...processedData.map((d) => Math.max(d.high, d.openClose[0], d.openClose[1]))
    );

    // Adjust the Y-axis range for better visualization
    const adjustedMinValue = minValue * 0.4;
    const adjustedMaxValue = maxValue * 1.2;

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={500}>
                <BarChart
                    data={processedData}
                    margin={{ top: 20, right: 50, left: 50, bottom: 40 }}
                >
                    <XAxis dataKey="x" padding={{ left: 50, right: 50 }} stroke="white" />
                    <YAxis domain={[adjustedMinValue, adjustedMaxValue]} stroke="white" />
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={.5} />
                    <Tooltip />
                    <Bar
                        dataKey="openClose"
                        fill="#8884d8"
                        shape={
                            (props) => (
                                <Candlestick
                                    {...props}
                                    yAxisMin={adjustedMinValue}
                                    yAxisMax={adjustedMaxValue}
                                    height={500}
                                />
                            )
                        }
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CandlestickChart;