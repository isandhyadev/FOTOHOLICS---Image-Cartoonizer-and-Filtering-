import React, { useState } from 'react';
import Webcam from "react-webcam";
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card";
const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 420,
    height: 400,
    facingMode: "user"
};

function  WebcamCapture() {

      const [image,setImage]=useState('');
      const webcamRef = React.useRef(null);

    
      const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
         });

         
    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image === '' ? <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                {image !== '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
               
        </div>
    );
}

export default WebcamCapture ;