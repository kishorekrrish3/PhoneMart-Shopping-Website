import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleSignOut }) => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src="/assets/logo.svg" className="nav-logo" alt="MegaMart" />
      </Link>
      <div className="nav-search-container">
        <img
          src="/assets/search.svg"
          className="nav-search-icon"
          alt="Search"
        />
        <input
          type="text"
          placeholder="Search for products, brands and more"
          className="nav-search"
        />
      </div>
      <div className="nav-buttons">
        {/* Conditionally render Sign In/Sign Up or Sign Out button */}
        {user ? (
          <span className="nav-btn-1" onClick={handleSignOut}>
            <img src="/assets/user.svg" alt="User" />
            Sign Out
          </span>
        ) : (
          <Link to="/sign-in">
            <span className="nav-btn-1">
              <img src="/assets/user.svg" alt="User" />
              Sign Up/Sign In
            </span>
          </Link>
        )}
        <img src="/assets/line.svg" alt="Line" />
        <Link to="/cart">
          <span className="nav-btn-2">
            <img src="/assets/cart.svg" alt="Cart" />
            Cart
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
