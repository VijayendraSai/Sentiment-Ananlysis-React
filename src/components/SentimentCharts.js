import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { fetchHistory } from "../api";

const SentimentCharts = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory();
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          console.error("Expected array, but got", data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    loadHistory();
  }, []);

  if (!history || history.length === 0) {
    return <p className="text-center mt-4">No sentiment data available.</p>;
  }

  // Count occurrences of each sentiment
  const sentimentCounts = history.reduce((acc, item) => {
    acc[item.sentiment_label] = (acc[item.sentiment_label] || 0) + 1;
    return acc;
  }, {});

  // Prepare Pie Chart Data
  const pieData = Object.keys(sentimentCounts).map((key) => ({
    name: key,
    value: sentimentCounts[key],
  }));

  // Assign Colors for Pie Chart
  const COLORS = {
    Positive: "#4CAF50", // Green
    Neutral: "#FFC107", // Yellow
    Negative: "#F44336", // Red
  };

  // Prepare Histogram Data (Sentiment Score Ranges)
  const bins = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
  const histogramData = bins.map((bin, index) => ({
    range: `${bin.toFixed(1)} - ${
      bins[index + 1] ? bins[index + 1].toFixed(1) : "1.0"
    }`,
    count: history.filter(
      (item) =>
        item.sentiment_score >= bin &&
        item.sentiment_score < (bins[index + 1] || 1.01)
    ).length,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Sentiment Analysis Charts
      </h2>

      <div className="row">
        {/* Sentiment Distribution Pie Chart */}
        <div className="col-md-6 mb-4">
          <h3 className="text-lg font-semibold mb-2">Sentiment Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Sentiment Score Histogram */}
        <div className="col-md-6 mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Sentiment Score Histogram
          </h3>
          <BarChart width={500} height={300} data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3498db" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default SentimentCharts;
