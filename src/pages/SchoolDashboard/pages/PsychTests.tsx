import React, { useState, useEffect } from "react";
import profileImg from "../../../assets/images/tuat.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SliderSection from "../../../components/Dashboard/SliderSection";
import SampleTestModal from "../../../components/Dashboard/SampleTestModal";

interface QuizProps {
  setStartQuiz: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CurrentQuestionInterface { 
  questionId:   number;
  questionText: string;
  questionType: string;
  answer: string;
 
}
function PsychTest() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [currentQuestionDetails, setCurrentQuestionDetails] = useState<CurrentQuestionInterface>({
      questionId: 0,
      questionText: '',
      questionType: '',
      answer: ''
  });
  const [setOverflowHidden, setOverflowHiddenState] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const getUserResult = async () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/api/student/getUserResult`+accessToken,
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
            // console.log("getUserResult function ");
            const { psychTest, currentQuestionDetails: detailsFromResponse } = res.data;
            if (detailsFromResponse){
              // console.log(detailsFromResponse)
              setCurrentQuestionDetails(detailsFromResponse);
            }
            if (psychTest) {
              // console.log(psychTest);
              setQuestions(psychTest.questions)
              if (psychTest.questions.length > 0) {
                setStartQuiz(true);
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
      // console.log(error);
    }
  };
 

  useEffect(() => {
    getUserResult();
    // console.log('currentQuestionDetails changed');
    // console.log(currentQuestionDetails)
  }, [refresh]);
  return (
    <div>
      {!startQuiz ? (
        <SliderSection setStartQuiz={setStartQuiz} />
      ) : (
        <SampleTestModal
          showModal={showModal}
          setShowModal={setShowModal}
          setOverflowHiddenState={setOverflowHiddenState}
          questions={questions}
          currentQuestionDetails={currentQuestionDetails}
          setRefresh={setRefresh}
          setCurrentQuestionDetails={setCurrentQuestionDetails}
          refresh={refresh}
        />
      )}
    </div>
  );
}

export default PsychTest;
