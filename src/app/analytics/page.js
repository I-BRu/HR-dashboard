'use client';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Link from 'next/link';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [departmentRatings, setDepartmentRatings] = useState({});
  const [bookmarkTrends, setBookmarkTrends] = useState([]);

  useEffect(() => {
    const getRandomDepartment = () => {
      const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];
      return departments[Math.floor(Math.random() * departments.length)];
    };

    const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

    const fetchUsers = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=50');
      const data = await res.json();

      const enhancedUsers = data.users.map((user) => ({
        ...user,
        department: getRandomDepartment(),
        rating: getRandomRating(),
      }));

      const deptData = {};
      enhancedUsers.forEach((user) => {
        const { department, rating } = user;
        if (!deptData[department]) {
          deptData[department] = { total: 0, count: 0 };
        }
        deptData[department].total += rating;
        deptData[department].count += 1;
      });

      const avgRatings = {};
      Object.keys(deptData).forEach((dept) => {
        avgRatings[dept] = (deptData[dept].total / deptData[dept].count).toFixed(2);
      });

      setDepartmentRatings(avgRatings);
    };

    const mockTrends = [
      { day: 'Mon', bookmarks: 3 },
      { day: 'Tue', bookmarks: 5 },
      { day: 'Wed', bookmarks: 2 },
      { day: 'Thu', bookmarks: 4 },
      { day: 'Fri', bookmarks: 6 },
    ];

    fetchUsers();
    setBookmarkTrends(mockTrends);
  }, []);

  const barData = {
    labels: Object.keys(departmentRatings),
    datasets: [
      {
        label: 'Avg Rating',
        data: Object.values(departmentRatings),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#8b5cf6',
          '#ec4899',
        ],
        borderRadius: 10,
        borderWidth: 2,
        borderSkipped: false,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 6,
        shadowColor: 'rgba(0, 0, 0, 0.1)'
      },
    ],
  };

  const lineData = {
    labels: bookmarkTrends.map((item) => item.day),
    datasets: [
      {
        label: 'Bookmarks per day',
        data: bookmarkTrends.map((item) => item.bookmarks),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: '#6366f1',
        borderWidth: 3,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)'
      },
    ],
  };

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
        📊 HR Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Department-wise Avg Ratings</h2>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-purple-700">📈 Weekly Bookmark Trends</h2>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      </div>
    </main>
  );
}
