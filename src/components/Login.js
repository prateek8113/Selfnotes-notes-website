import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login =  () => {
    let history =useNavigate()
    const [cred,setcred]=useState({email:"",password:""})
    const Submit = async (e)=>{
        e.preventDefault();
        const url = `http://localhost:3000/api/auth/login`;
    const headers = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({email:cred.email,password:cred.password}),
      });

    const json =  await response.json()
    console.log(json)
    if(json.success){
        localStorage.setItem('token',json.auth)
        history("/")

    }
    
  
}
const onchange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className='d-flex justify-content-center'>
      <h1>Login</h1>
    </div>
    <div>
      <form onSubmit={Submit}>
        
  <div className="mb-3" >
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={cred.email} onChange={onchange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={cred.password} onChange={onchange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}

export default Login
