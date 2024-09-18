// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import khubaib from "../images/logo2.png";
export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={khubaib} alt="Logo" className="logo-img" />
          <span className="logo-text"></span>
        </Link>
        <nav className="navbar">
          <ul className="nav-links">
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            {/* <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
