import React from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css';
interface AnyReactProps {
    text: string;
    lat: number;
    lng: number;
}
const AnyReactComponent = ({ text }:AnyReactProps) => <div className="googleMapIndicator">
    <div className="pulsatingCircleContainer" >
    <div className="pulsatingCircle" />
    </div>
    <p>{text}</p>
</div>;

function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 6.5244,
      lng: 3.3792
    },
    zoom: 11
  };

 
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '45vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyA3Tr3_TY3U9ft6sxU91ASvpAOp-KDCwhM'}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={6.5244}
            lng={3.3792}
            text="The Scholars Careers"
          />
        </GoogleMapReact>
      </div>
    );
 
}

export default SimpleMap;