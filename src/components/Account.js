import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addgems, clearcards } from './reducers/slice';

export default function Account() {
    const userstate = useSelector((state)=>state.user);
    let dispatch = useDispatch();
    const clear = ()=>{
      dispatch(clearcards());
    }
    const add = () =>{
      dispatch(addgems(1000))
    }
    console.log(userstate.cards)
  return (
    <div>
      <h1>Your Account</h1>
      <h2>{userstate.username}</h2>
      <h3>Account Info :</h3>
      <h5>Gems:{userstate.gems}</h5><img height='32' src='/images/currency/gembundlesm.png'/>
      <h5>Elite Gems:{userstate.Egems}</h5><img height='32' src='/images/currency/egembundlesm.png'/>
      <h1>Owned Cards</h1>
      <button class="button-64 text-center mx-auto m-4" role="button" onClick={clear}><span class="text">Clear</span></button>
      <button class="button-64 text-center mx-auto m-4" role="button" onClick={add}><span class="text">Gems</span></button>

      <Row>
      {userstate.cards.map((pl,index)=>{
                        return (<Col key={index}><Link to={`/Card/${pl.name}`}><img key={pl.name} src={pl.image} width="250" /></Link></Col>)
                    })
                }
      </Row>
    </div>
  )
}
