import React from "react";
import profileImg from "../../../assets/images/tuat.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
  
function Support() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const notifyMsg = (msg: string) => toast(msg);
  const requestCounsellorSupport = async () => {
    // console.log('working')
    try {
      axios
        .post(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/counselling/`+accessToken,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 403) {
            navigate("/login");
          }
          if (
            res.data.statusCode === 409 ||
            res.data.statusCode === 401 ||
            res.data.statusCode === 400
          ) {
            // console.log(res.data.message);
            notifyMsg(res.data.message);
          } else if (res.data) {
            // console.log("requestCounsellorSupport function ");
            // console.log(res.data);
            notifyMsg(res.data.message);
            if (
              location.pathname === "/dashboard/" ||
              location.pathname === "/dashboard"
            ) {
              navigate("/dashboard/home");
            }
          }
        });
    } catch (error) {
      // console.log("error");
      // console.log(error);
    }
  };
  return (
    <>
 <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
  
    <div>
      <h2 className="page-header">Counselor Support</h2>
      <div className="profile-container">
        <form>
          <p>Make a request to get in touch with one of our counselor for career support.</p>
 
          <div className="container_left_bottom" onClick={() => requestCounsellorSupport()}>
            <div className="container_left_bottom__item" >REQUEST COUNSELOR SUPPORT</div>
           </div>
        </form>
       
      </div>
    </div>
    </>
  );
}

export default Support;
