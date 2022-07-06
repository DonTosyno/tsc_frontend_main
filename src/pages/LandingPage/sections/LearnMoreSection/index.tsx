import React, { useEffect } from "react";
import "./styles.css";
import { Link} from "react-router-dom";
import WavyImg from "../../../../assets/img/wavy_img.png";
import logoImg from "../../../../assets/icons/TSC-plain.png";
import Aos from "aos";
import "aos/dist/aos.css";

function LearnMoreSection() {
    useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  })
  return (
    <div className="learn_more_section" data-aos="fade-right">
      <div className="learn_more_section_content">
        <h2>Our assessment is just one feature of our membership program</h2>

        <p>
          Become a member to access tools, resources, guidance, and support for
          every stage of your career.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="pricing_div">
            <h2>$4/month</h2>
            <p> Billed annually at $48/year</p>
          </div>
          <div className="learn_more_img_container">
            <img src={logoImg} alt="logo" />
          </div>
        </div>

        <div className="learn_more_buttons">
          <Link to="/about" className="learnMoreButton">Learn more about our membership</Link>
          {/* <button className="learnMoreButton student_discount">See student discount</button> */}
        </div>
      </div>

      <div
        className="get-started_img"
        style={{ objectFit: "contain", height: "600px" }}
      >
        <img src={WavyImg} alt="wavy-img" />
      </div>
    </div>
  );
}

export default LearnMoreSection;
