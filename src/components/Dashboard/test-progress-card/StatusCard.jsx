import React from "react";
import AnimatedNumber from "animated-number-react";
import "./statuscard.css";
import './status-card.css'
import {useWindowSize} from "../../../hooks"
const TestProgressCard = ({ props, title }) => {
  const [value, setValue] = React.useState(0);
  const { height: heightFromWindow, width: widthFromWindow } =
  useWindowSize();

  const formatValue = value => `${Number(value).toFixed(1)}%`;
  const progressBarWidthFactor =  widthFromWindow > 1800 ? 1: widthFromWindow < 1800 && widthFromWindow > 1600 ? .895 : widthFromWindow < 1600 && widthFromWindow > 1400 ? 0.75 : widthFromWindow < 1400 && widthFromWindow > 1000 ? 0.5 :0.6;
  React.useEffect(() => {
    setValue(props.percent * props.width);
  });


  return (
    <div className="status-card" style={{ margin: '15px'}}>
     
      <div className="status-card__info">
        <h4 style={{ fontSize: widthFromWindow > 1600 ?"18px":"16px"  }}>
          {title}: <AnimatedNumber
          value={`${props.percent * 100}`}  
          formatValue={formatValue}
          duration={1800}
          
        /> 
        </h4>

        <div className="progress-div" style={{ width: `${props.width * progressBarWidthFactor}px` }}>
          <div style={{ width: `${value * progressBarWidthFactor}px` }} className="progress" />
        
              {/* <p style={{marginTop: '10px'}}>
                HeightFromWindow: {heightFromWindow}
                WidthFromWindow: {widthFromWindow}
              </p> */}
        </div>
      </div>
    </div>
  );
};

export default TestProgressCard;
