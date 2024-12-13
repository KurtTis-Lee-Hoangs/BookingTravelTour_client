import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { Line, Bar } from "react-chartjs-2";
import { BASE_URL } from "../../../utils/config";
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

const HotelStatistical = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: bookings,
    loading,
    error,
  } = useFetch(`${BASE_URL}/hotels/admin/getAllBookingHotel`, refreshKey);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter bookings by isPayment, year, and month
  const filteredBookings = bookings
    .filter((b) => b.isPayment === true)
    .filter((b) => {
      const bookingDate = new Date(b.checkInDate);
      const yearMatches = bookingDate.getFullYear() === selectedYear;
      const monthMatches = selectedMonth
        ? bookingDate.getMonth() + 1 === selectedMonth
        : true;
      return yearMatches && monthMatches;
    })
    .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));

  // Group bookings by hotelRoomId details
  const roomTypeData = filteredBookings.reduce((acc, b) => {
    const { hotelRoomId } = b;
    const { _id, hotelId, roomType } = hotelRoomId;
    const key = `${hotelId}-${roomType}`;
    acc[key] = acc[key] || { hotelId, roomType, count: 0 };
    acc[key].count += 1;
    return acc;
  }, {});

  const roomTypeLabels = Object.values(roomTypeData).map(
    (item) => `${item.roomType}`
  );
  const roomTypeCounts = Object.values(roomTypeData).map((item) => item.count);

  const roomTypeChartData = {
    labels: roomTypeLabels,
    datasets: [
      {
        label: "Number of Rooms Booked",
        data: roomTypeCounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Room Booking Breakdown by Room Type",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Room Type",
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
          text: "Number of Rooms Booked",
        },
      },
    },
  };

  /// Calculate total revenue
  const totalRevenue = filteredBookings.reduce(
    (sum, b) => sum + b.totalPrice,
    0
  );

  // Prepare daily data for the chart
  const dailyData = filteredBookings.reduce((acc, b) => {
    const checkInDate = new Date(b.checkInDate);
    const date = checkInDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
    acc[date] = (acc[date] || 0) + b.totalPrice;
    return acc;
  }, {});

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

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue statistics by check-in date",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
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
        ticks: {
          callback: (value) => value.toLocaleString("vi-VN"),
        },
      },
    },
  };

  return (
    <div>
      {/* Year and Month Selectors */}
      <Box className="d-flex gap-3 mb-4">
        <Box>
          <TextField
            label="Year"
            select
            fullWidth
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from(
              { length: 11 },
              (_, i) => new Date().getFullYear() - 5 + i
            ).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <TextField
            label="Month"
            select
            fullWidth
            value={selectedMonth || ""}
            onChange={(e) =>
              setSelectedMonth(e.target.value ? Number(e.target.value) : null)
            }
          >
            <MenuItem value="">All</MenuItem>
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleDateString("vi-VN", { month: "long" })}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {/* Total Revenue */}
      <h5 className="mt-4">
        Total Revenue in {selectedMonth ? `Month ${selectedMonth},` : "Year"}{" "}
        {selectedYear}
      </h5>
      <h5 style={{ marginTop: "10px" }}>
        Total Price:{" "}
        {totalRevenue
          .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
          .replace("₫", "VND")}
      </h5>

      {/* Daily Revenue Chart */}
      <Box>
        <Line
          data={dailyChartData}
          options={lineChartOptions}
          height={150}
          width={500}
        />
      </Box>

      <h5 className="mt-2">
        Total number of rooms booked in
        {selectedMonth ? `Month ${selectedMonth},` : "Year"} {selectedYear}
      </h5>

      {/* Room Type Chart */}
      <Box>
        <Bar
          data={roomTypeChartData}
          options={barChartOptions}
          height={80}
          width={200}
        />
      </Box>
    </div>
  );
};

export default HotelStatistical;
