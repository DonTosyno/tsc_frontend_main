import React, { useState } from "react";
import { motion } from "framer-motion";
import face8 from "../../../assets/img/stock_images/face9.jpg";
import logoMainImg from "../../../assets/icons/TSC-plain.png";
import { Icon } from "ts-react-feather-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";

interface QuestionInterface {
  question: string;
  questionId: string;
  isAnswered: boolean;
  optionA: {
    text: string;
    isSelected: boolean;
  };
  optionB: {
    text: string;
    isSelected: boolean;
  };
  optionC: {
    text: string;
    isSelected: boolean;
  };
  optionD: {
    text: string;
    isSelected: boolean;
  };
  optionE: {
    text: string;
    isSelected: boolean;
  };
}

interface SingleQuestionInterface {
  questionId: number;
  answer: string;
  questionText: string;
  questionType: string;
}
interface CurrentQuestionInterface {
  questionId: number;
  questionText: string;
  questionType: string;
  answer: string;
}
interface NavbarProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOverflowHiddenState: React.Dispatch<React.SetStateAction<boolean>>;
  questions: SingleQuestionInterface[];
  currentQuestionDetails: CurrentQuestionInterface;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentQuestionDetails: React.Dispatch<
    React.SetStateAction<CurrentQuestionInterface>
  >;
  refresh: boolean;
}
function SampleTestModal({
  showModal,
  setShowModal,
  setOverflowHiddenState,
  questions,
  currentQuestionDetails,
  setCurrentQuestionDetails,
  setRefresh,
  refresh,
}: NavbarProps) {
  const TOTAL_QUESTION_LENGTH = 48;
  const accessToken = localStorage.getItem("accessToken");
  const [isTestStarted, setIsTestStarted] = useState(true);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [nextQuestionAllowedToSubmit, setNextQuestionAllowedToSubmit] =
    useState(true);
  const [questionsInModal, setQuestionsInModal] = useState<
    CurrentQuestionInterface[]
  >([...questions]);
  const [questionDetailsInState, setQuestionDetailsInState] =
    useState<CurrentQuestionInterface>({
      questionId: currentQuestionDetails.questionId,
      questionText: currentQuestionDetails.questionText,
      answer: currentQuestionDetails.answer,
      questionType: currentQuestionDetails.questionType,
    });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const percentValue = Math.floor(
    ((questionDetailsInState.questionId - 1) * 100) / TOTAL_QUESTION_LENGTH
  );
  const [optionsObject, setOptionsObject] = useState({
    optionA: {
      text: "Strongly Dislike",
      isSelected: false,
    },
    optionB: {
      text: "Dislike",
      isSelected: false,
    },
    optionC: {
      text: "Neither Like Nor Dislike",
      isSelected: false,
    },
    optionD: {
      text: "Like",
      isSelected: false,
    },
    optionE: {
      text: "Strongly Like",
      isSelected: false,
    },
  });
  const navigate = useNavigate();
  const startTest = (): void => {
    setIsTestStarted(true);
    setIsTestFinished(false);
    if (questions.length === 0) {
      setCurrentQuestion(0);
    }
  };

  const goToResults = () => {
    navigate("/dashboard/result");
  };

  const updatedTestCompletedToTrue = async () => {
    // setIsTestFinished(true);
    // setIsTestStarted(false);
    if (!accessToken){
      navigate('/login')
    } else {
      try {
        axios
          .post(
            `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/submitTest/`+accessToken,
            {},
            { withCredentials: true }
          )
          .then((res: any) => {
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
              // // console.log("submitTest function ");
              const { psychTest, currentQuestionDetails: detailsFromResponse } =
                res.data;
              // // console.log(res.data)
              if (psychTest) {
                // // console.log(psychTest);
                // // console.log(psychTest.questions.length);
                setQuestionsInModal(psychTest.questions);
                if (psychTest.isTestCompleted) {
                  // // console.log("completed questions");
                  setIsTestFinished(true);
                  setIsTestStarted(false);
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
        console.log("error");
        console.log(error);
      }
    }
   
  }
  const getUserResult = async () => {
    if (!accessToken){
      navigate('/login')
    } else {
    try {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/getUserResult/`+accessToken,
          { withCredentials: true }
        )
        .then((res: any) => {
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
            const { psychTest, currentQuestionDetails: detailsFromResponse } =
              res.data;

            if (psychTest) {
              // // console.log(psychTest);
              // // console.log(psychTest.questions.length);
              setQuestionsInModal(psychTest.questions);
              if (psychTest.isTestCompleted) {
                // // console.log("completed questions");
                setIsTestFinished(true);
                setIsTestStarted(false);
              }
            }
            if (detailsFromResponse) {
              // // console.log(detailsFromResponse);
              setQuestionDetailsInState(detailsFromResponse);
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
  }
  };
  const getPreviousQuestions = async () => {
    setNextQuestionAllowedToSubmit(false);
    // // console.log(questionsInModal);
    // // console.log(questionDetailsInState);
    setOptionsObject({
      optionA: {
        text: "Strongly Dislike",
        isSelected:
          questionsInModal[questionDetailsInState.questionId - 2].answer ===
          "Strongly Dislike",
      },
      optionB: {
        text: "Dislike",
        isSelected:
          questionsInModal[questionDetailsInState.questionId - 2].answer ===
          "Dislike",
      },
      optionC: {
        text: "Neither Like Nor Dislike",
        isSelected:
          questionsInModal[questionDetailsInState.questionId - 2].answer ===
          "Neither Like Nor Dislike",
      },
      optionD: {
        text: "Like",
        isSelected:
          questionsInModal[questionDetailsInState.questionId - 2].answer ===
          "Like",
      },
      optionE: {
        text: "Strongly Like",
        isSelected:
          questionsInModal[questionDetailsInState.questionId - 2].answer ===
          "Strongly Like",
      },
    });

    setQuestionDetailsInState({
      questionId:
        questionsInModal[questionDetailsInState.questionId - 2].questionId ||
        100,
      questionText:
        questionsInModal[questionDetailsInState.questionId - 2].questionText ||
        "",
      answer:
        questionsInModal[questionDetailsInState.questionId - 2].answer || "",
      questionType:
        questionsInModal[questionDetailsInState.questionId - 2].questionType ||
        "",
    });
  };

  const updateQuestions = async (value: string) => {
    // // console.log(questionDetailsInState)
    const isNextQuestionAnswered = questionsInModal.filter(
      (question) =>
        question.questionId === questionDetailsInState.questionId + 1
    );
    // // console.log(isNextQuestionAnswered);
    if (isNextQuestionAnswered.length > 0) {
      setQuestionDetailsInState({
        questionId: isNextQuestionAnswered[0].questionId,
        questionText: isNextQuestionAnswered[0].questionText,
        answer: isNextQuestionAnswered[0].answer,
        questionType: isNextQuestionAnswered[0].questionType,
      });
      setOptionsObject({
        optionA: {
          text: "Strongly Dislike",
          isSelected: isNextQuestionAnswered[0].answer === "Strongly Dislike",
        },
        optionB: {
          text: "Dislike",
          isSelected: isNextQuestionAnswered[0].answer === "Dislike",
        },
        optionC: {
          text: "Neither Like Nor Dislike",
          isSelected:
            isNextQuestionAnswered[0].answer === "Neither Like Nor Dislike",
        },
        optionD: {
          text: "Like",
          isSelected: isNextQuestionAnswered[0].answer === "Like",
        },
        optionE: {
          text: "Strongly Like",
          isSelected: isNextQuestionAnswered[0].answer === "Strongly Like",
        },
      });
      setNextQuestionAllowedToSubmit(false);
    } else if (isNextQuestionAnswered.length === 0) {
      if (nextQuestionAllowedToSubmit) {
        // // console.log("submit now");
        if (!accessToken){
          navigate('/login')
        } else {
        try {
          axios
            .post(
              `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/updateUserTest/`+ accessToken,
              {
                ...questionDetailsInState,
                answer: value,
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
                 navigate("/login");
                // // console.log(res.data.message);
              }

              if (res.data) {
                // // console.log("updateQuestions function");
                // // console.log(res.data);
                // setRefresh(!refresh);
                getUserResult();
                setOptionsObject({
                  optionA: {
                    text: "Strongly Dislike",
                    isSelected: false,
                  },
                  optionB: {
                    text: "Dislike",
                    isSelected: false,
                  },
                  optionC: {
                    text: "Neither Like Nor Dislike",
                    isSelected: false,
                  },
                  optionD: {
                    text: "Like",
                    isSelected: false,
                  },
                  optionE: {
                    text: "Strongly Like",
                    isSelected: false,
                  },
                });

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
      } else {
        setNextQuestionAllowedToSubmit(true);
        getUserResult();
        // setQuestionDetailsInState({
        //   questionId:questions[questionDetailsInState.questionId + 1].questionId,
        //   questionText: questions[questionDetailsInState.questionId + 1].questionText,
        //   answer: questions[questionDetailsInState.questionId + 1].answer,
        //   questionType: questions[questionDetailsInState.questionId + 1].questionType,
        // });
        setOptionsObject({
          optionA: {
            text: "Strongly Dislike",
            isSelected: false,
          },
          optionB: {
            text: "Dislike",
            isSelected: false,
          },
          optionC: {
            text: "Neither Like Nor Dislike",
            isSelected: false,
          },
          optionD: {
            text: "Like",
            isSelected: false,
          },
          optionE: {
            text: "Strongly Like",
            isSelected: false,
          },
        });
      }
    }
  };
  const handleSubmitQuestion = () => {
    const options = [Object.values(optionsObject)];
    const selectedValue = options[0].filter(
      (option) => option.isSelected === true
    )[0];
    // // console.log(selectedValue);

    if (selectedValue) {
      updateQuestions(selectedValue.text);
    } else {
      notifyMsg("Please select an option");
    }
  };

  const notifyMsg = (msg: string) => toast(msg);

  React.useEffect(() => {
    getUserResult();
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isTestStarted && !isTestFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(0,0,0, 0.75)",
              minHeight: "500px",
              minWidth: "400px",
              // width: "60%",
              height: "60%",
              display: "flex",
              flexDirection: "column",

              borderRadius: "15px",
              padding: "45px",
              paddingTop: "60px",
            }}
          >
            <div
              className="navbar_logo"
              style={{
                height: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* <img src={logoMainImg} alt="logo" height="100px" /> */}
              <p className="cancelSampleTestBtn">
                <div className="modalProgressBarContainer">
                  <div
                    className="modalProgressBar"
                    style={{ width: `${percentValue * 4}px` }}
                  ></div>
                </div>
                <p style={{ marginTop: "15px" }}>{percentValue}% complete</p>
              </p>
            </div>
            <div className="questionsBox">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="questionOptionsBox">
                  <p>{questionDetailsInState.questionText}</p>
                 {
                 questionsInModal.length <  TOTAL_QUESTION_LENGTH && (
<div>
                  <div
                    className="questionOptions"
                    onClick={() => {
                      setOptionsObject({
                        optionA: {
                          text: "Strongly Dislike",
                          isSelected: true,
                        },
                        optionB: {
                          text: "Dislike",
                          isSelected: false,
                        },
                        optionC: {
                          text: "Neither Like Nor Dislike",
                          isSelected: false,
                        },
                        optionD: {
                          text: "Like",
                          isSelected: false,
                        },
                        optionE: {
                          text: "Strongly Like",
                          isSelected: false,
                        },
                      });
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={optionsObject.optionA.isSelected}
                    />
                    <label> {optionsObject.optionA.text}</label>
                  </div>
                  <div
                    className="questionOptions"
                    onClick={() => {
                      setOptionsObject({
                        optionA: {
                          text: "Strongly Dislike",
                          isSelected: false,
                        },
                        optionB: {
                          text: "Dislike",
                          isSelected: true,
                        },
                        optionC: {
                          text: "Neither Like Nor Dislike",
                          isSelected: false,
                        },
                        optionD: {
                          text: "Like",
                          isSelected: false,
                        },
                        optionE: {
                          text: "Strongly Like",
                          isSelected: false,
                        },
                      });
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={optionsObject.optionB.isSelected}
                    />
                    <label> {optionsObject.optionB.text}</label>
                  </div>
                  <div
                    className="questionOptions"
                    onClick={() => {
                      setOptionsObject({
                        optionA: {
                          text: "Strongly Dislike",
                          isSelected: false,
                        },
                        optionB: {
                          text: "Dislike",
                          isSelected: false,
                        },
                        optionC: {
                          text: "Neither Like Nor Dislike",
                          isSelected: true,
                        },
                        optionD: {
                          text: "Like",
                          isSelected: false,
                        },
                        optionE: {
                          text: "Strongly Like",
                          isSelected: false,
                        },
                      });
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={optionsObject.optionC.isSelected}
                    />
                    <label> {optionsObject.optionC.text}</label>
                  </div>
                  <div
                    className="questionOptions"
                    onClick={() => {
                      setOptionsObject({
                        optionA: {
                          text: "Strongly Dislike",
                          isSelected: false,
                        },
                        optionB: {
                          text: "Dislike",
                          isSelected: false,
                        },
                        optionC: {
                          text: "Neither Like Nor Dislike",
                          isSelected: false,
                        },
                        optionD: {
                          text: "Like",
                          isSelected: true,
                        },
                        optionE: {
                          text: "Strongly Like",
                          isSelected: false,
                        },
                      });
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={optionsObject.optionD.isSelected}
                    />
                    <label> {optionsObject.optionD.text}</label>
                  </div>
                  <div
                    className="questionOptions"
                    onClick={() => {
                      setOptionsObject({
                        optionA: {
                          text: "Strongly Dislike",
                          isSelected: false,
                        },
                        optionB: {
                          text: "Dislike",
                          isSelected: false,
                        },
                        optionC: {
                          text: "Neither Like Nor Dislike",
                          isSelected: false,
                        },
                        optionD: {
                          text: "Like",
                          isSelected: false,
                        },
                        optionE: {
                          text: "Strongly Like",
                          isSelected: true,
                        },
                      });
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={optionsObject.optionE.isSelected}
                    />
                    <label> {optionsObject.optionE.text}</label>
                  </div>
                  

                  </div>
                  )
                 }  
                </div>
                <div className="sampleQuestionButtonControls">
                  {questionsInModal.length > 0 &&
                    questionDetailsInState.questionId > 1 && (
                      <button
                        className="login_submit_button"
                        onClick={() => {
                          getPreviousQuestions();
                          // setCurrentQuestion(index - 1);
                        }}
                      >
                        Previous
                      </button>
                    )}

                 { questionsInModal.length <  TOTAL_QUESTION_LENGTH && <button
                    className="login_submit_button"
                    onClick={() => {
                      handleSubmitQuestion();
                      //  setCurrentQuestion(index + 1)
                    }}
                  >
                    Next
                  </button>}

                  {questionsInModal.length >= TOTAL_QUESTION_LENGTH && (
                    <button
                      className="login_submit_button"
                      onClick={() => {
                        updatedTestCompletedToTrue() 
                      }}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </motion.div>
              );
            </div>
          </motion.div>
        )}
        {!isTestStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              !isTestStarted
                ? "sampleModalContainer"
                : "sampleModalContainer hidden"
            }
      
          >
           { !isTestFinished && <div className="containerLeft" data-aos="fade-right">
              <img src={face8} alt="face" />
            </div>}
            <div className="containerRight" style={{ flex: "1" }}>
              <div
                className="explore_section_right"
                style={{ width: "100%" }}
                data-aos="fade-left"
              >
                <p
                  className="cancelSampleTestBtn"
                  onClick={() => {
                    setShowModal(false);
                    setOverflowHiddenState(false);
                  }}
                  style={{
                    textAlign: "right",
                    marginRight: "20px",
                    marginTop: "20px",
                  }}
                >
                  <Icon name="delete" color="#fff" size={24} />
                </p>
                <div className="explore_section_right_content" >
                  {!isTestFinished ? (
                    <h2>
                      Go ahead,
                      <br /> Explore.
                    </h2>
                  ) : (
                    <h2>Test Completed</h2>
                  )}
                  <p style={{ width: "100%", marginLeft: "-30px" }}>
                    {isTestFinished
                      ? "You have Completed the Test."
                      : "Take the free assessment and uncover things you didn't know about yourself."}
                  </p>

                  <div className="explore_section_buttons">
                    <div
                      className="explore_section_buttons_link"
                      onClick={() => goToResults()}
                    >
                      {isTestFinished ? "Check Your Results" : "Start The Test"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default SampleTestModal;
