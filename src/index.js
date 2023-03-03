import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactGlobe from "react-globe";
import './index.css'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { SpinnerRoundOutlined } from 'spinners-react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { GrNext } from 'react-icons/gr';


import markers from "./markers";

function markerTooltipRenderer(marker) {
  return `${marker.city}`;
}

const options = {
  markerTooltipRenderer,
  globeCloudsOpacity: 0.8,
  //cameraRotateSpeed: 0.5,
  //cameraAutoRotateSpeed: 0.5,
  ambientLightColor: 'white',
};

function App() {

  const [globe, setGlobe] = useState()
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  const [drawer, setDrawer] = useState(null);
  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: "CLICK",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY }
    });
    setDrawer(markerTooltipRenderer(marker));
    globe.lock()
  }
  function onMouseOverMarker(marker, markerObject, event) {
    setEvent({
      type: "MOUSEOVER",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY }
    });
    setDetails(markerTooltipRenderer(marker));
    //globe.lock()
  }
  function onMouseOutMarker(marker, markerObject, event) {
    setEvent({
      type: "MOUSEOUT",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY }
    });
    setDetails(null);
    //globe.unlock()
  }
  function onDefocus(previousFocus) {
    setEvent({
      type: "DEFOCUS",
      previousFocus
    });
    setDetails(null);
    setDrawer(null);
    globe.unlock()
  }

  return (
    <div style={{ background: '#12373b' }}>
      {drawer && (
        <div className="drawer"
          style={{
            background: "white",
            position: "absolute",
            fontSize: 20,
            bottom: 0,
            right: 0,
            padding: 12
          }}
        >
          <p> <RiCloseCircleLine /> Close <span>Next <GrNext /></span></p>
          <p>{drawer}</p>

        </div>
         
      )}

      <div className="spinner">
        <SpinnerRoundOutlined
          size="100%"
          thickness={180}
          speed={50}
          color="#36ad47"
          secondaryColor="rgba(0, 0, 0, 0.44)"
          enabled={loading}
          
        />
      </div>

      <ReactGlobe
        height="100vh"
        markers={markers}
        options={options}
        width="100vw"
        onClickMarker={onClickMarker}
        onMouseOverMarker={onMouseOverMarker}
        onMouseOutMarker={onMouseOutMarker}
        onDefocus={onDefocus}
        globeBackgroundTexture={null}
        globeCloudsTexture={null}
        initialCameraDistanceRadiusScale={3}
        onGetGlobe={setGlobe}
        onGlobeTextureLoaded={() => setLoading(false)}
      />

      <h3 className="titleClass">{details && details}</h3>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
