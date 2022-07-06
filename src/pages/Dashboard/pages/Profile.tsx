import React, { useState, useEffect } from "react";
import profileImg from "../../../assets/images/tuat.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const { FileBase64 } = require("react-file-base64");
import { ToastContainer, toast } from "react-toastify";

interface UserDataInterface {
  email: string;
  firstName: string;
  lastName: string;
  class: string;
  school: string;
  phoneNumber: string;
}
function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const profilePicRef = React.useRef<HTMLInputElement>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    image: {
      type: "",
      name: "",
    },
    imagePreviewUrl: "",
  });
  const [showSavePic, setShowSavePic] = useState(false);
  const [userData, setUserData] = useState<UserDataInterface>({
    email: "",
    firstName: "",
    lastName: "",
    class: "",
    school: "",
    phoneNumber: "",
  });
  const getLoggedInUser = () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/sessions/student/me`,
          { withCredentials: true }
        )
        .then((res: any) => {
          // // console.log(res);

          if (res.status === 403) {
            navigate("/login");
          }
          if (
            res.data.statusCode === 409 ||
            res.data.statusCode === 401 ||
            res.data.statusCode === 400
          ) {
            // // console.log(res.data.message);
          }

          if (res.data) {
            // // console.log("Success");
            // // console.log(res.data);
            const data: UserDataInterface = {
              email: res.data.email,
              firstName: res.data.fullName
                ? res.data.fullName.split(" ")[0]
                : "",
              lastName: res.data.fullName
                ? res.data.fullName.split(" ")[1]
                : "",
              class: res.data.class,
              school: res.data.school,
              phoneNumber: "",
            };
            if (res.data.statusCode === 403) {
              navigate("/login");
            } else {
              setUserData(data);
              if (
                location.pathname === "/dashboard/" ||
                location.pathname === "/dashboard"
              ) {
                navigate("/dashboard/home");
              }
            }
          }
        });
    } catch (error: any) {
      // // console.log("error");
      // // console.log(error && error.message);
    }
  };

  const getUserProfilePicture = () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/profile/student/upload`,
          { withCredentials: true }
        )
        .then((res: any) => {
          // // console.log(res);

          if (res.status === 403) {
            navigate("/login");
          }
          if (
            res.data.statusCode === 409 ||
            res.data.statusCode === 401 ||
            res.data.statusCode === 400
          ) {
            // // console.log(res.data.message);
          }

          if (res.data) {
            // // console.log("Success");
            // // console.log(res.data);
            if (res.data.profilePicture) {
              const profilePicBuffer = res.data.profilePicture.data.data;
              const base64String =
                Buffer.from(profilePicBuffer).toString("base64");
              const formattedString = `data:image/png;base64,${base64String}`;
              setProfilePictureUrl(formattedString);
            }

            if (res.data.statusCode === 403) {
              navigate("/login");
            } else {
              // setProfilePictureUrl(formattedString);
              // setUserData(data);
              if (
                location.pathname === "/dashboard/" ||
                location.pathname === "/dashboard"
              ) {
                navigate("/dashboard/home");
              }
            }
          }
        });
    } catch (error: any) {
      // // console.log("error");
      // // console.log(error && error.message);
    }
  };

  useEffect(() => {
    getLoggedInUser();
    getUserProfilePicture();
  }, []);
  const notifyMsg = (msg: string) => toast(msg);
  const updateProfilePicture = () => {
    // // console.log(uploadedImg);
    const uploadData = {
      imagePreviewUrl: uploadedImg.imagePreviewUrl,
      contentType: uploadedImg.image.type,
      fileName: uploadedImg.image.name,
    };

    try {
      axios
        .post(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/profile/student/upload`,
          uploadData,
          { withCredentials: true }
        )
        .then((res: any) => {
          // // console.log(res);

          if (res.status === 403) {
            navigate("/login");
          }
          if (
            res.data.statusCode === 409 ||
            res.data.statusCode === 401 ||
            res.data.statusCode === 400
          ) {
           // // console.log(res.data.message);
          }

          if (res.data) {
            // // console.log("Success From Upload");
            // // console.log(res.data);

            if (res.data.statusCode === 403) {
              navigate("/login");
            } else {
              if (res.data.statusCode === 200) {
                notifyMsg('Profile Picture Updated Successfully');
                setShowSavePic(false)
              }
              // setProfilePictureUrl(formattedString);
              // setUserData(data);
              if (
                location.pathname === "/dashboard/" ||
                location.pathname === "/dashboard"
              ) {
                navigate("/dashboard/home");
              }
            }
          }
        });
    } catch (error: any) {
      // // console.log("error");
      // // console.log(error && error.message);
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
        <h2 className="page-header">Profile</h2>
        <div className="profile-container">
          <div className="profile-container__left">
            <div className="container_left_top">
              <div className="container_left_details">
                <h2>
                  {userData.firstName} {userData.lastName}
                </h2>
                <p>{userData.school}</p>
              </div>
              <div className="profile-container__left__image">
                <img
                  src={
                    uploadedImg.imagePreviewUrl !== ""
                      ? uploadedImg.imagePreviewUrl
                      : profilePictureUrl
                  }
                  alt="profile"
                />
              </div>
            </div>

            <div className="container_left_bottom">
              <input
                type="file"
                ref={profilePicRef}
                hidden={true}
                name="profilePicture"
                onChange={(e) => {
                  // // console.log(e.target.files);
                  setShowSavePic(true);
                  const reader = new FileReader();
                  const file = e.target.files;
                  if (file) {
                    reader.readAsDataURL(file[0]);
                    reader.onloadend = () => {
                      // // console.log("hmm");
                      // // console.log(reader.result);
                      if (file) {
                        setUploadedImg({
                          image: file[0],
                          imagePreviewUrl: reader.result as string,
                        });
                      }
                    };
                  }
                }}
              />

              <div
                className="container_left_bottom__item"
                onClick={() => {
                  if (profilePicRef.current) {
                    const node = profilePicRef.current!;
                    node.click();
                  }
                }}
              >
                UPLOAD PICTURE
              </div>

              {showSavePic && (
                <div
                  className="container_left_bottom__item"
                  onClick={() => updateProfilePicture()}
                >
                  SAVE PICTURE
                </div>
              )}
              {/* <div className="container_left_bottom__item dark">
                REMOVE PICTURE
              </div> */}
            </div>
          </div>
          <div className="profile-container__right">
            <div className="container_right_top">
              <h3>Basic Profile</h3>

              <form>
                <input
                  type="text"
                  placeholder="First Name"
                  value={userData.firstName}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={userData.lastName}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={userData.email}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={userData.phoneNumber}
                />
                <input
                  type="text"
                  placeholder="School Name"
                  value={userData.school}
                />
                <input type="text" placeholder="Class" value={userData.class} />

                {/* <div className="container_left_bottom">
 
                <button type="button"  className="container_left_bottom__item">CHANGE PASSWORD</button>
              </div> */}
              </form>
            </div>

            <div className="container_right_bottom">
              <h3>Notifications</h3>

              <form>
                <div className="container_right_bottom_check">
                  <input type="checkbox" />
                  <label>Email</label>
                </div>
                <div className="container_right_bottom_check">
                  <input type="checkbox" />
                  <label>Text Messagaes</label>
                </div>

                <div className="container_left_bottom">
                  <button
                    type="submit"
                    className="container_left_bottom__item dark"
                  >
                    SAVE SETTINGS
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
