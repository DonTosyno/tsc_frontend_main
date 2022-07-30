import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg1 from "../../../assets/images/add_notes.svg";
import logoImg2 from "../../../assets/images/take_notes.svg";
import logoImg3 from "../../../assets/images/survey.svg";
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

interface QuizProps {
     
  setStartQuiz: React.Dispatch<React.SetStateAction<boolean>>

}

function SliderSection({setStartQuiz}:QuizProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  });

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={45}
      totalSlides={3}
      visibleSlides={1}
      currentSlide={activeSlide}
      data-aos="fade-up"
    >
      <Slider  style={{ marginTop: "-60px", position: "relative" }} >
        {[
          {
            heading: "Answer a series of questions",
            body: "Take the assesment and get your career matches, personality archetype, and more along the way.",
            img: logoImg1,
          },
          // {
          //   heading: "A few things to note before starting",
          //   body: "",
          //   img: logoImg2,
          // },
          // {
          //   heading: "Let's Go!",
          //   body: "",
          //   img: logoImg3,
          // },
        ].map((x, index) => (
          <Slide index={index} key={index}>
            <div className="sidebar__item-inner active slide_container_test" style={{ height: "inherit" }}>
              <div className="slide_content_test" style={{ height: "inherit", width: 'inherit' }}>
                <div>
                  <img src={x.img} alt="img" style={{maxWidth: '300px'}} />
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
                    <h2 style={{ fontWeight: "bold",color: '#000',fontSize: "30px" }}>
                      {x.heading}
                    </h2>
                    <p  style={{color: '#000'}}> {x.body}</p>
                  
                      <ul className="testSliderBullets" style={{color: '#000'}}>
                      
                      <li>
                        You cannot change your answers after you submit.
                      </li>
                      <li>
                        You can save your answers and come back later.
                      </li>
                    </ul>
                 
                  
                       <div className="startTestDiv"> 
                          <button onClick={() => setStartQuiz(true)}>
                          Start Test
                        </button>
                       </div>
                     
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </Slide>
        ))}
      </Slider>
      <div>
        {/* <ButtonBack>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              padding: "10px",
              margin: "10px 5px",
            }}
          >
            Back
          </div>
        </ButtonBack>
        <ButtonNext>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              padding: "10px",
              margin: "10px 5px",
            }}
          >
            Next
          </div>
        </ButtonNext> */}
      </div>
    </CarouselProvider>
  );
}

export default SliderSection;
