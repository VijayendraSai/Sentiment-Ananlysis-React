import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SentimentForm from "./components/SentimentForm";
import SentimentCharts from "./components/SentimentCharts";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    // Redirect to the login page after logging out
    navigate("/login");
  };

  return (
    <>
      <Navbar authenticated={authenticated} handleLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? <SentimentForm /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/dashboard"
            element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/charts"
            element={
              authenticated ? <SentimentCharts /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              authenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
