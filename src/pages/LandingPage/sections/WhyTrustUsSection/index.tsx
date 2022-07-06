import React, { useEffect } from "react";
import "./styles.css"; 
import shapeOne from "../../../../assets/img/shapeone.JPG";
import shapeTwo from "../../../../assets/img/shapetwo.JPG";
import shapeThree from "../../../../assets/img/shapethree.JPG";
import "pure-react-carousel/dist/react-carousel.es.css";
  import Aos from "aos";
  import "aos/dist/aos.css";
function WhyTrustUsSection() {
 

    useEffect(() => {
      Aos.init({
        duration: 2000,
      });
    })
  return (
    <div className="why_trust_us_main">
      <h1> Why trust us? </h1>
      <div className="why_trust_us_container">
        <div className="why_trust_us_card" data-aos="fade-right">
          <h2>Built by data scientists and expert psychologists</h2>
          <p>
            Our questions and algorithms are unique to us and are built on
            decades of study in vocational testing
          </p>
        </div>
        <div className="why_trust_us_card_img" data-aos="fade-up">
          <img src={shapeOne} alt="logo" />
        </div>
        <div className="why_trust_us_card" data-aos="fade-left">
          <h2>Your data is safe with us</h2>
          <p>
            We firmly believe that yoy own your data, not us. We never sell your
            personal data to third parties
          </p>
        </div>
        <div className="why_trust_us_card_img" data-aos="fade-right">
          <img src={shapeTwo} alt="logo" />
        </div>
        <div className="why_trust_us_card" data-aos="fade-up">
          <h2>Over 400 million questions to be answered</h2>
          <p>
            The world of work changes in real time — and so do our analytics.
            Our algortihms continuously improve with millions of daily data
            points to give you real-time accuracy
          </p>
        </div>
        <div className="why_trust_us_card_img" data-aos="fade-left">
          <img src={shapeThree} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default WhyTrustUsSection;
