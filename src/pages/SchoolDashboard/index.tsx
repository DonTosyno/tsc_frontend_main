import React, { useRef, useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import logoMainImg from "../../assets/icons/TSC-plain.png";
import defaultUrl from "../../assets/img/default.png";
import gsap, { Power3 } from "gsap";
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import Sidebar from "../../components/Dashboard/sidebar_school/Sidebar";
import TopNav from "../../components/Dashboard/topnav_school/TopNav";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../redux/reducers";
import ThemeAction from "../../redux/actions/ThemeAction";
interface UserDataInterface {
  email: string;
  school: string;
  fullName: string;
  profilePictureImgUrl: string;
}

function SchoolDashboardMain({ props }: any) {
  const navigate = useNavigate();
  let loginRef = useRef(null);
  // console.log("props");
  // console.log(props);
  const themeReducer = useSelector((state: IRootState) => state.ThemeReducer);
  const accessToken = localStorage.getItem("accessToken");
  // console.log(themeReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location.pathname);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [userData, setUserData] = useState<UserDataInterface>({
    email: "",
    school: "",
    fullName: "",
     profilePictureImgUrl:""
  });
  const [userType, setUserType] = useState("Student");
  const [loading, setLoading] = useState(false);
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

  const getUserProfilePicture = (data: UserDataInterface) => {
    if (!accessToken) {
      navigate("/login");
    } else {
    try {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/profile/school/upload/${accessToken}`,
          { withCredentials: true }
        )
        .then((res) => {
          // console.log(res);

          if (res.status === 403) {
              console.log(res);
            // navigate("/login");
          }
          if (
            res.data.statusCode === 409 ||
            res.data.statusCode === 401 ||
            res.data.statusCode === 400
          ) {
            // console.log(res.data.message);
          }

          if (res.data) {
            // console.log("Success");
            // console.log(res.data);
           if (res.data.profilePicture){
            if (res.data.profilePicture === 'null'){
              setUserData({
                ...userData,
                profilePictureImgUrl: defaultUrl,
              });
            } else {
                  const profilePicBuffer = res.data.profilePicture.data.data;
            const base64String = Buffer.from(profilePicBuffer).toString('base64');
            const formattedString = `data:image/png;base64,${base64String}`;
            // console.log('formattedString');
            // console.log(formattedString)
            const finalData: UserDataInterface = {
              ...data,
              profilePictureImgUrl: formattedString
            }
            // console.log(finalData)
            setUserData(finalData);
            }
        
           }
           
            if (res.data.statusCode === 403) {
              console.log(res);
              // navigate("/login");
            } else {
              // setUserData(data);
              if (location.pathname === '/school/' || location.pathname === '/school') {
                navigate('/school/home')
              }
            }
          }
        });
    } catch (error: any) {
      console.log("error");
      console.log(error);
    }
  }
  };
  const getLoggedInUser = () => {
    if (!accessToken) {
      navigate("/login");
    } else {
    try {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/sessions/school/me/${accessToken}`,
          { withCredentials: true }
        )
        .then((res) => {
          // console.log(res);

          if (res.status === 403) {
            console.log(res);
            // navigate("/login");
          }
          if (
            res.data.statusCode === 409 ||
            res.data.statusCode === 401 ||
            res.data.statusCode === 400
          ) {
            setFormErrorMessage(res.data.message);
          }

          if (res.data) {
            // console.log("Success");
            // console.log(res.data);
            const data: UserDataInterface = {
              ...userData,
              email: res.data.email || res.data.schoolEmail,
              fullName: res.data.fullName || res.data.schoolName,
              school: res.data.school || "",
            };
            
            if (res.data.statusCode === 403) {
              console.log(res);
              // navigate("/login");
            } else {
              // setUserData(data);
              getUserProfilePicture(data)
              if (location.pathname === '/school/' || location.pathname === '/school') {
                navigate('/school/home')
              }
            }
          }
        });
    } catch (error: any) {
      // console.log("error");
      // console.log(error && error.message);
    }
  }
  };
  
  useEffect(() => {
    getLoggedInUser();
   
  }, []); 
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
      <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
        <Sidebar props={location} />
        <div className="layout__content">
          <TopNav userData={userData} /> 
          <p>{formErrorMessage}</p>
          <div className="layout__content-main">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolDashboardMain;
