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
      date: "",
      status: "shipping",
    },
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
  const [studentCareers, setStudentCareers] = useState([]);
  const [finalTestResults, setFinalTestResults] = useState([
    10, 10, 10, 10, 10, 10,
  ]);
  const [psychQuestions, setPsychQuestions] = useState([]);
  const [progressBar, setProgressBar] = useState({
    width: 250,
    percent: 0,
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
 
 
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row dashboardCardsContainer">
        <div className="col-6">
          <div className="row" style={{ width: "100%" }}>
            <div className="dashboardCardsMain">
              <TestProgressCard props={progressBar} title={"Test Progress"} />
              <TestProgressCard props={profileBar} title={"Profile Progress"} />
            </div>
            <div className="dashboardCardsMain">
              {statusCards.map((item, index) => (
                <div
                  className="col-6"
                  key={index}
                  style={{ position: "relative", zIndex: "9000" }}
                >
                  {index === 0 && !isTestCompleted && (
                    <div
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
                    ></div>
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
          {!isTestCompleted && (
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
                 {
                   studentCareers.map((career, index) => {
                    return <p onClick={() => searchCareer(career)}>{career}</p>
                  })  || []
                 }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-6">
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
              /> 
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
          
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
