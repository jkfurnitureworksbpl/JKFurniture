import React from "react";
import { FaLinkedin, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
         {/* Left Section: Logo & Brand */}
         <div className="footer-brand">
           <div className="footer-logo">
             {/* <span className="logo-icon"></span> */}
             <img src="/images/logo/Copilot_20251001_160357.png" 
             className="logo-icon" alt="JKExportHub Logo" />
           </div>
           <span className="brand-name">JKExportHub</span>
         </div>

         {/* Right Section: Socials */}
         <div className="footer-socials">
           <a href="https://linkedin.com/company/JKExportHub" target="_blank" rel="noreferrer">
             <FaLinkedin size={20} />
           </a>
           <a href="https://facebook.com/JKExportHub" target="_blank" rel="noreferrer">
             <FaFacebook size={20} />
           </a>
           <a href="https://instagram.com/JKExportHub" target="_blank" rel="noreferrer">
             <FaInstagram size={20} />
           </a>
           <a href="mailto:info@jkexporthub.com">
             <FaEnvelope size={20} />
           </a>
         </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 JKExportHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
