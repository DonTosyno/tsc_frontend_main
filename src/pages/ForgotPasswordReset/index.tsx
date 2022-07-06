import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import logoMainImg from "../../assets/icons/TSC-plain.png";
import gsap, { Power3 } from "gsap";
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import qs from "query-string";

function ForgotPasswordReset() {
  const navigate = useNavigate();
  let loginRef = useRef(null);
  const queryParam = qs.parse(location.search);
  // console.log('queryParam');
  // console.log(queryParam);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [userType, setUserType] = useState("Student");
  const [loading, setLoading] = useState(false);
  const createSessionSchema = object({
    confirmPassword: string({
      required_error: "Email is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSessionSchema),
  });

  const notifyMsg = (msg: string) => toast(msg);

  useEffect(() => {
    if (queryParam && queryParam.email && queryParam.token) {
      notifyMsg('Password reset initiated. Please reset your password.')
  } else {
    navigate('/')
  }
},[])
  const checkNetworkConnectivity = () => {
    axios
      .get("https://www.google.com")
      .then((response) => {
        // console.log(response);
        // console.log("Connected to internet");
      })
      .catch((error) => {
        // console.log(error);
        notifyMsg("No Internet Connection");
        setLoading(false);
        // setFormErrorMessage("");
      });
  };

  const changePassword = (data: any) => {
    // console.log(data);
    setLoading(true);
    // setSchoolInputError(false);
    setFormErrorMessage("");
    // checkNetworkConnectivity();
      
    try {
      axios
        .post(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/confirmation/password/${queryParam.token}`,
          data,
          { withCredentials: true }
        )
        .then((res) => {
          // console.log("res is here");
          // console.log(res);
          setLoading(false);
          if (
            res.data.statusCode === 409 ||
            res.data.statusCode === 401 ||
            res.data.statusCode === 400
          ) {
            setFormErrorMessage(res.data.message);
          } else {
            
            
          navigate("/reset-password/success");
          }
        });
    } catch (error: any) {
      // console.log("error");
      setLoading(false);
      // console.log(error && error.message);
    }
  };
  useEffect(() => {
    gsap.from(loginRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: Power3.easeOut,
    });
  }, []);
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
        <div className="navbar_logo">
          <img src={logoMainImg} alt="logo" />
        </div>
      </motion.div>
      <div className="loginPage">
        <div className="loginContainer" ref={loginRef}>
          <div className="loginContainerImg">
            <img src={logoMainImg} alt="logo" className="logoMainImg" />
          </div>
          <form onSubmit={handleSubmit(changePassword)}>
            

        

            <div className="form-group" style={{ marginTop: "20px" }}>
              <input
                {...register("password")}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                aria-describedby="passwordHelp"
                placeholder="New Password"
                required
                autoComplete="off"
                minLength={6}
              />
            </div>
            <div className="form-group">
              <input
                {...register("confirmPassword")}
                type="password"
                className="form-control"
                id="exampleInputpassword1"
                aria-describedby="passwordHelp"
                placeholder="Confirm New Password"
                required
                autoComplete="off"
              />
            </div>
            <button className="login_submit_button" type="submit">
              {loading ? (
                <CircularProgress style={{ color: "#333" }} size={24} />
              ) : (
                "Change Password"
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

export default ForgotPasswordReset;
