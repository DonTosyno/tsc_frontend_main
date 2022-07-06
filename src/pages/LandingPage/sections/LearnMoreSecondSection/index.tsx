import React, { useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg from "../../../../assets/icons/TSC-plain2.png";
import { Icon } from "ts-react-feather-icons"; 
 import Aos from "aos";
import "aos/dist/aos.css";
function LearnMoreSsecondSection() {

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  })
  return (
    <div className="learn_more_second" data-aos="fade-up">
      <div className="learn_more_second_img">
        <img src={logoImg} alt="logo" />
      </div>
      <p className="first_item">
        What sets you apart in the marketplace? Discover the behavioral traits
        that shape how you think and how you work with others
      </p>

      <p className="second_item">
        Feel Confident in your next career move with the insights and data you
        need
      </p>

      <Link to="/about" className="learn_more_second_button">Get Started Now</Link>

      <div className="learn_more_second_img bottom">
        <img src={logoImg} alt="logo" />
      </div>
    </div>
  );
}

export default LearnMoreSsecondSection;
