import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import Footer from "./sections/Footer";
import Navbar from "./sections/Navbar";
import logoMainImg from "../../assets/icons/TSC-plain.png";
import GoogleMapComponent from "./sections/GoogleMapComponent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function ContactUs() {
  const navigate = useNavigate();
  const notifyMsg = (msg: string) => toast(msg);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const sendContactMail = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      fullName: fullName,
      email: email,
      message: message,
    };

    // console.log(data);

    try {
      axios
        .post(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/messsage/contact`,
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
            setFormError(res.data.message);
          } else {
            notifyMsg("Your message has been sent successfully");
            setFullName("");
            setEmail("");
            setMessage("");
          }
        });
    } catch (error: any) {
      // console.log("error");
      setLoading(false);
      // console.log(error && error.message);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
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
          zIndex: "9989",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="navbar_logo">
          <img src={logoMainImg} alt="logo" />
        </div>
      </motion.div>
      <Navbar />

      <div className="container" style={{ marginBottom: "10px" }}>
        <h3 style={{ marginTop: "80px" }}>Contact us</h3>
        <hr />
      </div>
      <div className="container contactUsMainDiv">
        <div className="row">
          <div className="col-md-6">
            <p style={{ marginBottom: "5px" }}>
              <i className="fa fa-phone-square"></i>
              <strong>&nbsp;Phone Number:</strong>&nbsp; +234 907 516 6404
            </p>
            <p>
              <i className="fa fa-envelope-square"></i>
              <strong>&nbsp;Email:</strong>&nbsp;thescholarscareers@gmail.com  
            </p>
            <p>
              <i className="fa fa-map-marker"></i>
              <strong>&nbsp;Address:</strong>&nbsp;Lagos, Nigeria
            </p>
            <p>
              <i className="fa fa-envelope"></i>
              <strong>&nbsp;LinkedIn:</strong>&nbsp;<a target="__blank" href="https://www.linkedin.com/in/the-scholars-career-tsc-138843215">The Scholars Careers</a>
            </p>
            <p>
              If you are thinking of using our career test or experiencing any
              technical issues, you can send us an email at
              <strong>&nbsp;thescholarscareers@gmail.com</strong>&nbsp;
            </p>
          </div>
          <div className="col-md-6">
         
          </div>
        </div>
      </div>
      <div className="container" style={{ margin: "55px auto" }}>
        <div
          className="row contactUsFormContainer"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="col-md-6">
            <div>
              <section className="contact-clean">
                <form method="post" onSubmit={sendContactMail}>
                  <h2 className="text-center" style={{ fontSize: "18px" }}>
                    Send us a Message
                  </h2>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="fullName"
                      value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    {/* <small className="form-text text-danger">
                      Please enter a correct email address.
                    </small> */}
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Message"
                      rows={14}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary" type="submit">
                      send{" "}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <div className="col-md-6">
            <section className="map-clean">
              <div className="container">
                <div className="intro">
                  <h2 className="text-center" style={{ fontSize: "18px" }}>
                    Location{" "}
                  </h2>
                  <p className="text-center">
                    Address of The Scholars Careers:
                  </p>
                </div>
              </div>
              <GoogleMapComponent />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
