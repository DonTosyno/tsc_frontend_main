import React, { useRef, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import logoMainImg from "../../assets/icons/TSC-plain.png";
import gsap, { Power3 } from "gsap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPasswordResetSuccess() {
  const navigate = useNavigate();
  let loginRef = useRef(null);
  const notifyMsg = (msg: string) => toast(msg); 

  useEffect(() => {
 
  gsap.from(loginRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
          notifyMsg("Password reset successfully. Please login with new password");
  }, [])
  return (
  <>
   <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
 />
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
           <p className="verificationLinkText">Password Reset Successfully.</p>
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

export default ForgotPasswordResetSuccess;
