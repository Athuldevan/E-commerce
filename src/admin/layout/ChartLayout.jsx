import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useState } from "react";
import useOrders from "../../hooks/useOrders";
import { parseDate } from "../../utility/dateUtility"; 

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function ChartLayout() {
  const { allOrders } = useOrders();
  const [range, setRange] = useState(7);


  function getOrdersFromLastNDays(orders, days) {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - days);

    return orders.filter((order) => {
      const orderDate = parseDate(order.date);
      return orderDate >= fromDate && orderDate <= today;
    });
  }

  // Group orders by day for Line chart
  function getLineChartData(orders, days) {
    const grouped = {};

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString("en-GB");
      grouped[label] = 0;
    }

    orders.forEach((order) => {
      const date = parseDate(order.date).toLocaleDateString("en-GB");
      if (grouped[date] !== undefined) {
        grouped[date]++;
      }
    });

    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          label: `Orders in Last ${days} Days`,
          data: Object.values(grouped),
          borderColor: "rgba(59, 130, 246, 0.8)",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }

  // Compute data (every render)
  const recentOrders = getOrdersFromLastNDays(allOrders, range);
  const lineData = getLineChartData(recentOrders, range);

  // Doughnut chart (order status)
  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter(order => order.status === "pending").length;
  const deliveredOrders = allOrders.filter(order => order.status === "delivered").length;

  const doughnutData = {
    labels: ["Delivered", "Pending", "Other"],
    datasets: [
      {
        label: "Order Status",
        data: [
          deliveredOrders,
          pendingOrders,
          totalOrders - deliveredOrders - pendingOrders,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">Order Analytics</h2>

      {/* Range selector */}
      <div className="mb-4">
        <label htmlFor="range" className="text-sm font-medium mr-2 text-white">
          Show Data For:
        </label>
        <select
          id="range"
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="p-2 rounded text-black"
        >
          <option value={7}>Last 7 Days</option>
          <option value={14}>Last 14 Days</option>
          <option value={30}>Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doughnut Chart */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Order Status</h3>
          <div className="h-64">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
          <div className="h-64">
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartLayout;
