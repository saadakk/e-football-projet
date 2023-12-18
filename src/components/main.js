import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import packs from './packs';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

export default function Main() {
  const history = useNavigate();
  const connection = useSelector((state)=>state.connected);
  let goto = (e)=>{
    if(connection){
      history("/Pack/"+e.target.id)
      console.log(e);
    }else{
      alert('you must be logged in !!')
    }
  }
    return(
      <Row>
      {  packs.map((p)=>{
        return <Col key={p.id}><div onClick={(e)=>goto(e)} to={`/Pack/${p.id}`}><img id={p.id}  src={p.img} width="250px"/></div></Col>
      }
      )
      }
      </Row>
    )
}
