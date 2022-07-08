import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function SingleStudentModal({ currentStudent, setShowModal }) {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const location = useLocation();
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    image: {
      type: "",
      name: "",
    },
    imagePreviewUrl: "",
  });
  const [showSavePic, setShowSavePic] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    class: "",
    school: "",
    phoneNumber: "",
  }); 
  const getTemperamentText = (temperamentLetter, temperamentAcronym) => {
    switch (temperamentLetter) {
        case "R":
            return "Realistic";
        case "I":
            return "Investigative";
        case "A":
            return temperamentAcronym === "N/A" ? "N/A":"Artistic";
        case "S":
            return "Social";
        case "E":
            return "Enterprising";
        case "C":
            return "Conventional";
        default:
            return "N/A";
    }
  }
useEffect(() => {
    const getStudentProfilePic = async () => {
        // console.log(currentStudent)
        if (currentStudent.studentId){
            try {
                axios
                  .get(
                    `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/profile/school/getStudentProfilePic/${currentStudent.studentId}/${accessToken}`,
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
                    }
        
                    if (res.data) {
                      // console.log("GetProfilePic function ");
                      // console.log(res.data); 
                      if (res.data.profilePicture) {
                        const profilePicBuffer = res.data.profilePicture.data.data;
                        const base64String =
                          Buffer.from(profilePicBuffer).toString("base64");
                        const formattedString = `data:image/png;base64,${base64String}`;
                        setProfilePictureUrl(formattedString);
                      }
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
        }
      
    };
    getStudentProfilePic();
  }, [currentStudent]);
  return (
    <motion.div
      animate={{
        x: 0,
        animationDuration: "0.5",
        transition: { duration: 0.5 },
      }}
      initial={{ x: "-100vw" }}
      exit={{ x: 0, animationDuration: "0.5", transition: { duration: 0.5 } }}
      className="singleStudentModal"
    >
      <div className="studentModalContainer"> 
        <p className="page-header" style={{cursor: 'pointer'}} onClick={() => setShowModal(false)}>Back</p>
        <div>
          {/* <h2 className="page-header">{currentStudent.name}</h2> */}
          <div className="profile-container">
            <div className="profile-container__left">
              <div className="container_left_top">
                <div className="container_left_details">
                  {/* <h2>
                    {currentStudent.name} 
                  </h2> */}
                  
                </div>
                <div className="profile-container__left__image">
                  <img
                    src={
                        profilePictureUrl
                    }
                    alt="profile"
                  />
                </div>
              </div>
            </div>
            <div className="profile-container__right">
              <div className="container_right_top">
                <h3  className="page-header">Basic Profile</h3>

                <form>
                  <p style={{margin: '5px 0'}}><strong>Name: </strong>{currentStudent.name}</p> 
                  <p style={{margin: '5px 0'}}><strong>Email: </strong>{currentStudent.email}</p>
                  <p style={{margin: '5px 0'}}><strong>Date Of Birth: </strong>{new Date(currentStudent.dateofBirth).toDateString()}</p>
                  <p style={{margin: '5px 0'}}><strong>Class: </strong>{currentStudent.class}</p>
                  <p style={{margin: '5px 0'}}><strong>Counselling Status: </strong>{currentStudent.counsellingStatus === true ? 'Completed': 'Pending'}</p>
 
                </form>
              </div>

              <div className="container_right_bottom">
                <h3  className="page-header">Temperament</h3>

                <div>
                  <div className="container_right_bottom_check">
                   
                    <strong>{getTemperamentText(currentStudent.temperament.charAt(0), currentStudent.temperament)}</strong>
                  </div>
                  <div className="container_right_bottom_check">
                   
                    <strong>{getTemperamentText(currentStudent.temperament.charAt(1),currentStudent.temperament)}</strong>
                  </div>
                  <div className="container_right_bottom_check">
                   
                    <strong>{getTemperamentText(currentStudent.temperament.charAt(2),currentStudent.temperament)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SingleStudentModal;
