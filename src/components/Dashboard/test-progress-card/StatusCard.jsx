import React from "react";
import AnimatedNumber from "animated-number-react";
import "./statuscard.css";

const TestProgressCard = ({ props, title }) => {
  const [value, setValue] = React.useState(0);

  const formatValue = value => `${Number(value).toFixed(1)}%`;
  React.useEffect(() => {
    setValue(props.percent * props.width);
  });

  return (
    <div className="status-card" style={{ marginBottom: '25px'}}>
     
      <div className="status-card__info">
        <h4 style={{ fontSize: "22px"  }}>
          {title}: <AnimatedNumber
          value={`${props.percent * 100}`}  
          formatValue={formatValue}
          duration={1800}
          
        /> 
        </h4>

        <div className="progress-div" style={{ width: `${props.width}px` }}>
          <div style={{ width: `${value}px` }} className="progress" />
        </div>
      </div>
    </div>
  );
};

export default TestProgressCard;
