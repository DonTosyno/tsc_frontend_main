import React, {useState, useEffect} from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';

function AddSchoolModal({ closeAddSchoolModal }) {
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken");

    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const notifyMsg = (msg) => toast(msg);
    const createPendingSchools = async (newSchool) => {
        if (!accessToken) {
          navigate("/login");
        } else {
            setErrorMessage('')
            setLoading(true)
        try {
          axios
            .post(
              `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/admin/createPendingSchool/${accessToken}`,
              newSchool,
              { withCredentials: true }
            )
            .then((res) => {
              // // console.log(res);
              if (res.status === 403) {
                navigate("/login");
              }
              if (
                res.data.statusCode === 409 ||
                res.data.statusCode === 401 ||
                res.data.statusCode === 400
              ) {
                // console.log(res.data.message);
              }
  
              if (res.data) {
                console.log("createPendingSchool function ");
                console.log(res.data);
                setLoading(false)
                 if (res.data.errors.length > 0){
                    setErrorMessage(res.data.errors[0].message)
                 } else {
                    closeAddSchoolModal()
                    // notifyMsg('School Added!')
                 }
                if (
                  location.pathname === "/admin/" ||
                  location.pathname === "/admin"
                ) {
                  navigate("/admin/home");
                }
              }
            });
        } catch (error) {
          // console.log("error");
          // console.log(error && error.message);
        }
      }
      };
  const handleAddSchool = (e) => {
    e.preventDefault(); 
    const newSchool = {
        schoolName:e.target.schoolName.value,
        schoolEmail:e.target.schoolEmail.value,
        phoneNumber: e.target.phoneNumber.value,
        address:e.target.address.value,
        verificationCode:e.target.verificationCode.value === '' ? 'NULL_STRING': e.target.verificationCode.value,
    } 
    console.log(newSchool)
     createPendingSchools(newSchool)
  };
  return ( 
    (
      <div className="admin_modal">
        <div className="admin_modal_card">
          <h2>Add New School</h2>
          <form onSubmit={handleAddSchool} className="admin_modal_form">
            <label>School Name</label>
            <input type="text" name="schoolName" required />

            <label>Email</label>
            <input type="text" name="schoolEmail" required email />

            <label>Phone Number</label>
            <input type="text"  name="phoneNumber" required />

            <label>Address</label>
            <input type="text"  name="address" required />

            <label>Custom Verification Code (Optional)</label>
            <input type="text"  name="verificationCode" />
            {
                errorMessage !== '' && <p style={{fontSize: '13px', color: 'crimson', marginTop: '10px'}}>{errorMessage}</p>
            }
            <div style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", marginTop: "10px"}}>
            <button type="submit" className="admin_button">
            {loading ? (
                <CircularProgress style={{ color: "#333" }} size={20} />
              ) : (
                "Submit"
              )}
            </button>
            <button className="admin_button" onClick={closeAddSchoolModal}>Close</button>
            </div>
            
          </form>
         
        </div>
      </div>
    )
  );
}

export default AddSchoolModal;
