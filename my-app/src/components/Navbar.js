import React from 'react'
import About from './about'
import { Link } from 'react-router-dom'
import img1 from '../images/Girl.jpg'

import './navbar.css'
import { Container, Grid, Image, Item, Button } from "semantic-ui-react";
export default function Navbar(props) {
 return (
    <>
    <div className='containertop'>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container my-0">
    <Link className="navbar-brand" aria-current="page" to="/"><h2>{props.title}</h2></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <Link className="nav-link" to="/about" >WebCam</Link>
        </li>
        
        
      </ul>
      
    </div>
  </div>
</nav>




</div>
</>
  )
}
