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
import logoMainImg from '../../assets/icons/TSC-plain.png';
function About() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("history");
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      ><div className="navbar_logo"  ><img src={logoMainImg} alt="logo" /></div></motion.div>
      <Navbar />
      <div className="container" style={{ paddingTop: "80px" }}>
        <h3>About us</h3>
        <hr />
        <p>
          Our platform enables students/individuals discover their ideal career
          path by identifying their strengths and weaknesses in tune with their
          talent and ambition. We empower you when you think to make the next
          big move in your Academics or Career. Our focus remains on serving our
          clients and providing the best possible solution to them.
          <br />
        </p>
      </div>
      <div className="container" style={{ paddingBottom: "80px" }}>
        <div className="accordion" role="tablist" id="accordion-1">
          <div className="accordion-item">
            <h2 className="accordion-header" role="tab">
              <button
                className="accordion-button" 
                style={{ background: "#343434", color: "rgb(255,255,255)" }}
                onClick={() => setActiveTab("history")}
              >
                Our History
              </button>
            </h2>
            <div
              className="accordion-collapse "
              role="tabpanel"
            >
              <div className="accordion-body">
                {activeTab === "history" && (
                  <p className="mb-0">
                    After the careful observation of our society, we noticed
                    that most times people get to a certain level in their
                    careers and realise that this isn’t what they signed up for.
                    When we looked further, we realised their choices were based
                    upon what friends or parents thought they should do.
                    <br />
                    The Scholars Career was founded to solve this problem. We
                    have a team of skilled personnel that enable the smooth
                    running of the program which is powered by Artificial
                    Intellogence. Partnership with leading education, training
                    and counselling organization will help move our users into
                    the roles where their skill is most suited, and their
                    aspirations are best met.
                    <br />
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" role="tab">
              <button
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                style={{ background: "#343434", color: "rgb(255,255,255)" }}
                onClick={() => setActiveTab("philosophy")}
              >
                Our Philosophy
              </button>
            </h2>
            <div className="accordion-collapse">
              {activeTab === "philosophy" && (
                <div className="accordion-body">
                  <p className="mb-0">
                    The complete realization of one’s potential and the full
                    development of one’s abilities is important. We do what we
                    do because of how satisfying implementing this efficient,
                    reliable yet simple program will help our
                    client/student/individual/parents/schools make informed
                    decision as it pertains to their education and careers.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" role="tab">
              <button
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                style={{ background: "#343434", color: "rgb(255,255,255)" }}
                onClick={() => setActiveTab("team")}
              >
                Our Team
              </button>
            </h2>
            <div className="accordion-collapse">
              {activeTab === "team" && (
                <div className="accordion-body">
                  <p className="mb-0">
                    We are a group of like minded individuals from diverse
                    background who have had careers across various industries.
                    Trust us to help you figure out your true self and find your
                    way to fulfilment and best career decisions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
}

export default About;
