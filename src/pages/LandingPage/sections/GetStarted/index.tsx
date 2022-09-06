import React, { useRef, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logoImg from "../../../../assets/img/careerimg.png";
import logoMainImg from '../../../../assets/icons/TSC-plain.png';
import gsap, { Power3 } from "gsap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SampleTestModal from "../../../../components/SampleTestModal";
interface NavbarProps {
  showModal: boolean;
  setShowModal : React.Dispatch<React.SetStateAction<boolean>>
  setOverflowHidden:boolean;
setOverflowHiddenState: React.Dispatch<React.SetStateAction<boolean>>
}
function GetStarted({showModal,setShowModal,setOverflowHiddenState}:NavbarProps) {
  let getStartedRef = useRef(null);
  let getStartedTextRef = useRef(null);
  let getStartedSecondTextRef = useRef(null);
  let getStartedBtnContainerRef = useRef(null);
  let getStartedImgRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    gsap.from(getStartedImgRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 2,
      ease: Power3.easeIn,
    });
    gsap.from(getStartedRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 3.2,
      ease: Power3.easeOut,
    });
    gsap.from(getStartedTextRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 3.4,
      ease: Power3.easeOut,
    });
    gsap.from(getStartedSecondTextRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 3.6,
      ease: Power3.easeOut,
    });
    gsap.from(getStartedBtnContainerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 3.8,
      ease: Power3.easeOut,
    });
  }, []);
  return (
    <>
    {showModal &&<SampleTestModal showModal={showModal} setShowModal={setShowModal} setOverflowHiddenState={setOverflowHiddenState} />}
      <motion.div
        animate={{ x: '-100vw',animationDuration: '0.5s', transition: { duration: 0.5 }  }}
        initial={{ x: 0 }}
        exit={{ x: 0,animationDuration: '0.5s', transition: { duration: 0.5 }  }}
        style={{
           position: "absolute",
          top: "0",
          left: "0",
           width: "100%",
          height: "140%",
          background: "#333",
          zIndex: '9989', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >  <div className="navbar_logo" ref={getStartedImgRef}><img src={logoMainImg} alt="logo" /></div></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        
        className="get-started"
      >
        {/* <div className="get-started_content">
          <div className="get-started_content_main">
            <h2 className="hidetext" ref={getStartedRef}>
              Unlock the{" "}
            </h2>
          </div>
          <div className="get-started_content_main">
            <h2 className="hidetext" ref={getStartedTextRef}>
              future you
            </h2>
          </div>

          <div>
            <div className="get-started_text">
              <p ref={getStartedSecondTextRef}  className="get-started_text-mobile">
                Say hello to The Scholars Career platform.
              </p>
            </div>

            <div style={{ overflow: "hidden" }}>
              <div
                className="get-started_btn_container"
                ref={getStartedBtnContainerRef}
              >
                <div className="get-started_btn" onClick={() => navigate('/signup')}>Get Started</div>
                
              </div>
            </div>
          </div>
        </div> */}
        <div className="get-started_img" ref={getStartedImgRef}>
          <img src={logoImg} alt="logo" />
        </div>
      </motion.div>
    </>
  );
}

export default GetStarted;
