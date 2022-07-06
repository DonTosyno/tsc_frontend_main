import React, { useEffect, useRef, useState } from "react";
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
import logoMainImg from "../../assets/icons/TSC-plain.png";
import gsap, { Power3 } from "gsap";

function Blog() {
  let blogBodyRef1 = useRef(null);
  let blogBodyRef1Alt = useRef(null);
  let blogBodyRef1Writer = useRef(null)
  let blogBodyRef1WriterAlt = useRef(null)
  let blogBodyRef2 = useRef(null);
  let blogBodyRef2Alt = useRef(null);
  let blogBodyRef2Writer = useRef(null)
  let blogBodyRef2WriterAlt = useRef(null)
  let blogBodyRef3 = useRef(null);
  let blogBodyRef3Alt = useRef(null);
  let blogBodyRef3Writer = useRef(null)
  let blogBodyRef3WriterAlt = useRef(null)
  let blogBodyRef4 = useRef(null);
  let blogBodyRef4Alt = useRef(null);
  let blogBodyRef4Writer = useRef(null)
  let blogBodyRef4WriterAlt = useRef(null)
  const navigate = useNavigate();
  const [animateBody, setAnimateBody] = useState(false);
  const [blogBodyNumber, setBlogBodyNumber] = useState(1);
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    if (animateBody) {
      
      switch (blogBodyNumber) {
        case 0:
          gsap.timeline()
          gsap.from(blogBodyRef1.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
          gsap.from(blogBodyRef1Writer.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: Power3.easeOut,
          })
          break;
        case 1:
          gsap.from(blogBodyRef2.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
          break;
        case 2:
          gsap.from(blogBodyRef3.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
          break;
        case 3:
          gsap.from(blogBodyRef4.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
          break;
        default:
          return;
      }
    } else { 

      switch (blogBodyNumber) {
        case 0:
          gsap.from(blogBodyRef1Alt.current, {
            opacity: 0,
            duration: 1.3,
            ease: Power3.easeOut,
          });
          gsap.from(blogBodyRef1WriterAlt.current, {
            opacity: 0,
            duration: 1.3,
            ease: Power3.easeOut,
          })
          break;
        case 1:
          gsap.to(blogBodyRef2.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
          break;
        case 2:
          gsap.to(blogBodyRef3.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
          break;
        case 3:
          gsap.to(blogBodyRef4.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: Power3.easeOut,
          });
          break;
        default:
          return;
      }
    }
  }, [animateBody, blogBodyNumber]);

  const [blogs, setBlogs] = useState([
    {
      blogTitle: "CHOOSING A CAREER",
      blogBody:
        "You know what the greatest tragedy is in the whole world?... It's all the people who never find out what it is they want to do or what it is they're good at. It's all the sons who become blacksmiths because their fathers were blacksmiths. It's all the people who never get to know what it is that they can be. It's all the wasted chances.",
      blogWriter: "― Terry Pratchett, Moving Pictures",
    },
    {
      blogTitle: "WHAT IS A CAREER? ",
      blogBody: `According to Wikipedia, The Oxford English Dictionary defines the word "career" as a person's "course or progress through life (or a distinct portion of life)". This definition relates "career" to a range of aspects of an individual's life, learning, and work. "Career" is also frequently understood to relate to the working aspects of an individual's life - as in "career woman", for example. A third way in which the term "career" is used describes an occupation or a profession that usually involves special training or formal education.`,
      blogWriter: " ",
    },
    {
      blogTitle: "WHY IS IT IMPORTANT TO CHOOSE A CAREER?",
      blogBody: `Career choosing is one of the most important decisions one must make in life. It is so much essential than deciding what you will do to make a living. The importance of choosing a career with which we are satisfied and fulfilled cannot be overemphasized. Not all people are lucky enough to just know what they want to do and end up in their various satisfying careers without giving it much thought. So, in other not to end up being unhappy with life, you have to make a well-thought-out decision about choosing a suitable career.`,
      blogWriter: " ",
    },
    {
      blogTitle: "FOUR (4) KEY STEPS YOU NEED TO TAKE TO CHOOSE YOUR CAREER",
      blogBody: `1) DISCOVER YOURSELF:
        To become successful in life, one has to discover his or herself. How? According to Adams and Marshall (1996), they established the four formations to discovery process: 
        
         A structure and order to self-knowledge;
         A sense of consistency and coherence to beliefs, goals, and self-knowledge; 
         A sense of continuity for one’s history and future; goals and direction; 
         A sense of personal control of their choices and outcomes.
        
        Furthermore, thinking about where you are now, where you want to be and how you are going to get there are elements that brings you into the reality of yourself. Once you have thought about where you are now and where you want to be, you can work on getting to know your skills, interest, or value.
        
        2) DETERMINATION: 
        This step requires comparing your options, pointing out your choice, and thinking about what suits you best at the point in time.
        
        3) COMMITMENT: 
        This step requires you to put together what you need to do to put your plans into action. Use all you have to learn about your skills, interest, and value, together with the information you have gathered about your career of interest, and put them into action.
        
        4) FOCUS: 
        Sometimes in life, situations and circumstances will want to deny us from our rights and reality, but it's impossible to distract or stop a man who is focused on his mission. Jack Canfield said "successful people maintain a positive focus in life no matter what is going on around them".`,
      blogWriter: "",
    },
  ]);
  return (
    <div>
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
          zIndex: "9980",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="navbar_logo">
          <img src={logoMainImg} alt="logo" />
        </div>
      </motion.div>

   { showModal && <motion.div
         animate={{
            opacity: 1,
           animationDuration: "0.5",
           transition: { duration: 0.5 },
         }}
         initial={{ opacity: 0 }}
         exit={{ opacity: 0, animationDuration: "0.5", transition: { duration: 0.5 } }}
         style={showModal ? {
           position: "fixed",
           top: "0",
           left: "0",
           width: "100%",
           height: "100%", 
           overflow: "hidden",
           background: "rgba(0,0,0,0.75)",
           zIndex: "9989",
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           cursor: 'pointer',
           transition: '0.33s ease'
         } : {
           display: 'none'
         }}
         onClick={() => setShowModal(false)}
       >
      <div
          className="blog_grid_item" style={{background: '#fff', width: '60%', cursor: 'auto',  zIndex: "9995",}}>
          <div className="blog_grid_img">
            <img src={logoMainImg} alt="logo" />
          </div>
          <div className="blog_grid_item_content" style={{maxHeight: "300px", overflowY: "scroll"}}>
            <h2>{blogs[blogBodyNumber].blogTitle}</h2>
          
              <p ref={blogBodyRef3Alt}>
                {blogs[blogBodyNumber].blogBody  }
              </p>
              <h2>{blogs[blogBodyNumber + 1].blogTitle}</h2>
          
              <p ref={blogBodyRef3Alt}>
                {blogs[blogBodyNumber+ 1].blogBody  }
              </p>
              <h2>{blogs[blogBodyNumber+ 2].blogTitle}</h2>
          
          <p ref={blogBodyRef3Alt}>
            {blogs[blogBodyNumber+ 2].blogBody  }
          </p>
          <h2>{blogs[blogBodyNumber+ 3].blogTitle}</h2>
          
          <p ref={blogBodyRef3Alt}>
            {blogs[blogBodyNumber+ 3].blogBody  }
          </p>
           
              {/* <p ref={blogBodyRef3WriterAlt}>{blogs[2].blogWriter}</p> */}
           
          </div>
          <button style={{
            background: '#000',
            border: 'none', 
            marginLeft: '20px',
            marginBottom: '20px',
            color: '#fff',
            fontSize: '18px',
            borderRadius: '10px',
            padding: '15px 12px'
          }} onClick={() => setShowModal(false)}>Close</button>
        </div>
       </motion.div>
    }
      <Navbar />
      <div className="blog_grid_container"  style={showModal ? {overflow: 'hidden'} : {}}>
        <div
          className="blog_grid_item"
          onMouseEnter={() => {
            setAnimateBody(true);
            setBlogBodyNumber(0);
          }}
          onMouseLeave={() => setAnimateBody(false)}
          onClick={() => {
            setShowModal(true);
            setBlogBodyNumber(0);
          }}
        >
          <div className="blog_grid_img">
            <img src={logoMainImg} alt="logo" />
          </div>
          <div className="blog_grid_item_content">
            <h2>{blogs[0].blogTitle}</h2>
            {!animateBody ? (
              <p ref={blogBodyRef1Alt}>
                {blogs[0].blogBody.slice(0, 180) + "...  "}
                <strong>Read more</strong>
              </p>
            ) : (
              <div className="hide-text" style={{ overflow: "hidden" }}>
                <p ref={blogBodyRef1}>
                  {blogs[0].blogBody.slice(0, 180) + "...  "}
                  <strong>Read more</strong>
                </p>
              </div>
            )}
            {animateBody ? (
              <div className="hide-text" style={{ overflow: "hidden" }}>
                {" "}
                <p ref={blogBodyRef1Writer}>{blogs[0].blogWriter}</p>
              </div>
            ) : (
              <p ref={blogBodyRef1WriterAlt}>{blogs[0].blogWriter}</p>
            )}
          </div>
        
        </div>
{/* 
  SECOND ITEM  
        <div
          className="blog_grid_item"
          onMouseEnter={() => {
            setAnimateBody(true);
            setBlogBodyNumber(1);
          }}
          onMouseLeave={() => setAnimateBody(false)}
          onClick={() => {
            setShowModal(true);
            setBlogBodyNumber(1);
          }}
        >
          <div className="blog_grid_img">
            <img src={logoMainImg} alt="logo" />
          </div>
          <div className="blog_grid_item_content">
            <h2>{blogs[1].blogTitle}</h2>
            {!animateBody ? (
              <p ref={blogBodyRef2Alt}>
                {blogs[1].blogBody.slice(0, 180) + "...  "}
                <strong>Read more</strong>
              </p>
            ) : (
              <div className="hide-text" style={{ overflow: "hidden" }}>
                <p ref={blogBodyRef2}>
                  {blogs[1].blogBody.slice(0, 180) + "...  "}
                  <strong>Read more</strong>
                </p>
              </div>
            )}
            {animateBody ? (
              <div className="hide-text" style={{ overflow: "hidden" }}>
                {" "}
                <p ref={blogBodyRef2Writer}>{blogs[1].blogWriter}</p>
              </div>
            ) : (
              <p ref={blogBodyRef2WriterAlt}>{blogs[1].blogWriter}</p>
            )}
          </div>
        </div>


  third item  
<div
          className="blog_grid_item"
          onMouseEnter={() => {
            setAnimateBody(true);
            setBlogBodyNumber(2);
          }}

          onMouseLeave={() => setAnimateBody(false)}
          onClick={() => {
            setShowModal(true);
            setBlogBodyNumber(2);
          }}
        >
          <div className="blog_grid_img">
            <img src={logoMainImg} alt="logo" />
          </div>
          <div className="blog_grid_item_content">
            <h2>{blogs[2].blogTitle}</h2>
            {!animateBody ? (
              <p ref={blogBodyRef3Alt}>
                {blogs[2].blogBody.slice(0, 180) + "...  "}
                <strong>Read more</strong>
              </p>
            ) : (
              <div className="hide-text" style={{ overflow: "hidden" }}>
                <p ref={blogBodyRef3}>
                  {blogs[2].blogBody.slice(0, 180) + "...  "}
                  <strong>Read more</strong>
                </p>
              </div>
            )}
            {animateBody ? (
              <div className="hide-text" style={{ overflow: "hidden" }}>
                {" "}
                <p ref={blogBodyRef3Writer}>{blogs[2].blogWriter}</p>
              </div>
            ) : (
              <p ref={blogBodyRef3WriterAlt}>{blogs[2].blogWriter}</p>
            )}
          </div>
        </div>

        <div
          className="blog_grid_item"
          onMouseEnter={() => {
            setAnimateBody(true);
            setBlogBodyNumber(3);
          }}
          onMouseLeave={() => setAnimateBody(false)}
          onClick={() => {
            setShowModal(true);
            setBlogBodyNumber(3);
          }}
        >
          <div className="blog_grid_img">
            <img src={logoMainImg} alt="logo" />
          </div>
          <div className="blog_grid_item_content">
            <h2>{blogs[3].blogTitle}</h2>
            {!animateBody ? (
              <p ref={blogBodyRef4Alt}>
                {blogs[3].blogBody.slice(0, 180) + "...  "}
                <strong>Read more</strong>
              </p>
            ) : (
              <div className="hide-text" style={{ overflow: "hidden" }}>
                <p ref={blogBodyRef4}>
                  {blogs[3].blogBody.slice(0, 180) + "...  "}
                  <strong>Read more</strong>
                </p>
              </div>
            )}
            {animateBody ? (
              <div className="hide-text" style={{ overflow: "hidden" }}>
                {" "}
                <p ref={blogBodyRef4Writer}>{blogs[3].blogWriter}</p>
              </div>
            ) : (
              <p ref={blogBodyRef4WriterAlt}>{blogs[3].blogWriter}</p>
            )}
          </div>
        </div> */}
      </div>
      <Footer /> 
    </div>
  );
}

export default Blog;
