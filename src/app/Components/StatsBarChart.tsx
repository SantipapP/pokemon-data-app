"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// ลงทะเบียน Chart.js เพื่อให้ใช้งานได้
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface StatData {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface StatsBarChartProps {
    stats: StatData[];
}

const StatsBarChart: React.FC<StatsBarChartProps> = ({ stats }) => {
    // จัดเตรียมข้อมูลสำหรับกราฟ
    const data = {
        labels: stats.map(stat => stat.stat.name), // ใช้ชื่อของ stat เป็น labels
        datasets: [
            {
                label: 'Base Stats',
                data: stats.map(stat => stat.base_stat), // ใช้ base_stat เป็นข้อมูลในกราฟ
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // สีพื้นหลังของแท่ง
                borderColor: 'rgba(75, 192, 192, 1)', // สีขอบของแท่ง
                borderWidth: 1, // ความหนาของขอบ
            },
        ],
    };

    // ตั้งค่ากราฟ
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y' as const, // ✅ เปลี่ยนกราฟแท่งให้เป็นแนวนอน (กำหนดเป็น 'y' อย่างถูกต้อง)
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
            },
        },
    };

    return <Bar data={data} options={options} style={{ width: '100%', height: '100%' }} />;
};

export default StatsBarChart;
