import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    usersCount: 0,
    productsCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 500, 2300, 3400],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Visitors",
        data: [120, 190, 300, 500, 250],
        borderColor: "rgba(255,99,132,1)",
        fill: false,
        tension: 0.3,
      },
    ],
  };

 
  const pieData = {
    labels: ["Casual", "Partywear", "Formal", "Ethnic"],
    datasets: [
      {
        label: "Categories",
        data: [300, 50, 100, 80],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [50, 80, 120, 150, 200, 250],
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75,192,192,0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 shadow-lg rounded-xl text-center">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.usersCount}</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-xl text-center">
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.productsCount}</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-xl text-center">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl font-bold text-green-600">{stats.ordersCount}</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-xl text-center">
          <h3 className="text-gray-500 text-sm">Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600">${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="text-xl font-semibold mb-3">Monthly Sales</h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="text-xl font-semibold mb-3">Visitors Overview</h3>
          <Line data={lineData} />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3 px-2">Order ID</th>
                <th className="pb-3 px-2">Total</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(order => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm text-gray-600">#{order._id.substring(0, 8)}</td>
                  <td className="py-3 px-2 font-medium">${order.total}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
