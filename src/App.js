import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SentimentForm from "./components/SentimentForm";
import SentimentCharts from "./components/SentimentCharts";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (Persist authentication state)
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <Router>
      <Navbar authenticated={authenticated} handleLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<SentimentForm />} />
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
    </Router>
  );
};

export default App;
