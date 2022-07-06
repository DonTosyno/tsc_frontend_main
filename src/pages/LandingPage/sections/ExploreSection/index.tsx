import React, { useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import face1 from "../../../../assets/img/stock_images/face1.jpg";
import face2 from "../../../../assets/img/stock_images/face2.jpg";
import face3 from "../../../../assets/img/stock_images/face3.jpg";
import face4 from "../../../../assets/img/stock_images/face4.jpg";
import face5 from "../../../../assets/img/stock_images/face5.jpg";
import face6 from "../../../../assets/img/stock_images/face6.jpg";
import face7 from "../../../../assets/img/stock_images/face7.jpg";
import face8 from "../../../../assets/img/stock_images/face8.jpg"; 
 import Aos from "aos";
import "aos/dist/aos.css";
function ExploreSection() {

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  })
  return (
    <div className="explore_section_container" data-aos="fade-up">
      <div className="explore_section_div" data-aos="fade-right">
        {[ face2, face3,  face5,  face8].map(
          (item, index) => {
            return (
              <img
                src={item}
                alt={`${item}`}
                key={index}
                className={`img_face${index + 1}`}
                style={{
                  position: index === 3 || index === 5 ? "relative" : "static",
                  top: index === 5 || index === 5 ? "-10px" : "0px",
                  left: index === 3 ? '23px': index === 5 ? '3px': '0px',
                  transform:
                    index === 3
                      ? "scale(1.4)"
                      : index === 5 || index === 7
                      ? "scale(0.88)"
                      : "scale(1)",
                  zIndex: index === 3 || index === 5 ? "2": index === 7 ? "1" : "0",
                }}
                width="150px"
                height="150px"
              />
            );
          }
        )}
      </div>

      <div className="explore_section_right" data-aos="fade-left">
      <div className="explore_section_right_content">
      <h2> Go ahead,<br/> Explore.</h2>
        <p>
          Take the free assessment and uncover things you didn't know about
          yourself.
        </p>

        <div className="explore_section_buttons">
          <Link to="/signup" className="explore_section_buttons_link">Get Started Now</Link>
          <p>Free with the option to upgrade</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ExploreSection;
