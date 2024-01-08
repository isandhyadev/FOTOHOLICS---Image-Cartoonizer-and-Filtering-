import React from "react";
import "./trextfrom.css"
import imageCompression from "browser-image-compression";
import img1 from "../images/upload.jpg"
import Card from "react-bootstrap/Card";
import Webcam from "react-webcam";
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
// const WebcamComponent = () => <Webcam />;

// const videoConstraints = {
//     width: 220,
//     height: 200,
//     facingMode: "user"
// };
class filter extends React.Component {
  
  constructor() {
    super();
   
    this.state = {
      compressedLink:
        "",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
      imageSrc:"",
      screen:false,
      pridicts:false,
      pridictimg:"",
      pridictper:"",
      
    };
    
  }

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true,
      screen:false
    });
    console.log(imageFile);
    
    e.preventDefault()
    const formData = new FormData();
    formData.append('image', imageFile)
    const Upload = async() => {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(resp => {
        resp.json().then(data => {console.log(data)})
      })
    }
    Upload();
    let ab=''
    var pr
    // const [resl,setresl]=useState([{}])
    // const Upload1 = async() => {
      fetch('/api/pridict', {
        method: 'POST',
        body: formData
      }).then(resp => {
        resp.json().then(data => {console.log(data)
        ab=data['result']
        this.setState({
          pridictper:data['percent'],
          pridictimg:ab
        });
        
        console.log(ab);
      }
                   
        )
        
      })
    // }
    // console.log(resl);
    // Upload1();
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  click = e => {
    e.preventDefault();


    

      const downloadLink = "http://localhost:5000/get_image";
      this.setState({
        compressedLink: downloadLink
      });
    

    this.setState({ clicked: true });
    return 1;
  };
  
  handlesharpen=()=>{
    fetch('/sharpen')
  }
  handlesmooth=()=>{
    fetch('/smootherimage')
  }
  handleblur=()=>{
    fetch('/blurimage')
  }
  handlegrey=()=>{
    fetch('/greyimage')
  }
  handlecartoon=()=>{
    fetch('/cartoonimage')
  }
  pridictimage=()=>{
    this.setState({pridicts: true});
    
    
  
  }
  setRef = webcam => {
    this.webcam = webcam;
    
  };

  capture = () => {
    this.setState({
      imageSrc :this.webcam.getScreenshot()
    });
    
    
    // var formData1 = new FormData();
    // formData1.append("file", image);
    // const Upload = async() => {
    //   await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData1
    //   }).then(resp => {
    //     resp.json().then(data => {console.log(data)})
    //   })
    // }
    // Upload();
  };
  retake = () => {
    this.setState({
      imageSrc :""
    });
  };
  usewebcam = () => {
    this.setState({
      screen:true,
      

    });
  };
  
  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    
   
    
    return (
      <div className="is">
      <div className="m-5">
        

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {this.state.uploadImage ? (
              <Card.Img
                className="images"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <></>
            )}
            {/* webcam*/}
            <div>
          {this.state.screen === true ? (<div className="abc">
            {this.state.imageSrc === "" ? <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
          />: <img id="abcd" src={this.state.imageSrc} />}
        {/* <button onClick={this.capture}>Capture photo</button> */}
        {this.state.imageSrc !== "" ?
                    <button onClick={this.retake}
                    className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={this.capture}
                    className="webcam-btn">Capture</button>
                  }
      </div>
       ):( <></>)}



            <div className="d-flex justify-content-center">
              <div className="webcam1"><button onClick={this.usewebcam}>WebCam</button></div>
              <input
                type="file"
                accept="image/*"
                name="file"
                className=" btn btn-dark "
                encType="multipart/form-data"
                classnamename=" btn btn-dark "
                
                onChange={e => this.handle(e)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            <div className="btn-group1" role="group" >
<div className="theris" >   <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Filters
    </button>
    <ul className="dropdown-menu">
      <li><a className="dropdown-item dropdown-dark"  onClick={e=>this.handlecartoon()}>Cartooning</a></li>
      <li><a className="dropdown-item dropdown-dark" onClick={e=>this.handlegrey()}>GreyImage</a></li>
      <li><a className="dropdown-item dropdown-dark" >WaterEffect</a></li>
      <li><a className="dropdown-item dropdown-dark"  onClick={e=>this.handlesmooth()}>Smoother</a></li>
      <li><a className="dropdown-item dropdown-dark" onClick={e=>this.handleblur()}>BLur</a></li>
      <li><a className="dropdown-item dropdown-dark"  onClick={e=>this.handlesharpen()}>sharpen</a></li>
    </ul>
    </div>
    {/* <div className="nouse">
      
    </div> */}
  <button type="button" className="btn btn-dark "  aria-expanded="false" onClick={e=>this.pridictimage()}>
              pridict
            </button>
  </div>
  
            {this.state.outputFileName ? (
              <button
                type="button"
                classnamename=" btn btn-dark"
                onClick={e => this.click(e)}
              >
               <div className="btn-group1" >
   <button type="button" className="distisbtn distisbtn-dark "  aria-expanded="false">
      useEffect
    </button>
    
  </div>
              </button>
        
            ) : (
              <></>
            )}


          </div>
         
          <div className=" ">
          {this.state.clicked === true ?  (<Card.Img variant="top" className="images1" src={this.state.compressedLink}></Card.Img>):(<></>)}
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={"http://localhost:5000/get_image"}
                  download={"http://localhost:5000/get_image"}
                  className="mt-2 btn btn-dark w-20"
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {this.state.pridicts ? (
          <div className="abb">
              <div className="pridiction">
                {this.state.pridictimg}
                </div>
              <div className="pridiction1">
                <div className="outer">
                <div className="inner " style={{width: `${this.state.pridictper}%`}} ></div>
                </div>
                <div className="text">{this.state.pridictper} % </div>
                </div>
            </div>
            ) : (
              <></>
            )}
      </div>
      </div>
      </div>
    );
  }
}

export default filter;