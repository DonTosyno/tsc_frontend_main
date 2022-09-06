import React, {useState,useEffect} from 'react'

import Table from '../../../components/Dashboard/table/Table'
import AddSchoolModal from "../components/AddSchoolModal.jsx"
import customerList from '../../../assets/JsonData/school-list.json'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles.css";
const customerTableHead = [
    '',
    'school name',
    'email',
    'phone', 
    'Address', 
    'verification code',
    'status',
    
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.schoolName}</td>
        <td>{item.schoolEmail}</td>
        <td>{item.phoneNumber}</td>
        <td>{item.address}</td>
        <td>{item.verificationCode}</td>
        <td style={{color: item.isEmailVerified ? 'green' : '#FFD700', fontWeight: "bold"}}>{item.isEmailVerified ? 'Verified' : 'Pending'}</td>
    </tr>
)

const PendingSchools = () => {
      const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  const [schoolList, setSchoolList] = useState([])
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);

    useEffect(() => {
        const getPendingSchools = async () => {
          if (!accessToken) {
            navigate("/login");
          } else {
          try {
            axios
              .get(
                `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/admin/getPendingSchools/${accessToken}`,
                {},
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
                  console.log("getPendingSchools function ");
                  console.log(res.data);
                  setSchoolList(res.data.schools)
    
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
        if (!showAddSchoolModal){
              getPendingSchools();
        }
      
      }, [showAddSchoolModal]);
 
    const openAddSchoolModal = () => {
        setShowAddSchoolModal(true)
    }
    const closeAddSchoolModal = () => {
        setShowAddSchoolModal(false)
    }
    return (
        <div>
        {showAddSchoolModal && <AddSchoolModal closeAddSchoolModal={closeAddSchoolModal} />}
            <div className="admin_header">
            <h2 className="page-header">
                Schools
            </h2>
            <button className="admin_button" onClick={()=>openAddSchoolModal()}>Add Schools</button>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                           {schoolList.length > 0 ? <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={schoolList}
                                renderBody={(item, index) => renderBody(item, index)}
                            /> : <h2 style={{textAlign: "center"}}>No Registered Schools</h2>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PendingSchools
