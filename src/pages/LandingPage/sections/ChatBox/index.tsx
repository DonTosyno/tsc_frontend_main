import React, { useState } from "react";
import "./styles.css";
import logoMainImg from "../../../../assets/icons/TSC-plain.png";
import { Icon } from "ts-react-feather-icons";
import { motion } from "framer-motion";
import { Divider } from "@mui/material";
import { CircularProgress } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Chatbox() {
  const navigate = useNavigate();
  const notifyMsg = (msg: string) => toast(msg);
  const [contentClassName, setContentClassName] = useState("inactive");
  const [loading, setLoading] = useState(false);
  const isChatBoxVisible = contentClassName === "active";
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
            setContentClassName("inactive");
            notifyMsg("Your message has been sent successfully");
            setFullName('')
setEmail('')
setMessage('')
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
      <div className="chatBox">
        <div className={isChatBoxVisible ? "active" : "inactive"}>
          <div className="chatBoxCloseBtn" onClick={() => setContentClassName('inactive')}>
            <p>x</p>
          </div>
          <form onSubmit={sendContactMail}>
            <div className="form-group">
              <h2>
                <p>Welcome to The Student Career MessageBox</p>
              </h2>

              <div>
                <p>Please fill in the form below to send us an email</p>
              </div>
              <input
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputfullName1"
                aria-describedby="fullNameHelp"
                placeholder="fullName"
                required
                autoComplete="off"
              />

              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email Address"
                required
                autoComplete="off"
              />
              <textarea
                style={{ width: "260px", marginTop: "20px" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                cols={50}
              ></textarea>
            </div>

            <button
              className="login_submit_button"
              style={{
                marginTop: "-10px",
                marginLeft: "15px",
                textAlign: "center",
              }}
              type="submit"
            >
              {loading ? (
                <CircularProgress style={{ color: "#333" }} size={24} />
              ) : (
                "Send Message"
              )}
            </button>
            {formError !== "" && (
              <p style={{ color: "crimson", fontSize: "12px" }}>{formError}</p>
            )}
          </form>
        </div>
      {!isChatBoxVisible &&  <div
          className="chatboxImg"
          onClick={() => {
            // console.log(contentClassName);
            if (isChatBoxVisible) {
              setContentClassName("inactive");
              return;
            }
            setContentClassName("active");
          }}
        >
          <Icon name="message-square" color="#fff" size={24} />
          <img src={logoMainImg} alt="chat-img" />
        </div>}
      </div>
    </>
  );
}

export default Chatbox;
