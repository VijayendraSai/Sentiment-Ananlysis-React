import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authenticated, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          AI Sentiment Analysis
        </Link>

        <div>
          {authenticated ? (
            <>
              <Link className="btn btn-primary me-2" to="/">
                Home
              </Link>
              <Link className="btn btn-primary me-2" to="/dashboard">
                Dashboard
              </Link>
              <Link className="btn btn-primary me-2" to="/charts">
                Visualizations
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-success me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-warning" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
