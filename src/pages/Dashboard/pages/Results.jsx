import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../../../components/Dashboard/status-card/StatusCard";

import Table from "../../../components/Dashboard/table/Table";

import Badge from "../../../components/Dashboard/badge/Badge";

import statusCards from "../../../assets/JsonData/status-card-data.json";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const topCustomers = {
  head: ["Profession", "Order", "average salary"],
  body: [
    {
      username: "john doe",
      order: "1",
      price: "$15,870",
    },
    {
      username: "frank iva",
      order: "1",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "1",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "1",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "1",
      price: "$8,840",
    },
  ],
};

// const renderCusomerHead = (item, index) => (
//     <th key={index}>{item}</th>
// )

// const renderCusomerBody = (item, index) => (
//     <tr key={index}>
//         <td>{item.username}</td>
//         <td>{item.order}</td>
//         <td>{item.price}</td>
//     </tr>
// )

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
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

const Results = () => {
  const TOTAL_TEST_QUESTIONS = 48;
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date().toLocaleDateString("en-US", dateOptions);
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const [psychQuestions, setPsychQuestions] = React.useState([]);
  const [finalTestResults, setFinalTestResults] = React.useState([
    14, 23, 21, 17, 15, 10,
  ]);

  const [isTestCompleted, setIsTestCompleted] = useState(false);
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

  const searchCareer = (searchValue) => {
    const newWindow = window.open(
      "https://www.bing.com/search?q=" + searchValue,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    const getUserResult = async () => {
      if (!accessToken) {
        navigate("/login");
      } else {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/getUserResult/${accessToken}`,
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
        // // console.log("error");
        // // console.log(error);
      }
      }
    };

    const getDashboardDetails = async () => {
      if (!accessToken) {
        navigate("/login");
      } else {
      try {
        axios
          .get(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/getUserResult/${accessToken}`,
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
                setPsychQuestions(psychTest.questions);
                setIsTestCompleted(psychTest.isTestCompleted);
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
        // // console.log("error");
        // // console.log(error && error.message);
      }
    }
    };
    getUserResult();
    getDashboardDetails();
  }, []);

  useEffect(() => {
    const getTemperaments = async () => {
      if (!accessToken) {
        navigate("/login");
      } else {
      try {
        axios
          .post(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/data/getTemperamentData/${accessToken}`,
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
                } else if (res.data && res.data.temperaments.temperament1) {
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
    }
    };
    getTemperaments();
  }, [temperamentNames]);
  const pieChartOptions = {
    series: [...finalTestResults],
    options: {
      chart: {
        type: "polarArea",
      },
      labels: [
        "Realistic",
        "Investigative",
        "Artistic",
        "Social",
        "Enterprising",
        "Conventional",
      ],

      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  const chartOptions = {
    series: [
      {
        name: "Test Results",
        data: [...finalTestResults],
      },
    ],
    options: {
      color: ["#6ab04c", "#2980b9"],

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
  return (
    <div>
      <h2 className="page-header">Results</h2>
      <div className="row">
        <div className="col-6" style={{ position: "relative", zIndex: "9000" }}>
          {psychQuestions.length !== TOTAL_TEST_QUESTIONS && (
            <div
              style={{
                position: "absolute",
                padding: "25px",
                top: "0",
                left: "16px",
                zIndex: "9100",
                fontSize: "15px",
                textAlign: "center",
                background: "rgba(240,240,240,0.7)",
                width: "95%",
                borderRadius: "15px",
                height: "90%",
                color: "#62b4ff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              .
            </div>
          )}
          <div className="card full-height" style={{ maxHeight: "70vh" }}>
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...pieChartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...pieChartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={pieChartOptions.series}
              type="polarArea"
              height="150%"
            />
          </div>
        </div>
        <div className="col-6" style={{ position: "relative", zIndex: "9000" }}>
          {psychQuestions.length !== TOTAL_TEST_QUESTIONS && (
            <div
              style={{
                position: "absolute",
                padding: "25px",
                top: "0",
                left: "16px",
                zIndex: "9100",
                fontSize: "15px",
                textAlign: "center",
                background: "rgba(240,240,240,0.7)",
                width: "95%",
                borderRadius: "15px",
                height: "90%",
                color: "#62b4ff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              .
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
        <div
          className="col-12"
          style={{ position: "relative", zIndex: "9000" }}
        >
          {!isTestCompleted && (
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
              .
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

              <div className="card__results-body" style={{display: "flex", flexDirection: "row"}}>
                <div>
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
                </div>

                <div>
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
        </div>
        {/* <div className="col-4"  style={{position: 'relative', zIndex: '9000'}}>
                {psychQuestions.length !== TOTAL_TEST_QUESTIONS &&  (
                  <div
                    style={{
                      position: "absolute",
                      padding: "25px",
                      top: "0",
                      left: "16px",
                      zIndex: "9100",
                      fontSize: "15px",
                      textAlign: "center",
                      background: "rgba(240,240,240,0.7)",
                      width: "95%",
                      borderRadius: '15px',
                      height: "97%",
                      color: '#62b4ff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    .
                  </div>
                )}
                    <div className="card">
                        <div className="card__header">
                            <h3>Profession Matches</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.body}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            />
                        </div>
                      
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default Results;
