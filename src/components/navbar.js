import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function Navigationbar() {
  const connection = useSelector((state)=>state.connected);
  document.body.style.background = 'linear-gradient(90deg, rgba(122,0,142,1) 20%, rgba(0,148,179,1) 100%)';
  document.body.style.color = "white";
  document.body.style.overflowX = 'hidden';
    useEffect(
     ()=>{
       if(connection){
         document.getElementById("out").style.display = "none"
         document.getElementById("in").style.display = "inline"
         document.getElementById("iin").style.display = "inline"
       }else{
         document.getElementById("out").style.display = "inline"
         document.getElementById("in").style.display = "none"
         document.getElementById("iin").style.display = "none"
       }
     }
    ,[connection])
  return (
    <Navbar expand="lg" className="bg-black text-light">
      <Container>
        <Navbar.Brand className='text-light'><Link to="/" className='text-light'>Star FootBall</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/login" id='out' className='text-light btn'>Log in</Link></Nav.Link>
            <Nav.Link><Link to="/account" id='in' className='text-light btn'>Account</Link></Nav.Link>
            <Nav.Link><Link to="/game" id='iin' className='text-light btn'>Play</Link></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;