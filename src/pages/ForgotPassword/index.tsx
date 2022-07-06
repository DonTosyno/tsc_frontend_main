import React, { useRef, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import logoMainImg from "../../assets/icons/TSC-plain.png";
import gsap, { Power3 } from "gsap";
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";
function ForgotPassword() {
  const navigate = useNavigate();
  let loginRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("Student");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");
  useEffect(() => {
 
  gsap.from(loginRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
  }, [])

  const initiateForgotPassword = (e: any) => {

    e.preventDefault()
    try {
      axios.post(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/confirmation/initiate-password`,
          {email})
        .then((res) => {
          // console.log("res is here");
          // console.log(res);
          setLoading(false);
          if (
            res.data.statusCode === 409 ||
            res.data.statusCode === 401 ||
            res.data.statusCode === 400 ||
            res.data.statusCode === 404
          ) {
            setFormErrorMessage(res.data.message);
          } else {
            navigate("/forgot-password/success");
          }
        });
    } catch (error: any) {
      // console.log("error");
      setLoading(false);
      // console.log(error && error.message);
    }
   
  }
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
        <div className="navbar_logo">
          <img src={logoMainImg} alt="logo" />
        </div>
      </motion.div>
    <div className="loginPage">
      <div className="loginContainer" ref={loginRef}>
        <div className="loginContainerImg">
          <img src={logoMainImg} alt="logo" className="logoMainImg" />
        </div>
        <form onSubmit={initiateForgotPassword}>
          <input name="usertype" value={userType} hidden style={{opacity: '0'}} type="text" />
          <div className="userTypeControls">
            <p
              className={userType === "Student" ? "active" : ""}
              onClick={() => setUserType("Student")}
            >
               Student Email
            </p>
            <p
              className={userType === "School" ? "active" : ""}
              onClick={() => setUserType("School")}
            >
               School Email
            </p>
          </div>
        
          <div className="form-group">
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputemail1"
              aria-describedby="emailHelp"
              placeholder={`${userType === "Student" ? "Student" : "School"} Email Address`}
              required
              autoComplete="off"
            />
          </div> 
          {/* <div className="form-group" style={{marginTop: '10px'}}>
            <input
              name="passwordConfirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="exampleInputpassword1"
              aria-describedby="passwordHelp"
              placeholder="Confirm New Password"
              required
              autoComplete="off"
            />
          </div>  */}
          <button className="login_submit_button" type="submit">
          {loading ? (
                <CircularProgress style={{ color: "#333" }} size={24} />
              ) : (
                "Reset Password"
              )}
          </button>
          <p style={{ color: "crimson", fontSize: "12px" }}>
              {formErrorMessage !== "" && formErrorMessage}
            </p>
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

export default ForgotPassword;
