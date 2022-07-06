import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";
import Footer from "./sections/Footer";
import Navbar from "./sections/Navbar";
import logoMainImg from "../../assets/icons/TSC-plain.png";
function FAQ() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("");
  return (
    <>
      <motion.div
        animate={{
          x: "-100vw",
          animationDuration: "0.5",
          transition: { duration: 0.5 },
        }}
        initial={{ x: 0 }}
        exit={{ x: 0, animationDuration: "0.5", transition: { duration: 0.5 } }}
        style={{
           position: "absolute",
          top: "0",
          left: "0",
           width: "100%",
          height: "140%",
          background: "#333",
          zIndex: "9989",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="navbar_logo">
          <img src={logoMainImg} alt="logo" />
        </div>
      </motion.div>
      <Navbar />
      <div className="container" style={{ marginTop: "80px" }}>
        <h3>Questions about Career</h3>
        <hr />
      </div>
      <div className="container" style={{ marginBottom: "100px" }}>
        <div className="row">
          <div className="col-md-6">
            <div className="vstack">
              <div className="accordion" role="tablist" id="accordion-1">
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "career" ? "" : " collapsed"
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-1"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-1"
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "career" ? "" : "career"
                        )
                      }
                    >
                      What is a Career?
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse item-1 ${
                      activeTab === "career" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "career" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          A career describes an individual’s journey through
                          learning, work, and other aspects of life. The term
                          career has several meanings. It can be viewed from
                          different perspectives. It is a lifelong sequence of
                          jobs. It is a sequence of positions that a person has
                          held over has or will take in their life.
                          (iEduNote.com)
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "counselling" ? "" : " collapsed"
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-2"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-2"
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "counselling" ? "" : "counselling"
                        )
                      }
                    >
                      What is Counselling?{" "}
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "scroll" }}
                    className={`accordion-collapse collapse item-2 ${
                      activeTab === "counselling" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "counselling" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Counselling is the application of mental health,
                          psychological or human development principles, through
                          cognitive, affective, behavioural or systemic
                          interventions, strategies that address wellness,
                          personal growth, or career development, as well as
                          pathology.
                          <br />
                          <br />
                          <em>
                            <span style={{ textDecoration: "underline" }}>
                              (http://counseling. org)
                            </span>
                          </em>
                          <br />
                          <br />
                          Counselling deals with wellness, personal growth,
                          career, and pathological concerns. In other words,
                          counsellors work in areas that involve relationships
                          (Casey, 1996). These areas include intra- and
                          interpersonal concerns related to finding meaning and
                          adjustment in such settings as&nbsp;schools, families,
                          and careers.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-3"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-3"
                      className={`accordion-button${
                        activeTab === "careerCounselling" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerCounselling"
                            ? ""
                            : "careerCounselling"
                        )
                      }
                    >
                      What is Career Counselling?{" "}
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-3 ${
                      activeTab === "careerCounselling" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerCounselling" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career counselling is getting the right guidance to
                          help you make the career decisions you need to make
                          now, but to give you the knowledge and skills you need
                          to make future career and life decisions.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerAssessment" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerAssessment" ? "" : "careerAssessment"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-4"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-4"
                    >
                      What are Career Assessment?{" "}
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-4 ${
                      activeTab === "careerAssessment" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerAssessment" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career assessments&nbsp;are tools that are designed to
                          help individuals understand how a variety of personal
                          attributes (i.e., data values, preferences,
                          motivations, aptitudes and skills), impact their
                          potential success and satisfaction with different
                          career options and work environments.&nbsp;The
                          scholars career is an online and offline career test,
                          we offer both the quntitative and qualitative
                          assessments. Quantitative assessment precisely measure
                          key attributes believed to influence an individuals
                          potential success and satisfaction with a career,
                          while qualitative assessment is designed to help
                          individuals clarify their goals and preferences, which
                          can then be used to make more informed career
                          decisions.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerGuidance" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerGuidance" ? "" : "careerGuidance"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-5"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-5"
                    >
                      What is Career Guidance?
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-5 ${
                      activeTab === "careerGuidance" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerGuidance" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career Guidance takes the result and anlysis of career
                          assessments and career counselling to the next level.
                          Being successful in a career takes extensive efforts,
                          and with an experienced coach/mentor, your career
                          development efforts can find the right direction. The
                          scholars career counsellors provide career guidance by
                          building customized career action plans and road map,
                          guide you to the right path, provide personalized 24/7
                          support, and help you attain a greater level in your
                          caeer.{" "}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerCounsellors" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerCounsellors"
                            ? ""
                            : "careerCounsellors"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-6"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-6"
                    >
                      Who are Career Counsellors?
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-6 ${
                      activeTab === "careerCounsellors" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerCounsellors" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career counselors are trained professionals that help
                          uncover all the things we need to think about careers,
                          along with providing&nbsp;tips that will hopefully
                          lead us to making the right&nbsp;career choice per
                          time.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerHelp" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerHelp" ? "" : "careerHelp"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-7"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-7"
                    >
                      How can I get help Career help or Guidance?
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-7 ${
                      activeTab === "careerHelp" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerHelp" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          The Scholars Career is available to help you on your
                          journey of finding the right career that brings you
                          satisfaction and helps you reach and maximize your
                          potential. You can contact us on the available
                          contacts on this site or talk to your career
                          counsellor attached to your school.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerCounsellingInNigeria"
                          ? ""
                          : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerCounsellingInNigeria"
                            ? ""
                            : "careerCounsellingInNigeria"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-8"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-8"
                    >
                      Career Counselling in Nigeria
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-8 ${
                      activeTab === "careerCounsellingInNigeria" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerCounsellingInNigeria" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career counselling is a course studied in many
                          university in Nigeria, but not many of the people who
                          studied the course have the opportunity to a career
                          guide. Over the years there has not been a sustainable
                          career counselling programme to help students chose
                          their career path in Nigeria. The scholars career is a
                          platform that offers students an online and offline
                          career assessments and career counselling in Nigeria,
                          Africa and some other neighbouring countries. Be rest
                          assured to the same level of services for both our
                          offline and online services.{" "}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <iframe
                src="https://www.instagram.com/p/CNmXJA7rlRT/?utm_source=ig_embed&amp;utm_campaign=loading"
                title="instagram"
                allowTransparency={true}
                frameBorder="0"
                scrolling="no"
                width="320"
                height="550"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* CAREER */}
{/* 
      <div className="container" style={{ marginTop: "80px" }}>
        <h3>Questions about Career</h3>
        <hr />
      </div>
      <div className="container" style={{ marginBottom: "100px" }}>
        <div className="row">
          <div className="col-md-6">
            <div className="vstack">
              <div className="accordion" role="tablist" id="accordion-1">
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "How Do I know what Career to choose"
                          ? ""
                          : " collapsed"
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-1"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-1"
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "How Do I know what Career to choose"
                            ? ""
                            : "How Do I know what Career to choose"
                        )
                      }
                    >
                      How Do I know what Career to choose?
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse item-1 ${
                      activeTab === "How Do I know what Career to choose"
                        ? "show"
                        : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "How Do I know what Career to choose" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          With our team of counsellors, we will be best suited
                          to answer your questions based on your needs
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "counselling" ? "" : " collapsed"
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-2"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-2"
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "counselling" ? "" : "counselling"
                        )
                      }
                    >
                      What is Counselling?{" "}
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "scroll" }}
                    className={`accordion-collapse collapse item-2 ${
                      activeTab === "counselling" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "counselling" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Counselling is the application of mental health,
                          psychological or human development principles, through
                          cognitive, affective, behavioural or systemic
                          interventions, strategies that address wellness,
                          personal growth, or career development, as well as
                          pathology.
                          <br />
                          <br />
                          <em>
                            <span style={{ textDecoration: "underline" }}>
                              (http://counseling. org)
                            </span>
                          </em>
                          <br />
                          <br />
                          Counselling deals with wellness, personal growth,
                          career, and pathological concerns. In other words,
                          counsellors work in areas that involve relationships
                          (Casey, 1996). These areas include intra- and
                          interpersonal concerns related to finding meaning and
                          adjustment in such settings as&nbsp;schools, families,
                          and careers.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-3"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-3"
                      className={`accordion-button${
                        activeTab === "careerCounselling" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerCounselling"
                            ? ""
                            : "careerCounselling"
                        )
                      }
                    >
                      What is Career Counselling?{" "}
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-3 ${
                      activeTab === "careerCounselling" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerCounselling" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career counselling is getting the right guidance to
                          help you make the career decisions you need to make
                          now, but to give you the knowledge and skills you need
                          to make future career and life decisions.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerAssessment" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerAssessment" ? "" : "careerAssessment"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-4"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-4"
                    >
                      What are Career Assessment?{" "}
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-4 ${
                      activeTab === "careerAssessment" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerAssessment" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career assessments&nbsp;are tools that are designed to
                          help individuals understand how a variety of personal
                          attributes (i.e., data values, preferences,
                          motivations, aptitudes and skills), impact their
                          potential success and satisfaction with different
                          career options and work environments.&nbsp;The
                          scholars career is an online and offline career test,
                          we offer both the quntitative and qualitative
                          assessments. Quantitative assessment precisely measure
                          key attributes believed to influence an individuals
                          potential success and satisfaction with a career,
                          while qualitative assessment is designed to help
                          individuals clarify their goals and preferences, which
                          can then be used to make more informed career
                          decisions.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerGuidance" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerGuidance" ? "" : "careerGuidance"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-5"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-5"
                    >
                      What is Career Guidance?
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-5 ${
                      activeTab === "careerGuidance" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerGuidance" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career Guidance takes the result and anlysis of career
                          assessments and career counselling to the next level.
                          Being successful in a career takes extensive efforts,
                          and with an experienced coach/mentor, your career
                          development efforts can find the right direction. The
                          scholars career counsellors provide career guidance by
                          building customized career action plans and road map,
                          guide you to the right path, provide personalized 24/7
                          support, and help you attain a greater level in your
                          caeer.{" "}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerCounsellors" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerCounsellors"
                            ? ""
                            : "careerCounsellors"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-6"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-6"
                    >
                      Who are Career Counsellors?
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-6 ${
                      activeTab === "careerCounsellors" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerCounsellors" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career counselors are trained professionals that help
                          uncover all the things we need to think about careers,
                          along with providing&nbsp;tips that will hopefully
                          lead us to making the right&nbsp;career choice per
                          time.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerHelp" ? "" : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerHelp" ? "" : "careerHelp"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-7"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-7"
                    >
                      How can I get help Career help or Guidance?
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-7 ${
                      activeTab === "careerHelp" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerHelp" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          The Scholars Career is available to help you on your
                          journey of finding the right career that brings you
                          satisfaction and helps you reach and maximize your
                          potential. You can contact us on the available
                          contacts on this site or talk to your career
                          counsellor attached to your school.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" role="tab">
                    <button
                      className={`accordion-button${
                        activeTab === "careerCounsellingInNigeria"
                          ? ""
                          : " collapsed"
                      }`}
                      onClick={() =>
                        setActiveTab((prev) =>
                          prev === "careerCounsellingInNigeria"
                            ? ""
                            : "careerCounsellingInNigeria"
                        )
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-1 .item-8"
                      aria-expanded="false"
                      aria-controls="accordion-1 .item-8"
                    >
                      Career Counselling in Nigeria
                    </button>
                  </h2>
                  <div
                    style={{ overflowY: "hidden" }}
                    className={`accordion-collapse collapse item-8 ${
                      activeTab === "careerCounsellingInNigeria" ? "show" : ""
                    }`}
                    role="tabpanel"
                    data-bs-parent="#accordion-1"
                  >
                    {activeTab === "careerCounsellingInNigeria" && (
                      <motion.div
                        animate={{
                          y: "10px",
                          opacity: 1,
                          display: "block",
                          animationDuration: "0.5",
                          transition: { duration: 0.5 },
                        }}
                        initial={{ x: 0, opacity: 0, display: "none" }}
                        className="accordion-body"
                      >
                        <p className="mb-0">
                          Career counselling is a course studied in many
                          university in Nigeria, but not many of the people who
                          studied the course have the opportunity to a career
                          guide. Over the years there has not been a sustainable
                          career counselling programme to help students chose
                          their career path in Nigeria. The scholars career is a
                          platform that offers students an online and offline
                          career assessments and career counselling in Nigeria,
                          Africa and some other neighbouring countries. Be rest
                          assured to the same level of services for both our
                          offline and online services.{" "}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
}

export default FAQ;
