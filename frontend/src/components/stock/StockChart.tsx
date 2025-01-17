import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StockChartProps {
    items: { date: string, quantity: number }[];
}

const StockChart: React.FC<StockChartProps> = ({ items }) => {
    const dates = items.map(item => new Date(item.date).toLocaleDateString());
    const quantities = items.map(item => item.quantity);

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Évolution du Stock',
                data: quantities,
                fill: true,
                borderColor: 'rgb(255, 0, 55)', // Green line color, // Dark green background color
                tension: 0.1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Évolution du Stock en termes de quantité',
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'white', // White grid lines
                },
                ticks: {
                    color: 'white', // White labels
                },
            },
            y: {
                grid: {
                    color: 'white', // White grid lines
                },
                ticks: {
                    color: 'white', // White labels
                },
            },
        },
    };

    return (
        <div className="bg-black rounded-lg p-6">
            <Line data={data} options={options} />
        </div>
    );
};

export default StockChart;