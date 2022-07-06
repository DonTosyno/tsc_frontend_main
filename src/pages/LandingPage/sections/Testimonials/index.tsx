import React, { useEffect } from "react";
import "./styles.css";
import logoImg from "../../../../assets/icons/TSC.png";
import { Icon } from "ts-react-feather-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import companies from '../../../../assets/img/testimonialscompanies.JPG'; 
 import Aos from "aos";
import "aos/dist/aos.css";
function Testimonials() {


  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  })
  return (
    <div className="testimonials">
      <div className="testimonials_container">
        <h3>
          People say great things <br />
          about us
        </h3>
        <div className="testimonial_cards">
          <div className="testimonial_card">
            <div className="testimonial_card_left">
              <div className="starsRow">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    color={"#ffc107"}
                    stroke={"#000"}
                    strokeWidth={3}
                    key={i}
                  />
                ))}
              </div>
              <p>
                Really cool. I can see my characteristics and all the jobs that
                I can obtain
              </p>
            </div>

            <div className="testimonial_card_right">
              <div className="testimonial_img_container">
                <img src={logoImg} alt="logo" />
              </div>
              <p>Leah</p>
            </div>
          </div>

          {/* second and third testimonial */}
          <div style={{ position: "relative" }}>
            <div
              className="testimonial_card"
              style={{ position: "relative", top: "-45px" }}
            >
              <div
                className="testimonial_card_right"
                style={{
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "0",
                  borderTopRightRadius: "0",
                  borderTopLeftRadius: "15px",
                }}
              >
                <div className="testimonial_img_container">
                  <img src={logoImg} alt="logo" />
                </div>
                <p>Leah</p>
              </div>
              <div className="testimonial_card_left">
                <div className="starsRow">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      color={"#ffc107"}
                      stroke={"#000"}
                      strokeWidth={3}
                      key={i}
                    />
                  ))}
                </div>
                <p>
                  Really cool. I can see my characteristics and all the jobs
                  that I can obtain
                </p>
              </div>
            </div>

            <div className="testimonial_card">
            <div className="testimonial_card_right"   style={{
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "0",
                  borderTopRightRadius: "0",
                  borderTopLeftRadius: "15px",
                }}>
                <div className="testimonial_img_container">
                  <img src={logoImg} alt="logo" />
                </div>
                <p>Leah</p>
              </div>
              <div className="testimonial_card_left">
                <div className="starsRow">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      color={"#ffc107"}
                      stroke={"#000"}
                      strokeWidth={3}
                      key={i}
                    />
                  ))}
                </div>
                <p>
                  Really cool. I can see my characteristics and all the jobs
                  that I can obtain
                </p>
              </div>

            
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial_companies">
        <img src={companies} alt="companies" />
      </div>
    </div>
  );
}

export default Testimonials;
