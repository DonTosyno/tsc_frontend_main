import React, {useState, useEffect} from 'react'

import Table from '../../../components/Dashboard/table/Table'

import customerList from '../../../assets/JsonData/customers-list.json'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import  SingleStudentModal  from '../components/SingleStudentModal'



const Customers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken");
     
    const [students , setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({});
    const customerTableHead = [
        '',
        'name',
        'email',
        'Personality',
        'Class',
        'Date of Birth',
        'Counselling Status',
        'Completed Test'
    ]
    // const renderHead = (item, index) => <th key={index}>{item}</th>

// const renderBody = (item, index) => (
//     <tr key={index}>
//         <td>{item.id}</td>
//         <td>{item.name}</td>
//         <td>{item.email}</td>
//         <td>{item.phone}</td>
//         <td>{item.total_orders}</td>
//         <td>{item.total_spend}</td>
//         <td>{item.location}</td>
//     </tr>
// );

useEffect(() => {
    const getAllStudents = async () => {
      if (!accessToken) {
        navigate("/login");
      } else { 
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/school/getAllStudents/${accessToken}`,
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
              // console.log("getall students function ");
              // console.log(res.data);
              setStudents(res.data.data);
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
    getAllStudents();
  }, []);
    return (
        <div style={{position: 'relative'}}>
        {
            showModal &&   <SingleStudentModal currentStudent={currentStudent} setShowModal={setShowModal} />
        }
     
           <div>
            <h2 className="page-header">
                Registered Students
            </h2>
            <div className="row">
                <div className="col-12" >
                    <div className="card " style={{overflowX: 'scroll', }}>
                        <div className="card__body schoolDashboardCard">
                        {
                            customerTableHead!== undefined &&  customerTableHead.map((item, index) => {return <th key={index}>{item}</th>})
            }
              {  students.map((item, index) => {
                return  <tr key={index} className="hoverable_item" onClick={() => {
                    setCurrentStudent(item)
                    setShowModal(true);
                    
                }}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.temperament}</td> 
                    <td>{item.class}</td>
                    <td>{new Date(item.dateofBirth).toDateString()}</td>
                    <td style={item.counsellingStatus === true ? {color: "crimson", fontWeight: "bold"}: {color: "seagreen", fontWeight: "bold"}}>{item.counsellingStatus === true ? 'Completed': 'Pending'}</td>
                    <td>{item.temperament !== "N/A" ? "Yes": "No"}</td>
                  </tr>
              })}
                            {/* <Table
                                limit='8'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={students}
                                renderBody={(item, index) => renderBody(item, index)}
                               
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        </div>
       
    )
}

export default Customers
