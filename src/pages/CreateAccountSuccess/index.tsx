import React, { useRef, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import logoMainImg from "../../assets/icons/TSC-plain.png";
import gsap, { Power3 } from "gsap";

function CreateAccountSuccess() {
  const navigate = useNavigate();
  let loginRef = useRef(null);
 
  const [userType, setUserType] = useState("Student");

  useEffect(() => {
 
  gsap.from(loginRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
  }, [])
  return (
  <>
     <motion.div
        animate={{
          x: "-100vw",
          animationDuration: "0.5",
          transition: { duration: 0.5 },
        }}
        initial={{ x: 0 }}
        exit={{ x: 0, animationDuration: "0.5", transition: { duration: 0.5 } }}
        style={{
           position: "absolute",
          top: "0",
          left: "0",
           width: "100%",
          height: "140%",
          background: "#333",
          zIndex: "9980",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="navbar_logo" onClick={() => navigate('/')}>
          <img src={logoMainImg} alt="logo" />
        </div>
      </motion.div>
    <div className="loginPage">
      <div className="loginContainer" ref={loginRef}>
        <div className="loginContainerImg">
          <img src={logoMainImg} alt="logo" className="logoMainImg" />
        </div>
        <form> 
          <div className="form-group">
           <p className="verificationLinkText">A verification link has been sent to your email address. Please click the link to verify your account.</p>
          </div> 
        </form>
 
        <div className="login_forgot_password">
          <Link to="/" className="sign_up_text">
            Return to Homepage
          </Link>
        </div>
        <p className="bottom_footer_text">© THE SCHOLARS CAREER INC. 2021</p>
      </div>
    </div>
    </>
  );
}

export default CreateAccountSuccess;
