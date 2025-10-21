import React from "react";
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
  // 📊 Bar Chart (Monthly Sales)
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

  // 📈 Line Chart (Visitors)
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

  // 🥧 Pie Chart (Category Distribution)
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

  // 👩‍💻 Line Chart (User Growth)
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

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Quick Actions */}
      {/* <div className="flex flex-wrap gap-3 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Product
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Manage Orders
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
          View Reports
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Add Category
        </button>
      </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 shadow-lg rounded-xl text-center">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">10</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-xl text-center">
          <h3 className="text-gray-500 text-sm">Orders</h3>
          <p className="text-2xl font-bold text-green-600">10</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-xl text-center">
          <h3 className="text-gray-500 text-sm">Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600">$45,300</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-xl text-center">
          <h3 className="text-gray-500 text-sm">New Visitors</h3>
          <p className="text-2xl font-bold text-pink-600">872</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="text-xl font-semibold mb-3">Monthly Sales</h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="text-xl font-semibold mb-3">Visitors Overview</h3>
          <Line data={lineData} />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4 md:col-span-2">
          <h3 className="text-xl font-semibold mb-3">Category Distribution</h3>
          <div className="relative h-[300px] w-[300px] mx-auto">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4 md:col-span-2">
          <h3 className="text-xl font-semibold mb-3">User Growth</h3>
          <Line data={userGrowthData} />
        </div>
      </div>

    

      
    </div>
  );
};

export default Dashboard;
