import React, { useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistical = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: booking,
    loading,
    error,
  } = useFetch(`${BASE_URL}/bookings`, refreshKey);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [timeRange, setTimeRange] = useState("year"); // Default view by year

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter bookings based on selected year, month, and isPayment
  const filteredBookings = booking.filter((b) => {
    const bookingDate = new Date(b.bookAt);
    const yearMatches = bookingDate.getFullYear() === selectedYear;
    const monthMatches =
      selectedMonth !== null
        ? bookingDate.getMonth() + 1 === selectedMonth
        : true;
    const isPaymentMatches = b.isPayment === true; // Only include bookings where isPayment is true
    return yearMatches && monthMatches && isPaymentMatches;
  });

  // Sắp xếp bookings theo bookAt
  const sortedBookings = filteredBookings.sort((a, b) => {
    return new Date(a.bookAt) - new Date(b.bookAt); // So sánh ngày đăng
  });

  // Prepare data based on the selected filters
  // Tạo dailyData từ các bookings đã sắp xếp
  const dailyData = sortedBookings.reduce((acc, b) => {
    const date = new Date(b.bookAt).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
    acc[date] = (acc[date] || 0) + b.totalPrice;
    return acc;
  }, {});

  // Cập nhật dailyChartData sau khi sắp xếp ngày
  const sortedDailyData = Object.keys(dailyData)
    .sort((a, b) => {
      const [dayA, monthA] = a.split("/").map(Number);
      const [dayB, monthB] = b.split("/").map(Number);
      return monthA - monthB || dayA - dayB;
    })
    .reduce((acc, key) => {
      acc[key] = dailyData[key];
      return acc;
    }, {});

  const monthlyData = filteredBookings.reduce((acc, b) => {
    const bookingDate = new Date(b.bookAt);
    if (bookingDate.getFullYear() === selectedYear) {
      const month = bookingDate.getMonth(); // Lấy tháng dưới dạng số (0 - 11)
      acc[month] = (acc[month] || 0) + b.totalPrice;
    }
    return acc;
  }, {});

  // Chuyển đổi keys từ số tháng (0-11) thành tên tháng và sắp xếp theo thứ tự tháng
  const sortedMonthlyData = Object.keys(monthlyData)
    .sort((a, b) => a - b)
    .reduce((acc, key) => {
      const monthName = new Date(0, key).toLocaleDateString("vi-VN", {
        month: "short",
      });
      acc[monthName] = monthlyData[key];
      return acc;
    }, {});

  // Count the number of bookings per tour
  const tourBookingCounts = filteredBookings.reduce((acc, b) => {
    const tourId = b.tourName; // Assuming `tourName` is available in booking data
    acc[tourId] = (acc[tourId] || 0) + 1;
    return acc;
  }, {});

  const tourChartData = {
    labels: Object.keys(tourBookingCounts), // Tour IDs as labels
    datasets: [
      {
        label: "Bookings Per Tour",
        data: Object.values(tourBookingCounts),
        backgroundColor: "rgba(54,162,235,0.5)", // Set the color of the bars
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 1,
      },
    ],
  };

  const dailyChartData = {
    labels: Object.keys(sortedDailyData),
    datasets: [
      {
        label: "Total Price by Day",
        data: Object.values(sortedDailyData),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const monthlyChartData = {
    labels: Object.keys(sortedMonthlyData),
    datasets: [
      {
        label: "Total Price by Month",
        data: Object.values(sortedMonthlyData),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total revenue based on tour booking date",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: timeRange === "day" ? "Date" : "Month",
        },
        ticks: {
          // This ensures the labels are displayed horizontally
          autoSkip: false,
          maxRotation: 45, // 0 ensures no rotation of the label
          minRotation: 45, // 0 ensures no rotation of the label
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Price (VND)",
        },
        min: 0, // Đảm bảo trục y luôn bắt đầu từ 0
        ticks: {
          callback: (value) => value.toLocaleString("vi-VN"),
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of tours according to tour booking date",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tour Name",
        },
        ticks: {
          // This ensures the labels are displayed horizontally
          autoSkip: false,
          maxRotation: 45, // 0 ensures no rotation of the label
          minRotation: 45, // 0 ensures no rotation of the label
        },
      },
      y: {
        title: {
          display: true,
          text: "Bookings",
        },
        beginAtZero: true, // Đảm bảo trục y luôn bắt đầu từ 0
        min: 0,
      },
    },
  };

  const totalDailyPrice = Object.values(dailyData).reduce(
    (sum, price) => sum + price,
    0
  );

  return (
    <div className="scrollbar__none">
      {/* Year and Month Selectors */}
      <div className="d-flex gap-3 mb-4">
        <div>
          <InputLabel htmlFor="yearSelect">Year:</InputLabel>
          <FormControl fullWidth>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              id="yearSelect"
              label="Year"
            >
              {Array.from(
                { length: 11 }, // Tổng cộng 21 năm (10 năm trước + 1 năm hiện tại + 10 năm sau)
                (_, i) => new Date().getFullYear() - 5 + i
              ).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <InputLabel htmlFor="monthSelect">Month:</InputLabel>
          <FormControl fullWidth>
            <Select
              value={selectedMonth || ""}
              onChange={(e) =>
                setSelectedMonth(e.target.value ? Number(e.target.value) : null)
              }
              id="monthSelect"
              label="Month"
            >
              <MenuItem value="">All</MenuItem>
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleDateString("vi-VN", { month: "long" })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Display Charts */}
      <div style={{ marginBottom: "20px" }}>
        <h5>
          Total Price in {selectedMonth ? `Month ${selectedMonth},` : "Year"}{" "}
          {selectedYear}
        </h5>
        <h5 style={{ marginTop: "10px" }}>
          Total Price:{" "}
          {totalDailyPrice
            .toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
            .replace("₫", "VND")}
        </h5>
        <Line
          data={selectedMonth ? dailyChartData : monthlyChartData}
          options={options}
          height={150}
          width={500}
        />
      </div>

      {/* Bar chart for bookings per tour */}
      <div style={{ marginBottom: "20px", width: "100%", height: "500px" }}>
        <h5>
          Bookings Per Tour in{" "}
          {selectedMonth ? `Month ${selectedMonth},` : "Year"} {selectedYear}
        </h5>
        <Bar data={tourChartData} options={barOptions} height={300} width={800} />
      </div>
    </div>
  );
};

export default Statistical;
