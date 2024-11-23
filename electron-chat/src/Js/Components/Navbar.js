import React from "react";
import "./Navbar.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Navbar = ({ loggedInUserEmail, setLoggedInUserEmail }) => {
  return (
    <div className="content-wrapper">
      {/* ########## NAVBAR START ############ */}
      <div className="chat-navbar">
        <nav className="chat-navbar-inner">
          <div className="chat-navbar-inner-left">
            <span href="/" className="btn btn-outline-success ml-2">
            Personal Notes Manager
            </span>
          </div>

          <div className="chat-navbar-inner-right">
            {loggedInUserEmail && (
              <>
              <span className="logged-in-user">Hi User</span>
              <Link to="/" className="nav-link signup" onClick={() => setLoggedInUserEmail('')}>
                  Logout
                </Link>              
              </>
            )}
            {!loggedInUserEmail && (
              <>
                <Link to="/signup" className="nav-link signup">
                  Sign Up
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
