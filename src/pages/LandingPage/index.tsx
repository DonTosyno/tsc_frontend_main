import React, { useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import AssessmentSection from "./sections/AssessmentSection";
import ExploreSection from "./sections/ExploreSection";
import Footer from "./sections/Footer";
import GetStarted from "./sections/GetStarted";
import LearnMoreSsecondSection from "./sections/LearnMoreSecondSection";
import LearnMoreSection from "./sections/LearnMoreSection";
import Navbar from "./sections/Navbar";
import SliderSection from "./sections/SliderSection";
import Testimonials from "./sections/Testimonials";
import WhyTrustUsSection from "./sections/WhyTrustUsSection";
import ChatBox from './sections/ChatBox';
import './styles.css'; 
 
function LandingPage() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [setOverflowHidden, setOverflowHiddenState] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false)
  return (
    <div style={loading ? {overflow: 'hidden', height: '100vh'} : (setOverflowHidden ? {overflow: 'hidden',height: '100vh'} : {overflowX: 'hidden'})}>
    <LoadingScreen setLoading={setLoading} loading={loading} />
    <ChatBox />
      <Navbar setShowModal={setShowModal} setOverflowHiddenState={setOverflowHiddenState} />
      <GetStarted showModal={showModal} setShowModal={setShowModal} setOverflowHidden={setOverflowHidden}
setOverflowHiddenState={setOverflowHiddenState} />
      <AssessmentSection />
      {/* <SliderSection /> */}
      {/* <LearnMoreSection /> */}
      <WhyTrustUsSection />
      <LearnMoreSsecondSection />
      {/* <Testimonials />
      <ExploreSection /> */}
      <Footer />
    </div>
  );
}

export default LandingPage;
