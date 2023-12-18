import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { connectuser } from './reducers/slice';
import users from './users';

export default function Login() {
    const history = useNavigate();
    const connection = useSelector((state)=>state.connected);
    const dispatch = useDispatch()
    const [email,setemail]= useState("");
    const [password,setpassword]= useState("");
    var userfound;
    const loginuser = () =>{
        users.forEach(element => {
            if(element.email === email && element.password === password){
                dispatch(connectuser(element));
                alert("connected successfully !")
                history("/");
                userfound = true;
            }
        }
        );
        if(userfound!=true){
            alert("connection Failed!")
        }
    }
  return (
    <div>
        <h1>Log In</h1>
      {/* <label className='form-label'  for="input1">Name :</label>
        <input className='form-control' type="text" id="input1" name="Name" required/><br/>

        <label className='form-label' for="input2">Diplay name :</label>
        <input className='form-control'  type="text" id="input2" name="Username" required/><br/>

        <label className='form-label' for="input3">Password :</label>
        <input className='form-control'  type="text" id="input3" name="Password" required/><br/>

        <label className='form-label' for="input4">Email :</label>
        <input className='form-control'  type="text" id="input4" name="Email" required/><br/> */}

        <label className='form-label' >Email :</label>
        <input className='form-control w-25 mx-auto' value={email} onChange={(e)=>setemail(e.target.value)} type="text" name="email" required /><br/>

        <label className='form-label' >Password :</label>
        <input className='form-control w-25 mx-auto' value={password} onChange={(e)=>setpassword(e.target.value)} type="text" name="Password" required/><br/>
        <input className='form-control w-25 mx-auto'  type="submit" value="Log-in" onClick={()=>loginuser()}></input>
    </div>
  )
  
}
