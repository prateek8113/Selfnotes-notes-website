import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  let history = useNavigate()
  const [cred, setcred] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [success, setSuccess] = useState(false)

  const Submit = async (e) => {
    e.preventDefault()
    const url = `http://localhost:3000/api/auth/create`
    const headers = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password }),
    })

    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.auth)
      setSuccess(true)  
      setTimeout(()=>{
        history("/")
      },3000)
    } else {
      setSuccess(false)  
    }
  }

  const onchange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <>
    <div className='d-flex justify-content-center'>
      <h1>Create An Account</h1>
    </div>
    <div className='container d-flex flex-column'>
      <form onSubmit={Submit}>
        <div className='d-flex flex-row my-2'>
          <div className='container'>
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="emailHelp" />
          </div>
        </div>

        <div className='container'>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' onChange={onchange} id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name='cpassword' onChange={onchange} id="cpassword" />
          </div>
        </div>

        {success && (
          <div className="alert alert-success" role="alert">
            Account created successfully! Redirecting.....
          </div>
        )}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  )
}

export default Signup
