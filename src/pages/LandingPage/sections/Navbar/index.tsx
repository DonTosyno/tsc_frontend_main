import React , {useRef, useEffect, useState} from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg from "../../../../assets/icons/TSC.png";
import { Icon } from "ts-react-feather-icons";
import gsap, {Power3} from "gsap"; 

interface NavbarProps {
 
  setShowModal : React.Dispatch<React.SetStateAction<boolean>>
setOverflowHiddenState: React.Dispatch<React.SetStateAction<boolean>>
}
function Navbar({setShowModal,setOverflowHiddenState}:NavbarProps) {
  const [showNavDropdown, setShowNavDropdown] = useState<boolean>(false);
 let navbar = useRef(null)
  let navbarLogoRef = useRef(null);
  let navLinksRef = useRef(null);
  let navLinksRightRef = useRef(null) 
  const accessToken = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");
  return (
    <div className="navbar_main" ref={navbar}>
      <div className="navbar_container">
        <div className="navbar_logo" ref={navbarLogoRef}>
          <img src={logoImg} alt="logo" />
        </div>
        <nav ref={navLinksRef}>
          <ul className="nav-nav_links" >
            <Link to="/" className="navbar_links">
              Home
            </Link>
            <Link to="/about" className="navbar_links">
              About Tsc
            </Link>
            <Link to="/blog" className="navbar_links">
              Blog
            </Link>
            <Link to="/faq" className="navbar_links">
              FAQ / Help
            </Link>
            <Link to="/contact" className="navbar_links">
              Contact Us
            </Link> 
          </ul>
          {/* <div className="search-icon nav-nav_links">
            <Icon name="search" color="#000" size={24} />
          </div> */}
        </nav>
      </div>

      <ul className="nav-login_div" ref={navLinksRightRef}>
      { !accessToken ?
          <Link to="/login" className="navbar_links nav-nav_links">
          Log In
        </Link> : <Link to={userType === "Student" ? "/dashboard/home": "/school/home" }className="navbar_links nav-nav_links">
          Dashboard
        </Link>
}
<Link to="/signup" className="navbar_links nav-nav_links">
          Sign Up
        </Link>
        <p className="nav-take_test nav-nav_links" style={{marginTop: '12px'}} onClick={() => {setShowModal(true);setOverflowHiddenState(true) }}>Take the Free Test</p>
      </ul>
      {/* Only shows for mobile screen */}
      <div className="hamburger-icon" onClick={() => {
        // console.log('clicked')
        setShowNavDropdown(!showNavDropdown)
      }}>
        <Icon name="menu" color="#fff" size={24} />
      </div>
      {showNavDropdown && (
        <ul className="hamburger-icon-dropdown animateDiv">
          <li className="hamburger-icon-dropdown-item">
            <Link to="/" className="mobile-link">
              Home
            </Link>
          </li>
          <li className="hamburger-icon-dropdown-item">
            <Link to="/about" className="mobile-link">
              About
            </Link>
          </li>
          <li className="hamburger-icon-dropdown-item">
            <Link to="/blog" className="mobile-link">
              Blog
            </Link>
          </li>
          <li className="hamburger-icon-dropdown-item">
            <Link to="/faq" className="mobile-link">
              FAQ / Help
            </Link>
          </li>
          <li className="hamburger-icon-dropdown-item">
          { !accessToken ?
          <Link to="/login" className="mobile-link">
          Log In
        </Link> : <Link to={userType === "Student" ? "/dashboard/home": "/school/home" }className="mobile-link">
          Dashboard
        </Link>
}
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
