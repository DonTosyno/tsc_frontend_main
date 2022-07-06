import React, { useState, useEffect } from "react";

import Table from "../../../components/Dashboard/table/Table";

import customerList from "../../../assets/JsonData/customers-list.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Support = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [studentsNeedingSupport, setStudentsNeedingSupport] = useState([{}]);

  const customerTableHead = [
    "",
    "name",
    "email",
    "dateofBirth",
    "class",
    "counselling status",
    "location",
  ];
  
  // const renderHead = (item, index) => <th key={index}>{item}</th>;
  
  // const renderBody = (item, index) => (
  //   <tr key={index}>
  //     <td>{item.id}</td>
  //     <td>{item.name}</td>
  //     <td>{item.email}</td>
  //     <td>{item.dateofBirth}</td>
  //     <td>{item.class}</td>
  //     <td>{item.counsellingStatus}</td>
  //     <td>{item.location}</td>
  //   </tr>
  // );
  useEffect(() => {
    const getCounsellorSupportStudents = async () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/school/counselling`,
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
              // console.log("getCounsellorSupportStudents function ");
              // console.log(res.data.data);
              setStudentsNeedingSupport(res.data.data);
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
    getCounsellorSupportStudents();
  }, []);
  return (
    <div>
      <h2 className="page-header">Counselling Support</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
            {
              customerTableHead!== undefined &&  customerTableHead.map((item, index) => {return <th key={index}>{item}</th>})
            }
              {  studentsNeedingSupport.map((item, index) => {
                return  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{new Date(item.dateofBirth).toDateString()}</td>
                    <td>{item.class}</td>
                    <td style={item.counsellingStatus === true ? {color: "crimson", fontWeight: "bold"}: {color: "seagreen", fontWeight: "bold"}}>{item.counsellingStatus === true ? 'Completed': 'Pending'}</td>
                    <td>{item.location}</td>
                  </tr>
              })}
              {/* <Table
                limit='10'
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={studentsNeedingSupport}
                renderBody={(item, index) => renderBody(item, index)}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
