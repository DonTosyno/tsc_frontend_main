import React , {useRef, useEffect} from "react";
import "./styles.css";
import LogoImg from '../../assets/icons/TSC-plain.png';
import gsap, {Power3} from "gsap"; 
interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean
}

function LoadingScreen({setLoading, loading}:Props) {
  let parentRef = useRef(null);
  let logoImageRef = useRef(null);
  let bgStrip1 = useRef(null);
  let bgStrip2 = useRef(null);
  let bgStrip3 = useRef(null);
  
  useEffect(() => {
  
    if (!loading){
    
      gsap.to(logoImageRef.current,{ opacity: 0, duration: .7,  ease: Power3.easeOut});
      gsap.to(bgStrip1.current,{top: "-100%", duration: 1.4, delay: 1.2, ease: Power3.easeOut});
      gsap.to(bgStrip2.current,{top: "-100%", duration: 1.4, delay: 1.4, ease: Power3.easeOut});
      gsap.to(bgStrip3.current,{top: "-100%", duration: 1.4, delay: 1.6, ease: Power3.easeOut});
      // gsap.to(parentRef.current,{ display:"none",delay: 1.5, ease: Power3.easeOut});
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1800)
    }
   }, [loading])
  return (
    <div className='loadingScreen'ref={parentRef} >
        <div className='overlay_content' ref={logoImageRef}>
          <img src={LogoImg} alt="logo"  />
        </div>
      <div className='overlay first' ref={bgStrip1}></div>
      <div className='overlay second' ref={bgStrip2}>
      
      </div>
      <div className='overlay third' ref={bgStrip3}></div>
    </div>
  )
}

export default LoadingScreen