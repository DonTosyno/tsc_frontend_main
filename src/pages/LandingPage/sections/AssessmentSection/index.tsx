import React, { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../../assets/icons/TSC-plain.png";
import { Icon } from "ts-react-feather-icons";
import Aos from "aos";
import "aos/dist/aos.css";
function AssessmentSection() {

  const navigate = useNavigate()
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  })
  return (
    <div className="assessmentContainer" data-aos="fade-up">
      <div className="assessmentCard">
        <div className="assessmentCardContent">
          <h2>
            {" "}
            <p>01</p> Assessment
          </h2>
          <p>
            Reflect upon your past experiences and future goals, and learn what
            makes you unique.
          </p>
          <button className="explore_button" onClick={() => navigate('/signup')}>Explore</button>
        </div>
        <div></div>
      </div>

      <div className="assessmentCard">
        <div className="assessmentCardContent" style={{ marginTop: "110px" }}>
          <h2>
            {" "}
            <p>02</p> Matches
          </h2>
          <p>
            Find the path that’s right for you based on your strengths,
            interests, and personality
          </p>
        </div>
        <div></div>
      </div>

      <div className="careers_card">
        <div className="career_card_circle" />
        <div className="navbar_logo_plain">
          <img src={logoImg} alt="logo" />
        </div>
     <div className="single_career_card_container">
     {["Graphics Designer", "Business Degree", "Systems Analyst"].map(
          (x, index) => (
            <div className="single_career_card" key={index}>
              <div className="single_career_card_left">
                <h2>{x}</h2>
                <div className="stars_container">
                  {["_", "_", "_", "_", "_"].map((x) => (
                    <p>
                      <Icon name="star" color="#fff" size={25} />
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="check_circle">
                  <Icon name="check" color="#000" size={25} />
                </p>
              </div>
            </div>
          )
        )}
     </div>
      </div>
    </div>
  );
}

export default AssessmentSection;
