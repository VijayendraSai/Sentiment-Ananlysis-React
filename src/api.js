// import dotenv from "dotenv";
// dotenv.config();

// // Use the environment variable API_BASE or fall back to a default for development
// const API_BASE = process.env.API_BACKEND || "http://127.0.0.1:5000";
const API_BASE = "https://sentiment-analysis-flask-cdd2.onrender.com";

export const analyzeSentiment = async (text) => {
  // Get the JWT token from localStorage (or sessionStorage)
  const token = localStorage.getItem("token");

  // Send the request with Authorization header
  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze sentiment");
  }

  return response.json();
};

export const fetchHistory = async () => {
  const token = localStorage.getItem("token");
  console.log("Fetching history with token:", token);
  const response = await fetch(`${API_BASE}/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();

  console.log(data);

  return data.access_token;
};

export const registerUser = async (username, password) => {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  console.log(data);

  return data;
};
