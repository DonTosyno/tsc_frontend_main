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
import { useCookies } from "react-cookie";
function LoginPage() {
  const navigate = useNavigate();
  let loginRef = useRef(null);
  const queryParam = qs.parse(location.search);
  // console.log('queryParam');
  // console.log(queryParam);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [userType, setUserType] = useState("Student");
  const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const createSessionSchema = object({
    email: string({
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
    if (queryParam && queryParam.email) {
      notifyMsg('Email Verification Successful. Please Log In')
  }},[])
  const handleCookie = (accessToken: string, refreshToken: string) => {
   
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userType",userType);
    // setCookie("accessToken", accessToken, {
    //   maxAge: 900000,
    //   httpOnly: true, 
    //   path: "/",
    //   sameSite: "strict",
    //   secure: false,
    // });
    // setCookie("refreshToken", refreshToken, {
    //   maxAge: 900000,
    //   httpOnly: true, 
    //   path: "/",
    //   sameSite: "strict",
    //   secure: false,
    // });
  }

  const loginUser = (data: any) => {
    // console.log(data);
    setLoading(true);
    // setSchoolInputError(false);
    setFormErrorMessage(""); 
    const userForm = {
      ...data,
      userType:
        userType === "Student"
          ? "student"
          : userType === "School"
          ? "school"
          : "",
    };

    // console.log(userForm);
    try {
      // TODO: Edit login to check for existing user.
      // If there's a session with valid: true, then set others to false.
      axios
        .post(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/sessions/`,
          userForm,
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
            // SET COOKIES
            // console.log('Tokens')
            // console.log(res.data.accessToken,res.data.accessToken)
             handleCookie(res.data.accessToken,res.data.accessToken);
            if (res.data.userType === "STUDENT") {
              
              navigate("/dashboard/home");
            } else if (res.data.userType === "SCHOOL") {
              console.log("school");
              console.log(res.data.userType);
              navigate("/school/home");
            }
          
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
        <div className="navbar_logo" >
          <img src={logoMainImg} alt="logo" />
        </div>
      </motion.div>
      <div className="loginPage">
        <div className="loginContainer" ref={loginRef}>
          <div className="loginContainerImg"  style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
            <img src={logoMainImg} alt="logo" className="logoMainImg" />
          </div>
          <form onSubmit={handleSubmit(loginUser)}>
            <input
              name="usertype"
              value={userType}
              hidden
              style={{ opacity: "0" }}
              type="text"
            />
            <div className="userTypeControls">
              <p
                className={userType === "Student" ? "active" : ""}
                onClick={() => setUserType("Student")}
              >
                Login as a Student
              </p>
              <p
                className={userType === "School" ? "active" : ""}
                onClick={() => setUserType("School")}
              >
                Login as a School
              </p>
            </div>

            <div className="form-group">
              <input
                {...register("email")}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email Address"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-group" style={{ marginTop: "20px" }}>
              <input
                {...register("password")}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                aria-describedby="passwordHelp"
                placeholder="Password"
                required
                autoComplete="off"
                minLength={6}
              />
            </div>

            <button className="login_submit_button" type="submit">
              {loading ? (
                <CircularProgress style={{ color: "#333" }} size={24} />
              ) : (
                "LOG IN"
              )}
            </button>
            <div className="login_forgot_password">
              <Link to="/signup" className="sign_up_text">
                Click here to sign up for free
              </Link>
            </div>

            <p style={{ color: "crimson", fontSize: "12px" }}>
              {formErrorMessage !== "" && formErrorMessage}
            </p>
          </form>

          <div className="login_forgot_password">
            <Link to="/forgot-password" className="sign_up_text">
              Forgot Password? Click here
            </Link>
          </div>
          {/* <div className="login_forgot_password">
            <Link to="/" className="sign_up_text">
              Return to Homepage
            </Link>
          </div> */}
          <p className="bottom_footer_text">© THE SCHOLARS CAREER INC. 2021</p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
