import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import logoMainImg from "../../assets/icons/TSC-plain.png";
import gsap, { Power3 } from "gsap";
import face8 from "../../assets/img/stock_images/face8.jpg";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// pick a date util library
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import PhoneNumberInput from "./PhoneNumberInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { boolean, date, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import StudentSignUpForm from "./sections/StudentSignUpForm";
import {
  getCountries,
  getStatesByCountryIso,
} from "./utils/countryStateFunction";
import "react-phone-number-input/style.css";

interface DefaultErrors {
  schoolCountryError: boolean;
  schoolStateError: boolean;
  schoolPhoneNumberError: string;
}
function SignUp() {
  // const navigate = useNavigate();
  let loginRef = useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [formErrorMessage, setFormErrorMessage] = React.useState("");
  const [userType, setUserType] = React.useState("Student");
  const [startDate, setStartDate] = React.useState<
    Date | MaterialUiPickersDate
  >(new Date("2000-01-01"));
  const handleDateChange = (date: MaterialUiPickersDate) => {
    setStartDate(date);
  };

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = React.useState(undefined);
  const [phoneNoError, setPhoneNoError] = React.useState(false);
  const [allCountries, setAllCountries] = React.useState([]);
  const [countrySelected, setCountrySelected] = React.useState("");
  const [countrySelectedIso, setCountrySelectedIso] = React.useState("NG");
  const [statesFromSelectedCountry, setStatesFromSelectedCountry] =
    React.useState([]);
  const [stateSelected, setStateSelected] = React.useState("");
  const [defaultFormErrors, setDefaultFormErrors] =
    React.useState<DefaultErrors>({
      schoolCountryError: false,
      schoolStateError: false,
      schoolPhoneNumberError: "",
    });
  React.useEffect(() => {
    gsap.from(loginRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: Power3.easeOut,
    });
    setAllCountries(getCountries());
  }, []);

  React.useEffect(() => {
    setStatesFromSelectedCountry(getStatesByCountryIso(countrySelectedIso));
  }, [countrySelectedIso]);

  const createSchoolSchema = object({
    schoolName: string({
      required_error: "School Name is required",
    }).min(1),
    schoolAddress: string().nullable(),
    // schoolCountry: string({
    //   required_error: "schoolCountry is required",
    // }).min(1),
    // schoolState: string({
    //   required_error: "schoolState is required",
    // }).min(1),
    schoolContactPerson: string({
      required_error: "schoolContactPerson is required",
    }).min(1),
    // schoolContactPhoneNumber: string({
    //   required_error: "schoolContactPhoneNumber is required",
    // }).min(1),
    schoolEmail: string({
      required_error: "Email is required",
    })
      .email("Not a valid")
      .min(1),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short- should be at least 6 characters"),
    passwordConfirm: string({
      required_error: "PasswordConfirm is required",
    }),
    // isEmailVerified: boolean().default(false).nullable(),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Password and PasswordConfirm should be same",
    path: ["passwordConfirm"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSchoolSchema),
  });
  React.useEffect(() => {
    // console.log(errors);
  }, [errors]);
  const submitSchoolForm = (data: any) => {
    // // console.log("form about to go");
    // // console.log(data);
    setFormErrorMessage("");
    setLoading(true);
    setDefaultFormErrors({
      schoolCountryError: false,
      schoolStateError: false,
      schoolPhoneNumberError: "",
    });
    // phoneNumber;
    // countrySelected;
    // stateSelected;
    if (phoneNumber !== undefined) {
      if (isValidPhoneNumber(phoneNumber)) {
        // console.log("phone number is valid");
      } else {
        setLoading(false);
        setDefaultFormErrors({
          ...defaultFormErrors,
          schoolPhoneNumberError: "Invalid Phone Number",
        });
        return;
      }
    } else {
      setLoading(false);
      setDefaultFormErrors({
        ...defaultFormErrors,
        schoolPhoneNumberError: "Phone Number is required",
      });
      return;
    }

    if (countrySelected === "") {
      setLoading(false);
      // console.log("country");
      // console.log(countrySelected);
      setDefaultFormErrors({ ...defaultFormErrors, schoolCountryError: true });
      return;
    }
    if (stateSelected === "") {
      setLoading(false);
      // console.log("state");
      // console.log(stateSelected);
      setDefaultFormErrors({ ...defaultFormErrors, schoolStateError: true });
      return;
    }
    // console.log("Everything soft");

    const formData = {
      ...data,
      schoolCountry: countrySelected,
      schoolState: stateSelected,
      schoolContactPhoneNumber: phoneNumber,
    };

    try {
      axios
        .post(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/schools`,
          formData
        )
        .then((res) => {
          // console.log(res);

          if (res.data.statusCode === 409) {
            setLoading(false);
            setFormErrorMessage(res.data.message);
          }

          if (res.data.statusCode === 200) {
            setLoading(false);
            // console.log("Success");
            navigate("/signup/success");
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
      <div className="signUpPage">
        <div
          className="containerLeft signUpLeft"
          style={{
            textAlign: "right",
            width: "600px",
            flex: "0.5",
            borderRadius: "10px",
          }}
        >
          <img src={face8} alt="logo" className="face8" width="100%" />
        </div>
        <div className="signUpContainer" ref={loginRef}>
          <div className="loginContainerImg">
            <img
              src={logoMainImg}
              alt="logo"
              className="logoMainImg"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </div>
          <div className="signUpContainerChild">
            <input
              name="usertype"
              value={userType}
              hidden
              style={{ opacity: "0" }}
              type="text"
            />
            <div className="userTypeControls" style={{ marginTop: "30px" }}>
              <p
                className={userType === "Student" ? "active" : ""}
                onClick={() => setUserType("Student")}
              >
                Register as a Student
              </p>
              <p
                className={userType === "School" ? "active" : ""}
                onClick={() => setUserType("School")}
              >
                Register as a School
              </p>
            </div>
            {/* STUDENT FORM */}
            {userType === "Student" && (
              <StudentSignUpForm
                startDate={startDate}
                handleDateChange={handleDateChange}
              />
            )}

            {/* SCHOOL FORM */}
            {userType === "School" && (
              <form
                className="schoolSignUp"
                onSubmit={handleSubmit(submitSchoolForm)}
              >
                <div className="form-group">
                  <input
                    {...register("schoolName")}
                    type="text"
                    className="form-control"
                    id="nameOfSchool"
                    aria-describedby="emailHelp"
                    placeholder="Name of School"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-group" style={{ marginTop: "10px" }}>
                  <input
                    {...register("schoolAddress")}
                    type="text"
                    className="form-control"
                    id="schoolAddress"
                    placeholder="School Address (Optional)"
                    required={false}
                    autoComplete="off"
                  />
                </div>
                <div
                  className="form-group"
                  style={{ marginTop: "10px", padding: "12px 0" }}
                >
                  <input
                    {...register("schoolEmail")}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="School Email Address"
                    required
                    autoComplete="off"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <FormControl
                    fullWidth
                    style={{
                      background: "#FAFAFA",
                      width: "100%",
                      height: "50px",
                      marginTop: "10px",
                      overflow: "hidden",
                      borderRadius: "5px",
                      flex: "1",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
                    <Select
                      sx={{
                        input: { backgroundColor: "#fff", padding: "12px" },
                      }}
                      style={{ borderRadius: "5px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={countrySelected}
                      label="Age"
                      onChange={(e: SelectChangeEvent) => {
                        // console.log(e.target.value);
                        setCountrySelected(e.target.value);
                        setDefaultFormErrors({
                          ...defaultFormErrors,
                          schoolCountryError: false,
                        });
                      }}
                      className="form-group"
                    >
                      {allCountries.map((country: any) => (
                        <MenuItem
                          key={country.isoCode}
                          value={country.name}
                          onClick={() => setCountrySelectedIso(country.isoCode)}
                        >
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <input
                    type={"hidden"}
                    value={phoneNumber}
                    {...register("schoolCountry")}
                  />
                  {defaultFormErrors.schoolCountryError && (
                    <p
                      style={{
                        color: "crimson",
                        fontSize: "10px",
                      }}
                    >
                      School Country is required
                    </p>
                  )}
                  <FormControl
                    fullWidth
                    style={{
                      background: "#FAFAFA",
                      width: "100%",
                      height: "50px",
                      marginTop: "10px",
                      overflow: "hidden",
                      borderRadius: "5px",
                      flex: "1",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      sx={{
                        input: { backgroundColor: "#fff", padding: "12px" },
                      }}
                      style={{ borderRadius: "5px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={stateSelected}
                      label="Age"
                      onChange={(e: SelectChangeEvent) => {
                        // console.log(e.target.value);
                        setStateSelected(e.target.value);
                        setDefaultFormErrors({
                          ...defaultFormErrors,
                          schoolStateError: false,
                        });
                      }}
                      className="form-group"
                    >
                      {statesFromSelectedCountry.map((state: any) => (
                        <MenuItem key={state.name} value={state.name}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <input
                    type={"hidden"}
                    value={phoneNumber}
                    {...register("schoolState")}
                  />
                  {defaultFormErrors.schoolStateError && (
                    <p
                      style={{
                        color: "crimson",
                        fontSize: "10px",
                      }}
                    >
                      School State is required
                    </p>
                  )}
                </div>

                <div
                  className="form-group"
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <input
                    {...register("schoolContactPerson")}
                    type="text"
                    className="form-control"
                    id="exampleInputcontactPerson1"
                    aria-describedby="schoolContactPerson"
                    placeholder="School Contact Name"
                    required
                    autoComplete="off"
                    style={{ flex: "0.5" }}
                  />
                  <div
                    style={
                      phoneNoError
                        ? { flex: "0.5", background: "#fff" }
                        : { flex: "0.5", background: "#fff" }
                    }
                  >
                    <PhoneInput
                      placeholder="Enter phone number"
                      addInternationalOption={false}
                      // flagComponent={() => <div style={{marginTop: '-7px'}}>
                      //   <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${currentSelectedCountry}.svg`} />
                      // </div>}
                      countryCallingCodeEditable={false}
                      // international
                      value={phoneNumber}
                      onChange={(e: any | undefined) => {
                        // console.log("onChange");
                        // console.log(e);
                        setDefaultFormErrors({
                          ...defaultFormErrors,
                          schoolPhoneNumberError: "",
                        });
                        setPhoneNumber(e);
                      }}
                    />
                    <input type={"hidden"} value={phoneNumber} />
                    {defaultFormErrors.schoolPhoneNumberError !== "" && (
                      <p
                        style={{
                          color: "crimson",
                          fontSize: "10px",
                        }}
                      >
                        {defaultFormErrors.schoolPhoneNumberError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: "20px" }}>
                  <input
                    {...register("password")}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    aria-describedby="emailHelp"
                    placeholder="Password"
                    required
                    autoComplete="off"
                    minLength={6}
                  />
                  <p style={{ fontSize: "12px", color: "crimson" }}>
                    {" "}
                    {errors.password && errors.password.message}{" "}
                  </p>
                  <p style={{ fontSize: "12px", color: "crimson" }}></p>
                </div>
                <div className="form-group" style={{ marginTop: "20px" }}>
                  <input
                    {...register("passwordConfirm")}
                    type="password"
                    className="form-control"
                    id="exampleInputConfirmPassword1"
                    aria-describedby="emailHelp"
                    placeholder="Confirm Password"
                    required
                    autoComplete="off"
                    minLength={6}
                  />
                  <p style={{ fontSize: "12px", color: "crimson" }}>
                    {" "}
                    {errors.passwordConfirm &&
                      errors.passwordConfirm.message}{" "}
                  </p>
                </div>

                <div style={{ textAlign: "center", marginTop: "40px" }}>
                  <button className="login_submit_button" type="submit">
                    {loading ? (
                      <CircularProgress style={{ color: "#333" }} size={24} />
                    ) : (
                      "SIGN UP"
                    )}
                  </button>
                  <p style={{ color: "crimson", fontSize: "12px" }}>
                    {" "}
                    {formErrorMessage !== "" && formErrorMessage}
                  </p>

                  <div className="login_forgot_password">
                    <Link to="/login" className="sign_up_text">
                      Click here to Login
                    </Link>
                  </div>
                </div>
              </form>
            )}
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

export default SignUp;
