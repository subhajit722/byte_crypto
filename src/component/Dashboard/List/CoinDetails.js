import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto"; // Import Chart directly from chart.js
import { useParams } from "react-router-dom";
import "./CoinDetails.css";

const CoinDetails = () => {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [timePeriod, setTimePeriod] = useState(7); // Default time period of 7 days
  let chartInstanceRef = React.useRef(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoinDetails(response.data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    fetchCoinDetails();
  }, [id]);

  useEffect(() => {
    if (coinDetails) {
      fetchCoinChartData();
    }
  }, [coinDetails]);

  useEffect(() => {
    if (chartData) {
      renderChart(chartData);
    }
  }, [chartData, coinDetails, timePeriod]); // Include timePeriod in dependency array

  const fetchCoinChartData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${timePeriod}&interval=daily`
      );
      const coinChartData = response.data.prices.map((price) => ({ x: new Date(price[0]), y: price[1] }));
      setChartData(coinChartData);
    } catch (error) {
      console.error("Error fetching coin chart data:", error);
    }
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const renderChart = (data) => {
    const ctx = document.getElementById("coin-chart");
    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy the existing chart instance
      }
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${coinDetails.name} Price (INR)`,
              data: data,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM DD'
                }
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price (INR)'
              }
            }
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  };

  if (!coinDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="coin-details-container">
      <h1 className="coin-name">{coinDetails.name} ({coinDetails.symbol.toUpperCase()})</h1>
      <div className="chart-controls">
        <label htmlFor="time-period">Time Period:</label>
        <select id="time-period" value={timePeriod} onChange={handleTimePeriodChange}>
          <option value={7}>7 Days</option>
          <option value={30}>30 Days</option>
          <option value={90}>90 Days</option>
        </select>
      </div>
      <div className="chart-container">
        <canvas id="coin-chart"></canvas>
      </div>
      <div className="coin-info">
        <h2>Market Cap Rank: {coinDetails.market_cap_rank}</h2>
        <p>{coinDetails.description.en}</p>
        <p>Homepage: <a href={coinDetails.links.homepage[0]} target="_blank" rel="noopener noreferrer">{coinDetails.links.homepage[0]}</a></p>
        {/* Add more coin details as needed */}
      </div>
    </div>
  );
};

export default CoinDetails;
