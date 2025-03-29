import React, { useEffect, useState } from "react";
import { fetchHistory } from "../api";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        console.log("Inside handleHistory");
        const data = await fetchHistory();
        console.log("Fetched data:", data);
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

  return (
    <div className="card p-4">
      <h2 className="card-title text-center mb-4">
        Sentiment Analysis History
      </h2>
      <div className="list-group">
        {history &&
          history.map((item, index) => (
            <div key={index} className="list-group-item">
              <p className="mb-2">
                <strong>Text:</strong> {item.text}
              </p>
              <p className="mb-2">
                <strong>Sentiment:</strong> {item.sentiment_label} (
                {item.sentiment_score.toFixed(2)})
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
