// src/components/Footer.js
import React from "react";
import "./Footer.css";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";



export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </div> */}
        <div className="footer-social">
          <a href="https://github.com/khubaibalibhatti/stepper-form" target="_blank" rel="noopener noreferrer">
          <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/khubaib-ali-5a51232a1/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
         <FaInstagram/>
          </a>
        </div>
        <p className="footer-text">© 2024, Made with ❤️ by Khubaib Ali</p>
      </div>
    </footer>
  );
}
