import React, {useEffect} from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../../../components/Dashboard/status-card/StatusCard'

import Table from '../../../components/Dashboard/table/Table'

import Badge from '../../../components/Dashboard/badge/Badge'

import statusCards from '../../../assets/JsonData/status-card-data.json'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const topCustomers = {
    head: [
        'Profession', 
        'Order',
        'average salary'
    ],
    body: [
        {
            "username": "john doe",
            "order": "1",
            "price": "$15,870"
        },
        {
            "username": "frank iva",
            "order": "1",
            "price": "$12,251"
        },
        {
            "username": "anthony baker",
            "order": "1",
            "price": "$10,840"
        },
        {
            "username": "frank iva",
            "order": "1",
            "price": "$9,251"
        },
        {
            "username": "anthony baker",
            "order": "1",
            "price": "$8,840"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)

const latestOrders = {
    header: [
        "order id",
        "user",
        "total price",
        "date",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            user: "john doe",
            date: "17 Jun 2021",
            price: "$900",
            status: "shipping"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "pending"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "refund"
        }
    ]
}

const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)

const Results = () => {
    const TOTAL_TEST_QUESTIONS = 48;
    const themeReducer = useSelector(state => state.ThemeReducer.mode)
 
      const navigate = useNavigate();
         const accessToken = localStorage.getItem("accessToken");
       
  const location = useLocation();
  const [psychQuestions, setPsychQuestions] = React.useState([]);
    const [finalTestResults, setFinalTestResults] = React.useState([14, 23, 21, 17, 15, 10])
    useEffect(() => {
        const getUserResult = async () => {
          if (!accessToken) {
            navigate("/login");
          }
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
                    // console.log("getUserResult function ");
                    // console.log(res.data);
                    const { testResults, unsortedResults } = res.data;
                    
                    if (testResults && testResults.length > 0) {
                      setFinalTestResults(unsortedResults) 
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

          const getDashboardDetails = async () => {
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
                      setPsychQuestions(psychTest.questions)
                       
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
          getUserResult()
          getDashboardDetails()
    }, [])
    
const pieChartOptions =  {
          
    series: [...finalTestResults],
    options: {
      chart: {
        type: 'polarArea',
      },
      labels: [
        "Realistic",
        "Investigative",
        "Artistic",
        "Social",
        "Enterprising",
        "Conventional"
      ],

      stroke: {
        colors: ['#fff']
      },
      fill: {
        opacity: 0.8
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  
  
  };
const chartOptions = {
    series: [{
        name: 'Test Results',
        data: [...finalTestResults]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
     
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories:  [
                "Realistic",
                "Investigative",
                "Artistic",
                "Social",
                "Enterprising",
                "Conventional"
              ],
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}
    return (
        <div>
            <h2 className="page-header">Results</h2>
            <div className="row">
            <div className="col-6" style={{position: 'relative', zIndex: '9000'}}>
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
                      borderRadius: '15px',
                      height: "90%",
                      color: '#62b4ff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    .
                  </div>
                )}
                    <div className="card full-height" style={{maxHeight: '70vh'}}>
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...pieChartOptions.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...pieChartOptions.options,
                                theme: { mode: 'light'}
                            }}
                            series={pieChartOptions.series}
                            type='polarArea'
                            height='150%'

                        />
                    </div>
                </div>
                <div className="col-6"  style={{position: 'relative', zIndex: '9000'}}>
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
                      height: "90%",
                      color: '#62b4ff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    .
                  </div>
                )}
                    <div className="card full-height">
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions.options,
                                theme: { mode: 'light'}
                            }}
                            series={chartOptions.series}
                            type='bar'
                            height='100%'
                        />
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
                <div className="col-8"  style={{position: 'relative', zIndex: '9000'}}>
               
                  <div
                    style={{
                      position: "absolute",
                      padding: "25px",
                      top: "0",
                      left: "0",
                      zIndex: "9100",
                      fontSize: "15px",
                      textAlign: "center",
                      background: "rgba(240,240,240,0.7)",
                      width: "100%",
                      height: "100%",
                      color: '#62b4ff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    COMING SOON
                  </div>
               
                    <div className="card">
                        <div className="card__header">
                            <h3>University Matches</h3>
                        </div>
                        <div className="card__body">
                      
                            <Table
                                headData={latestOrders.header}
                                renderHead={(item, index) => renderOrderHead(item, index)}
                                bodyData={latestOrders.body}
                                renderBody={(item, index) => renderOrderBody(item, index)}
                            />
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results
