import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../../../components/Dashboard/status-card/StatusCard";

import Table from "../../../components/Dashboard/table/Table";

import Badge from "../../../components/Dashboard/badge/Badge";

import statusCards from "../../../assets/JsonData/status-card-data-school.json";
import TestProgressCard from "../../../components/Dashboard/test-progress-card/StatusCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TOTAL_TEST_QUESTIONS = 48;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const profileBar = {
    width: 250,
    percent: 0.8,
  };
  const latestOrdersHead = {
    header: ["UserId", "TypeOfActivity", "date", "time", "status"],
  };
  const orderStatus = {
    shipping: "primary",
    pending: "warning",
    paid: "success",
    refund: "danger",
  };
  const renderOrderHead = (item, index) => <th key={index}>{item}</th>;
  const renderOrderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.user}</td>
      <td>{item.price}</td>
      <td>{item.date}</td>
      <td>
        <Badge type={orderStatus[item.status]} content={item.status} />
      </td>
    </tr>
  );
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date().toLocaleDateString("en-US", options);
  const [latestOrdersBody, setLatestOrdersBody] = useState([
    {
      id: "#OD1711",
      user: "john doe",
      price: "17 Jun 2021",
      date: "$900",
      status: "shipping",
    },
  ]); 
  const [schoolDashboardDetails, setSchoolDashboardDetails] = useState([
    0,
    0,
    0,
    date.toString(),
  ]);
  const [finalTestResults, setFinalTestResults] = useState([
    10, 10, 10, 10, 10, 10,
  ]);  
 
  const searchCareer = (searchValue) => {
    const newWindow = window.open(
      "https://www.bing.com/search?q=" + searchValue,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    const getSchoolDashboardDetails = async () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/school/getSchoolDashboardDetails/${accessToken}`,
            { withCredentials: true }
          )
          .then((res) => {
            if (res.status === 403) {
              console.log(res);
              // navigate("/login");
            }
            if (
              res.data.statusCode === 409 ||
              res.data.statusCode === 401 ||
              res.data.statusCode === 400
            ) {
              // console.log(res.data.message);
            }

            if (res.data) {
              // console.log(res.data);
              const {
                allStudentsUnderSchool,
                resolvedStudentsWithCompletedTest,
                resolvedStudentsWithBookedCounsellor,
              } = res.data;
              setSchoolDashboardDetails([
                resolvedStudentsWithCompletedTest,
                allStudentsUnderSchool,
                resolvedStudentsWithBookedCounsellor,
                schoolDashboardDetails[3],
              ]);
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
        // console.log(error && error.message);
      }
    };
    const getLatestActivity = async () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/data/getLatestSchoolActivity/${accessToken}`,
            { withCredentials: true }
          )
          .then((res) => {
            if (res.status === 403) {
              console.log(res);
              // navigate("/login");
            }
            if (
              res.data.statusCode === 409 ||
              res.data.statusCode === 401 ||
              res.data.statusCode === 400
            ) {
              // console.log(res.data.message);
            }

            if (res.data) {
          
              const latestActivity = res.data.latestActivity;
              const latestActivityBody = latestActivity.map((item, index) => {
                return {
                  id: item.userId,
                  user: item.typeOfLastActivity,
                  price: new Date(item.dateOfLastActivity).toLocaleDateString(
                    "en-US",
                    options
                  ),
                  date: item.timeOfLastActivity,
                  status:
                    item.typeOfLastActivity === "LOGIN" ? "shipping" : "paid",
                };
              });
              // // console.log("getLatestActivity function");
              // // console.log(latestActivity);
              // // console.log(latestActivityBody);
              setLatestOrdersBody([...latestActivityBody]);
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
        // console.log(error && error.message);
      }
    };

    getLatestActivity();
    getSchoolDashboardDetails();
  }, []);
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {/* <TestProgressCard props={progressBar} title={"Test Progress"} />
              <TestProgressCard props={profileBar} title={"Profile Progress"} /> */}
            </div>
            {statusCards.map((item, index) => (
              <div
                className="col-6"
                key={index}
                style={{ position: "relative", zIndex: "9000" }}
              >
                <StatusCard
                  icon={item.icon}
                  count={schoolDashboardDetails[index]}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="col-6" style={{ position: "relative", zIndex: "90" }}>
          {!isTestCompleted &&  (
            <div
              style={{
                position: "absolute",
                padding: "25px",
                top: "0",
                left: "0",
                zIndex: "91",
                fontSize: "15px",
                textAlign: "center",
                background: "rgba(240,240,240,0.7)",
                width: "100%",
                height: "100%",
                color: "#62b4ff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Please complete test to view.
            </div>
          )}
          <div className="card full-height">
            
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="bar"
              height="100%"
            />
          </div>
        </div> */}

        <div className="col-6">
          <div className="card">
            <div className="card__header">
              <h3>latest activity</h3>
            </div>
            <div className="card__body tweaked_card">
              {/* <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrdersBody}
                limit={100}
                renderBody={(item, index) => renderOrderBody(item, index)}
              /> */}
              {latestOrdersHead.header.map((item, index) =>
                renderOrderHead(item, index)
              )}
              {latestOrdersBody.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id.slice(18)}</td>
                    <td>{item.user}</td>
                    <td>{item.price}</td>
                    <td>{item.date}</td>
                    <td>
                      <Badge
                        type={orderStatus[item.status]}
                        content={item.status}
                      />
                    </td>
                  </tr>
                );
              })}
            </div>
            {/* <div className="card__footer">
              <Link to="/">view all</Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
