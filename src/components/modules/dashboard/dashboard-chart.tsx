import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import tokenService from "@/services/token.service";
import DashboardService from "@/services/dashboradservice/DashboardService";
import { LoadingOutlined } from "@ant-design/icons"

const StatsChart = () => {
  const { useGetDashboard } = DashboardService();
  const [userId, setUserId] = useState<number | undefined>();

  useEffect(() => {
    const LoginPersonId = tokenService?.getLastUserData()?.id;
    if (LoginPersonId) {
      setUserId(LoginPersonId);
    }
  }, []);

  const { data: apiData, isLoading } = useGetDashboard();
  const stats = apiData?.data;

  // ✅ Safely handle empty or array data
  const overviewCount = stats?.overview_by_currency?.length || 0;
  const revenueCount = stats?.revenue_by_yacht?.length || 0;
  const performanceCount = stats?.performance_by_salesperson?.length || 0;

  const chartData = {
    series: [
      {
        name: "Stats",
        data: [overviewCount, revenueCount, performanceCount],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: false,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          colors: ["#1f2937"],
        },
        offsetY: -20,
      },
      colors: ["#ff854b", "#7c3aed", "#22c55e"],
      xaxis: {
        categories: [
          "Overview by Currency",
          "Revenue by Yacht",
          "Performance by Salesperson",
        ],
        labels: {
          rotate: -15,
          style: {
            fontSize: "14px",
            fontWeight: 500,
            colors: "#4b5563",
          },
        },
      },
      yaxis: {
        title: {
          text: "Record Count",
          style: {
            color: "#374151",
            fontSize: "14px",
          },
        },
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 500,
            colors: "#00a1b3", // ✅ changed to teal
          },
        },
        axisBorder: {
          show: true,
          color: "#d1d5db",
        },
      },
      grid: {
        borderColor: "#e5e9eb",
      },
      tooltip: {
        theme: "light",
      },
    },
  };

  if (isLoading) {
    return <p className="text-center p-6 text-gray-500"><LoadingOutlined style={{ fontSize: 40, color: "#00a1b3" }} spin /></p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00a1b3]">
        Dashboard Statistics
      </h1>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default StatsChart;
