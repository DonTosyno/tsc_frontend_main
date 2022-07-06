import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg from "../../../../assets/img/tscquestionimg.JPG";
import { Icon } from "ts-react-feather-icons";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
  import Aos from "aos";
import "aos/dist/aos.css";
function SliderSection() {
 
  const [activeSlide, setActiveSlide] = useState<number>(0)

 useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  })

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={40}
      totalSlides={3}
      visibleSlides={1}
      currentSlide={activeSlide}
      data-aos="fade-up"
    >
      {/* <div style={{marginTop: '-150px'}}>
      <ButtonBack
        onClick={(e) => handleCarouselMotion("left", e!)}
        style={{ background: "transparent", border: "none" }}
      >
        <div style={{ }}>
                    Back
        </div>
      </ButtonBack>
      <ButtonNext   onClick={(e) => handleCarouselMotion("right", e!)}
        style={{ background: "transparent", border: "none" }}>Next</ButtonNext>
      </div> */}
      <Slider style={{ marginTop: "-60px", position: 'relative' }}>
        {[
          {
            heading: "Answer a series of questions",
            body: "Take the assesment and get your career matches, personality archetype, and more along the way.",
          },
          {
            heading: "Get Career Results and University Recommendations",
            body: "Get personalized results tailored to your personality and career goals.",
          },
          {
            heading: "Get Paired with our proficient Counselors",
            body: "Get matched with a professional counselor to help you get the most out of your career.",
          },
        ].map((x, index) => (
          <Slide index={index} key={index}>
            <div className="slide_container" style={{ height: "inherit" }}>
              <div className="slide_content" style={{ height: "inherit" }}>
                <div className="assessmentCard">
                  <div
                    className="assessmentCardContent"
                    style={{
                      marginLeft: "100px",
                      marginTop: "120px",
                      width: "550px",
                    }}
                  >
                    <h2 style={{ fontWeight: "bold" }}>
                      <p style={{ fontWeight: "bold", fontSize: "30px" }}>
                        0{index + 1}
                      </p>{" "}
                      {x.heading}
                    </h2>
                    <p> {x.body}</p>
                  </div>
                  <div></div>
                </div>

                <div style={{ marginTop: "-24px", marginLeft: "25px" }}>
                  <img src={logoImg} alt="img" />
                </div>

                <div className="assessmentCard">
                  <div
                    className="assessmentCardContent"
                    style={{
                      marginLeft: "100px",
                      marginTop: "120px",
                      width: "550px",
                    }}
                  >
                    <h2 style={{ fontWeight: "bold" }}>
                      <p style={{ fontWeight: "bold", fontSize: "30px" }}>
                        {index + 2 <= 3 && `0${index + 2}`}
                      </p>
                    </h2>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </Slide>
        ))}
      </Slider>

    </CarouselProvider>
  );
}

export default SliderSection;
