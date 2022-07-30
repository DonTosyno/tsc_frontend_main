import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg from "../../../../assets/icons/TSC.png";
function Footer() {
  return (
    <div>
      <div className="grid_footer">
        <div className="grid_item">
          <h2>FOR INDIVIDUALS</h2>
          <Link to="/login" className="footer_links">Login</Link>
          <Link to="/signup" className="footer_links">Sign Up</Link>
        </div>

        {/* <div className="grid_item">
          <h2>EXPLORE </h2>
          <Link to="/login" className="footer_links">Career Collections</Link>
          <Link to="/signup" className="footer_links">What Career is Right for Me?</Link>
          <Link to="/signup" className="footer_links">Career in Finance</Link>
          <Link to="/signup" className="footer_links">Career in Medicine</Link>
        </div> */}
{/* 
        <div className="grid_item">
          <h2>FOR INSTITUTIONS </h2>
          <Link to="/login" className="footer_links">Group Pricing</Link>
        </div> */}

        <div className="grid_item">
          <div className="navbar_logo">
            <img src={logoImg} alt="logo"  style={{marginLeft: '-50px'}} />
          </div>
          <Link to="/about" className="footer_links">About The Scholars Career</Link>
          <Link to="/contact" className="footer_links">Contact</Link>
          <Link to="/faq" className="footer_links">FAQ Knowledge Base</Link>
          {/* <Link to="/signup" className="footer_links">Terms {"&"} Conditions</Link>
          <Link to="/signup" className="footer_links">Privacy</Link> */}
        </div>
      </div>

      <p className="bottom_footer_text" >© THE SCHOLARS CAREER INC. 2021</p>
    </div>
  );
}

export default Footer;
