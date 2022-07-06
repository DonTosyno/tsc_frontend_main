import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../../../components/Dashboard/status-card/StatusCard";

import Table from "../../../components/Dashboard/table/Table";

import Badge from "../../../components/Dashboard/badge/Badge";

import statusCards from "../../../assets/JsonData/status-card-data.json";
import TestProgressCard from "../../../components/Dashboard/test-progress-card/StatusCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TOTAL_TEST_QUESTIONS = 48;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [isTestCompleted, setIsTestCompleted] = useState(false)
  const [temperamentNames, setTemperamentNames] = useState({
    firstTemperament: "",
    secondTemperament: "",
    thirdTemperament: "",
  });
  const [testResultControls, setTestResultControls] = useState("");
  const [temperamentOneData, setTemperamentOneData] = useState({});
  const [temperamentTwoData, setTemperamentTwoData] = useState({});
  const [temperamentThreeData, setTemperamentThreeData] = useState({});
  const [temperamentAndLastLogin, setTemperamentAndLastLogin] = useState([
    "N/A",
    date.toString(),
  ]);
  const [finalTestResults, setFinalTestResults] = useState([
    10, 10, 10, 10, 10, 10,
  ]);
  const [psychQuestions, setPsychQuestions] = useState([]);
  const [progressBar, setProgressBar] = useState({
    width: 450,
    percent: 0.5,
  });

  // CHART OPTIONS
  const chartOptions = {
    series: [
      {
        name: "Temperament Score",
        data: [...finalTestResults],
      },
    ],
    options: {
      color: ["#6ab04c"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Realistic",
          "Investigative",
          "Artistic",
          "Social",
          "Enterprising",
          "Conventional",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };
  const searchCareer = (searchValue) => {
    const newWindow = window.open(
      "https://www.bing.com/search?q=" + searchValue,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    const getDashboardDetails = async () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/getUserResult`,
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
              // // console.log("getDashboardDetails function ");

              const { psychTest } = res.data;
              if (psychTest) {
                setPsychQuestions(psychTest.questions)
                setIsTestCompleted(psychTest.isTestCompleted)
                setProgressBar({
                  ...progressBar,
                  percent: psychTest.questions.length / TOTAL_TEST_QUESTIONS,
                  width: 250,
                });
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
        // console.log(error && error.message);
      }
    };
    const getUserResult = async () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/getUserResult`,
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
              // // console.log("getUserResult function ");
              // // console.log(res.data);
              const { testResults, unsortedResults } = res.data;

              if (testResults && testResults.length > 0) {
                setFinalTestResults(unsortedResults);
                const firstTemperament = [
                  "Realistic",
                  "Investigative",
                  "Artistic",
                  "Social",
                  "Enterprising",
                  "Conventional",
                ].filter((item) => {
                  return item.charAt(0) === testResults[0].type.charAt(0);
                });
                const secondTemperament = [
                  "Realistic",
                  "Investigative",
                  "Artistic",
                  "Social",
                  "Enterprising",
                  "Conventional",
                ].filter((item) => {
                  return item.charAt(0) === testResults[1].type.charAt(0);
                });
                const thirdTemperament = [
                  "Realistic",
                  "Investigative",
                  "Artistic",
                  "Social",
                  "Enterprising",
                  "Conventional",
                ].filter((item) => {
                  return item.charAt(0) === testResults[2].type.charAt(0);
                });
                setTemperamentNames({
                  firstTemperament,
                  secondTemperament,
                  thirdTemperament,
                });
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
    };
    getDashboardDetails();
    getUserResult();
  }, []);

  useEffect(() => {
    const getTemperaments = async () => {
      try {
        axios
          .post(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/data/getTemperamentData`,
            {
              ...temperamentNames,
            },
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
              // // console.log("getTemperaments function ");
              // // console.log(res.data);
              if (res.data !== null) {
                if (
                  res.data.statusCode === 409 ||
                  res.data.statusCode === 401 ||
                  res.data.statusCode === 403 ||
                  res.status === 403
                ) {
                  // console.log(res.data.message);
                } else if (res.data && res.data.temperaments.temperament1){
                  setTestResultControls(
                    res.data.temperaments.temperament1.temperamentName
                  );
                  setTemperamentOneData(res.data.temperaments.temperament1);
                  setTemperamentTwoData(res.data.temperaments.temperament2);
                  setTemperamentThreeData(res.data.temperaments.temperament3);
                  setTemperamentAndLastLogin([
                    `${res.data.temperaments.temperament1.temperamentName.charAt(
                      0
                    )}${res.data.temperaments.temperament2.temperamentName.charAt(
                      0
                    )}${res.data.temperaments.temperament3.temperamentName.charAt(
                      0
                    )}`,
                    temperamentAndLastLogin[1],
                  ]);
                }
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
        // console.log(error && error.message);
      }
    };
    getTemperaments();
  }, [temperamentNames]);

  useEffect(() => {
    const getLatestActivity = async () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/data/getLatestActivity`,
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
  }, []);
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row dashboardCardsContainer">
        <div className="col-6">
          <div className="row">
            <div
            className="dashboardCardsMain" 
            >
              <TestProgressCard props={progressBar} title={"Test Progress"} />
              <TestProgressCard props={profileBar} title={"Profile Progress"} />
            </div>
            <div
            className="dashboardCardsMain" 
            >
            {statusCards.map((item, index) => (
              <div
                className="col-6"
                key={index}
                style={{ position: "relative", zIndex: "9000" }}
              >
                {index === 0 && (
                  !isTestCompleted && <div
                    style={{
                      position: "absolute",
                      padding: "20px",
                      top: "0",
                      left: "0",
                      zIndex: "9100",
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
                <StatusCard
                  icon={item.icon}
                  count={
                    index === 0
                      ? psychQuestions.length !== TOTAL_TEST_QUESTIONS
                        ? "N/A"
                        : temperamentAndLastLogin[0]
                      : temperamentAndLastLogin[1]
                  }
                  title={item.title}
                />
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="col-6" style={{ position: "relative", zIndex: "90" }}>
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
            {/* chart */}
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
        </div>
        <div className="col-6" style={{ position: "relative", zIndex: "9000" }}>
          {!isTestCompleted &&  (
            <div
              style={{
                position: "absolute",
                padding: "25px",
                top: "0",
                left: "0",
                zIndex: "9100",
                fontSize: "15px",
                textAlign: "center",
                background: "rgba(240,240,240,0.8)",
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
          <div className="card">
            <div className="card__header">
              <h2>Test Results Summary</h2>
            </div>
            <div className="card__results-summary tweaked_card">
              <div className="card__controls">
                <p
                  className={
                    testResultControls === temperamentOneData.temperamentName
                      ? "activeTemperament"
                      : ""
                  }
                  onClick={() =>
                    setTestResultControls(temperamentOneData.temperamentName)
                  }
                >
                  {temperamentOneData.temperamentName}
                </p>
                <p
                  className={
                    testResultControls === temperamentTwoData.temperamentName
                      ? "activeTemperament"
                      : ""
                  }
                  onClick={() =>
                    setTestResultControls(temperamentTwoData.temperamentName)
                  }
                >
                  {temperamentTwoData.temperamentName}
                </p>
                <p
                  className={
                    testResultControls === temperamentThreeData.temperamentName
                      ? "activeTemperament"
                      : ""
                  }
                  onClick={() =>
                    setTestResultControls(temperamentThreeData.temperamentName)
                  }
                >
                  {temperamentThreeData.temperamentName}
                </p>
              </div>

              <div className="card__results-body">
                <h3>{testResultControls}</h3>

                <ul>
                  <li>
                    {testResultControls === temperamentOneData.temperamentName
                      ? temperamentOneData.writeUp1
                      : testResultControls ===
                        temperamentTwoData.temperamentName
                      ? temperamentTwoData.writeUp1
                      : testResultControls ===
                        temperamentThreeData.temperamentName
                      ? temperamentThreeData.writeUp1
                      : ""}
                  </li>
                  <li>
                    {testResultControls === temperamentOneData.temperamentName
                      ? temperamentOneData.writeUp2
                      : testResultControls ===
                        temperamentTwoData.temperamentName
                      ? temperamentTwoData.writeUp2
                      : testResultControls ===
                        temperamentThreeData.temperamentName
                      ? temperamentThreeData.writeUp2
                      : ""}
                  </li>
                  <li>
                    {testResultControls === temperamentOneData.temperamentName
                      ? temperamentOneData.writeUp3
                      : testResultControls ===
                        temperamentTwoData.temperamentName
                      ? temperamentTwoData.writeUp3
                      : testResultControls ===
                        temperamentThreeData.temperamentName
                      ? temperamentThreeData.writeUp3
                      : ""}
                  </li>
                </ul>

                <h3>Top Career Matches</h3>
                <div
                  className="card__controls"
                  style={{ flexDirection: "row" }}
                >
                  <p
                    onClick={() =>
                      searchCareer(
                        testResultControls ===
                          temperamentOneData.temperamentName
                          ? temperamentOneData.careerMatch1
                          : testResultControls ===
                            temperamentTwoData.temperamentName
                          ? temperamentTwoData.careerMatch1
                          : testResultControls ===
                            temperamentThreeData.temperamentName
                          ? temperamentThreeData.careerMatch1
                          : ""
                      )
                    }
                  >
                    {testResultControls === temperamentOneData.temperamentName
                      ? temperamentOneData.careerMatch1
                      : testResultControls ===
                        temperamentTwoData.temperamentName
                      ? temperamentTwoData.careerMatch1
                      : testResultControls ===
                        temperamentThreeData.temperamentName
                      ? temperamentThreeData.careerMatch1
                      : ""}
                  </p>
                  <p
                    onClick={() =>
                      searchCareer(
                        testResultControls ===
                          temperamentOneData.temperamentName
                          ? temperamentOneData.careerMatch2
                          : testResultControls ===
                            temperamentTwoData.temperamentName
                          ? temperamentTwoData.careerMatch2
                          : testResultControls ===
                            temperamentThreeData.temperamentName
                          ? temperamentThreeData.careerMatch2
                          : ""
                      )
                    }
                  >
                    {testResultControls === temperamentOneData.temperamentName
                      ? temperamentOneData.careerMatch2
                      : testResultControls ===
                        temperamentTwoData.temperamentName
                      ? temperamentTwoData.careerMatch2
                      : testResultControls ===
                        temperamentThreeData.temperamentName
                      ? temperamentThreeData.careerMatch2
                      : ""}
                  </p>
                  <p
                    onClick={() =>
                      searchCareer(
                        testResultControls ===
                          temperamentOneData.temperamentName
                          ? temperamentOneData.careerMatch3
                          : testResultControls ===
                            temperamentTwoData.temperamentName
                          ? temperamentTwoData.careerMatch3
                          : testResultControls ===
                            temperamentThreeData.temperamentName
                          ? temperamentThreeData.careerMatch3
                          : ""
                      )
                    }
                  >
                    {" "}
                    {testResultControls === temperamentOneData.temperamentName
                      ? temperamentOneData.careerMatch3
                      : testResultControls ===
                        temperamentTwoData.temperamentName
                      ? temperamentTwoData.careerMatch3
                      : testResultControls ===
                        temperamentThreeData.temperamentName
                      ? temperamentThreeData.careerMatch3
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              {
                latestOrdersHead.header.map((item, index) => (
                  renderOrderHead(item, index)
                ))
              }
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
