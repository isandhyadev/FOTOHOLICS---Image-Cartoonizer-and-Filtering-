// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/textform';
import About from './components/about';


import { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,Routes,
  Link,
  BrowserRouter
} from "react-router-dom";

function App() {
  
  return (
    <>

    <BrowserRouter>
   
    <Navbar title="FotoHOLICs"/>
    
    
    <div className="container my-3">
    
    {/* <About /> */}
    <Routes>
      {/* < Route path='/' element={<Textform heading="Enter the text to analyze"/>}/> */}
      < Route path='/about' element={<About/>}/>
      < Route path='/' element={<Textform/>}/>
      
      
    </Routes>
    </div>
   
    </BrowserRouter>
    </>
  );
}

export default App;
