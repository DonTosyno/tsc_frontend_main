import React, { useState } from "react";
import { motion } from "framer-motion";
import face9 from "../../assets/img/stock_images/face9.jpg";
import logoMainImg from "../../assets/icons/TSC-plain.png";
import { Icon } from "ts-react-feather-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./styles.css";

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

interface NavbarProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOverflowHiddenState: React.Dispatch<React.SetStateAction<boolean>>

}
function SampleTestModal({ showModal, setShowModal,setOverflowHiddenState }: NavbarProps) {
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const [questionsArray, setQuestionsArray] = useState<QuestionInterface[]>([
    {
      question: "Test the quality of parts before shipment",
      questionId: "1",
      isAnswered: false,
      optionA: {
        text: "Strongly dislike",
        isSelected: false,
      },
      optionB: {
        text: "Dislike",
        isSelected: false,
      },
      optionC: {
        text: "Neither like nor dislike",
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
    },
    
    {
      question: "Study the structure of the human body",
      isAnswered: false,
      questionId: "2",
      optionA: {
        text: "Strongly dislike",
        isSelected: false,
      },
      optionB: {
        text: "Dislike",
        isSelected: false,
      },
      optionC: {
        text: "Neither like nor dislike",
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
    },
    {
        question: "Conduct a musical choir",
        questionId: "3",
        isAnswered: false,
        optionA: {
          text: "Strongly dislike",
          isSelected: false,
        },
        optionB: {
          text: "Dislike",
          isSelected: false,
        },
        optionC: {
          text: "Neither like nor dislike",
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
      },
      {
        question: "Give career guidance to people",
        isAnswered: false,
        questionId: "4",
        optionA: {
          text: "Strongly dislike",
          isSelected: false,
        },
        optionB: {
          text: "Dislike",
          isSelected: false,
        },
        optionC: {
          text: "Neither like nor dislike",
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
      },
  ]);
  const notifyMsg = (msg: string) => toast(msg);
  const startTest = (): void => {
    if (isTestFinished) {
 navigate('/signup')
    } else {
      setIsTestStarted(true);
      setIsTestFinished(false)
    }
  
    
    // if (currentQuestion === questionsArray.length - 1) {
    //   setCurrentQuestion(0)
    //   navigate('/signup')
    // }
  };

  const handleOptionSelect = (optionText: string, questionId: string): void => {
    const newQuestionArray = questionsArray.map((newQ) => {
      if (newQ.questionId === questionId) {
          // // console.log('here :' + questionId + " " + newQ.questionId)
        switch (optionText) {
          case "Strongly dislike":
            return {
              ...newQ,
              optionA: {
                text: newQ.optionA.text,
                isSelected: true,
              },
              optionB: {
                text: newQ.optionB.text,
                isSelected: false,
              },
              optionC: {
                text: newQ.optionC.text,
                isSelected: false,
              },
              optionD: {
                text: newQ.optionD.text,
                isSelected: false,
              },
              optionE: {
                text: newQ.optionE.text,
                isSelected: false,
              },
            };
          case "Dislike":
            return {
              ...newQ,
              optionB: {
                text: newQ.optionB.text,
                isSelected: true,
              },
              optionA: {
                text: newQ.optionA.text,
                isSelected: false,
              },
              optionC: {
                text: newQ.optionC.text,
                isSelected: false,
              },
              optionD: {
                text: newQ.optionD.text,
                isSelected: false,
              },
              optionE: {
                text: newQ.optionE.text,
                isSelected: false,
              },
            };
          case "Neither like nor dislike":
            return {
              ...newQ,
              optionC: {
                text: newQ.optionC.text,
                isSelected: true,
              },
              optionA: {
                text: newQ.optionA.text,
                isSelected: false,
              },
              optionB: {
                text: newQ.optionB.text,
                isSelected: false,
              },
              optionD: {
                text: newQ.optionD.text,
                isSelected: false,
              },
              optionE: {
                text: newQ.optionE.text,
                isSelected: false,
              },
            };
          case "Like":
            return {
              ...newQ,
              optionD: {
                text: newQ.optionD.text,
                isSelected: true,
              },
              optionA: {
                text: newQ.optionA.text,
                isSelected: false,
              },
              optionC: {
                text: newQ.optionC.text,
                isSelected: false,
              },
              optionB: {
                text: newQ.optionB.text,
                isSelected: false,
              },
              optionE: {
                text: newQ.optionE.text,
                isSelected: false,
              },
            };
          case "Strongly Like":
            return {
              ...newQ,
              optionE: {
                text: newQ.optionE.text,
                isSelected: true,
              },
              optionA: {
                text: newQ.optionA.text,
                isSelected: false,
              },
              optionB: {
                text: newQ.optionB.text,
                isSelected: false,
              },
              optionD: {
                text: newQ.optionD.text,
                isSelected: false,
              },
              optionC: {
                text: newQ.optionC.text,
                isSelected: false,
              },
            };
          default:
              // // console.log('omo')
            return newQ;
        }
      } else {
        return newQ;
      }
    });

    setQuestionsArray(newQuestionArray);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
        zIndex: "9200",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {(isTestStarted && !isTestFinished) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: "rgba(0,0,0, 0.75)",
            minHeight: "500px",
            minWidth: "400px",
            width: "60%",
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
            <img src={logoMainImg} alt="logo" height="100px" />
            <p className="cancelSampleTestBtn" onClick={() => {setShowModal(false);setOverflowHiddenState(false)}}>
            <Icon name="delete" color="#fff" size={24} />
            </p>
          </div>
          <div className="questionsBox">
            {questionsArray.map((x, index) => {
              return (
                currentQuestion === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={index}
                  >
                    <div className="questionOptionsBox">
                      <p>{x.question}</p>
                      <div className="questionOptions" onClick={() =>
                            handleOptionSelect(x.optionA.text, x.questionId)
                          }>
                        <input type="checkbox" checked={x.optionA.isSelected} />
                        <label> {x.optionA.text}</label>
                      </div>
                      <div className="questionOptions" onClick={() =>
                            handleOptionSelect(x.optionB.text, x.questionId)
                          }>
                        <input
                          type="checkbox"
                          checked={x.optionB.isSelected}
                          
                        />
                        <label> {x.optionB.text}</label>
                      </div>
                      <div className="questionOptions" onClick={() =>
                            handleOptionSelect(x.optionC.text, x.questionId)
                          }>
                        <input type="checkbox" checked={x.optionC.isSelected} />
                        <label> {x.optionC.text}</label>
                      </div>
                      <div className="questionOptions" onClick={() =>
                            handleOptionSelect(x.optionD.text, x.questionId)
                          }>
                        <input type="checkbox" checked={x.optionD.isSelected} />
                        <label> {x.optionD.text}</label>
                      </div>
                      <div className="questionOptions" onClick={() =>
                            handleOptionSelect(x.optionE.text, x.questionId)
                          }>
                        <input type="checkbox" checked={x.optionE.isSelected} />
                        <label> {x.optionE.text}</label>
                      </div>
                    </div>
                    <div className="sampleQuestionButtonControls">
                      {index > 0 && (
                        <button
                          className="login_submit_button"
                          onClick={() => {
                            setCurrentQuestion(index - 1);
                          }}
                        >
                          Previous
                        </button>
                      )}

                      {index < questionsArray.length - 1 && (
                        <button
                          className="login_submit_button"
                          onClick={() => {
                              const currentQuestionOptions = questionsArray[index];
                              const optionValues = Object.values(currentQuestionOptions);
                              const optionValuesFiltered = optionValues.filter(x => x.isSelected);
                              
                              if (optionValuesFiltered.length === 0) { 
                                  notifyMsg('Please select an option')
                                
                              } else {
                                setCurrentQuestion(index + 1);
                              } 
                          }}
                        >
                          Next
                        </button>
                      )}

                      {index === questionsArray.length - 1 && (
                        <button
                          className="login_submit_button"
                          onClick={() => {
                            setIsTestFinished(true);
                            setIsTestStarted(false);
                            // // console.log(questionsArray);
                          }}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              );
            })}
          </div>
        </motion.div>
      )}
      {(!isTestStarted) && (
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
          <div className="containerLeft" data-aos="fade-right">
      
             
            <img
               src={face9}
               alt="face"
               // loading="eager"
               // className={`img_face${index + 1}`}
               // style={{
               //   position:
               //     index === 3 || index === 5 ? "relative" : "static",
               //   top: index === 5 || index === 5 ? "-10px" : "0px",
               //   left: index === 3 ? "23px" : index === 5 ? "3px" : "0px",
               //   transform:
               //     index === 3
               //       ? "scale(1.4)"
               //       : index === 5 || index === 7
               //       ? "scale(0.88)"
               //       : "scale(1)",
               //   zIndex:
               //     index === 3 || index === 5
               //       ? "2"
               //       : index === 7
               //       ? "1"
               //       : "0",
               // }} 
             /> 
       
          </div>
          <div className="containerRight" style={{flex: '1'}}>
            <div className="explore_section_right" style={{width: '100%'}} data-aos="fade-left">
            <p className="cancelSampleTestBtn" onClick={() => {setShowModal(false); setOverflowHiddenState(false)}} style={{textAlign: 'right', marginRight: '20px', marginTop: '20px'}}>
         
  <Icon name="delete" color="#fff" size={24} />
            </p>
              <div className="explore_section_right_content">
               {   !isTestFinished ? <h2>
                  Go ahead,
                  <br /> Explore.
                </h2> : <h2>Test Completed</h2>}
                <p style={{ width: "80%" }}>
            { isTestFinished ? "You have reached the end of the sample test." :"Get started now and uncover things you didn't know about yourself."}
                </p>

                <div className="explore_section_buttons">
                  <div
                    className="explore_section_buttons_link"
                    onClick={() => startTest()}
                  >
                    {isTestFinished ? 'Sign Up' :'Start The Test'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SampleTestModal;
