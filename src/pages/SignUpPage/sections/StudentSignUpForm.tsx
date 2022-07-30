import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { boolean, date, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
interface ISignUpInterface {
  startDate: Date | MaterialUiPickersDate;
  handleDateChange: (date: MaterialUiPickersDate) => void;
}

function StudentSignUpForm({ handleDateChange, startDate }: ISignUpInterface) {

  const navigate = useNavigate();
  const createStudentSchema = object({
    fullName: string({
      required_error: "Name is required",
    }).min(1),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short- should be at least 6 characters"),
    passwordConfirm: string({
      required_error: "PasswordConfirm is required",
    }),
    // school: string({
    //   required_error: "School is required",
    // }), check school before sending form
    // dateOfBirth: date().nullable(),

    email: string({
      required_error: "Email is required",
    })
      .email("Not a valid email")
      .min(1),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Password and PasswordConfirm should be same",
    path: ["passwordConfirm"],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createStudentSchema),
  });

  const [schoolInputError, setSchoolInputError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [schoolsArray, setSchoolsArray] = useState([]);
  const [schoolValue, setSchoolValue] = useState("");
  const [classValue, setClassValue] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log(errors);
  }, [errors]);

  useEffect(() => {
    const getAllSchools = () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/schools/getschools`)
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
              // console.log(res.data.schools)
              setSchoolsArray(res.data.schools);
            }
          });
      } catch (error: any) {
        // console.log("error");
        setLoading(false);
        // console.log(error && error.message);
      }
    }; // end of getAllSchools
    getAllSchools()
  }, [])

  const submitStudentForm = (data: any) => {
    // console.log("form submitted");
    setLoading(true)
    setSchoolInputError(false);
    setFormErrorMessage('')
    if (schoolValue === "") {
      setSchoolInputError(true);
       setLoading(false)
      return;
    } else {

      const studentForm = {
        ...data,
        school: schoolValue,
        class: classValue,
        dateOfBirth: startDate,
      }
      // console.log(studentForm)
       try {
         axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/students`, studentForm).then(res => {
            // console.log(res);

            if (res.data.statusCode === 409){
              setLoading(false)
              setFormErrorMessage(res.data.message)
            }

            if(res.data.statusCode === 200){
              setLoading(false)
              // console.log('Success')
              navigate('/signup/success');

            }
         });
       } catch (error:any) {
         // console.log('error')
         setLoading(false)
         // console.log(error && error.message)
       }
    }

  };
  return (
    <form className="studentSignUp" onSubmit={handleSubmit(submitStudentForm)}>
      {/* STUDENT FORM */}
      <div
        className="form-group"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <input
          type="text"
          className="form-control"
          id="firstName"
          aria-describedby="emailHelp"
          placeholder="Full Name"
          required
          autoComplete="off"
          {...register("fullName")}
        />
        <p style={{ fontSize: "12px", color: "crimson" }}>
          {/* {errors.fullName?.message} */}
        </p>
      </div>
      {/* <div className="form-group" style={{ marginTop: "10px" }}>
     
    </div> */}

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker"
          label=""
          value={startDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          style={{
            background: "#FAFAFA",
            width: "100%",
            padding: "12px",
            borderRadius: "5px",
          }}
        />
      </MuiPickersUtilsProvider>
          <div style={{display: 'flex', flexDirection: 'row'}}>

        
      <FormControl
        fullWidth 
        style={{
          background: "#FAFAFA",
          width: "100%",
          height: "50px",
          marginTop: "10px",
          overflow: "hidden",
          borderRadius: "5px",
        }}
      >
        <InputLabel id="demo-simple-select-label">
          School
          <strong style={{ color: "crimson", fontSize: "10px" }}>
            {" "}
            (Mandatory)
          </strong>
        </InputLabel>
        <Select
          sx={{ input: { backgroundColor: "#fff", padding: "12px" } }}
          style={{ borderRadius: "5px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={schoolValue}
          label="Age"
          onChange={(e: SelectChangeEvent) => setSchoolValue(e.target.value)}
          className="form-group"
        >
           {
              schoolsArray.map((school: any) => {
                return (
                  <MenuItem value={school._id} key={school.schoolName}>{school.schoolName}</MenuItem>
                )
              })
           }
          {/* <MenuItem value={"Sample School A"}>Sample School A</MenuItem> */}
        </Select>
      </FormControl>
      {schoolInputError && (
        <p style={{ fontSize: "12px", color: "crimson" }}>School is required</p>
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
        }}
      >
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          sx={{ input: { backgroundColor: "#fff", padding: "12px" } }}
          style={{ borderRadius: "5px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={classValue}
          label="Class"
          onChange={(e: SelectChangeEvent) => setClassValue(e.target.value)}
          className="form-group"
        >
          <MenuItem value={"JSS 1"}>JSS 1</MenuItem>
          <MenuItem value={"JSS 2"}>JSS 2</MenuItem>
          <MenuItem value={"JSS 3"}>JSS 3</MenuItem>
          <MenuItem value={"SSS 1"}>SSS 1</MenuItem>
          <MenuItem value={"SSS 2"}>SSS 2</MenuItem>
          <MenuItem value={"SSS 3"}>SSS 3</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div
        className="form-group"
        style={{ marginTop: "30px", padding: "12px 0" }}
      >
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email Address"
          required
          autoComplete="off"
          {...register("email")}
        />
        <p style={{ fontSize: "12px", color: "crimson" }}>
          {/* {errors.email?.message} */}
        </p>
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
          {errors.passwordConfirm && errors.passwordConfirm.message}{" "}
        </p>
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button className="login_submit_button" type="submit">
         { loading ? <CircularProgress style={{color: '#333'}} size={24} /> : 'SIGN UP'}
        </button>
        <div className="login_forgot_password">
          <Link to="/login" className="sign_up_text">
            Click here to Login
          </Link>
        </div>
      </div>
    <p style={{color: 'crimson', fontSize: '12px'}}>  {formErrorMessage !== '' && formErrorMessage}</p>
    </form>
  );
}

export default StudentSignUpForm;
