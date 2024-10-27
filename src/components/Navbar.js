import React, { useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const history =useNavigate()
    const logout = ()=>{
        localStorage.removeItem('token')
        history('/login')
    }
    let location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [location])
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/Notes" ? "active" : ""}`} aria-current="page" to="/Notes">Your Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
                            </li>
                        </ul>
                    </div>


                    {!localStorage.getItem('token')?<div className="d-flex">

                        <Link className={`btn btn-primary ${location.pathname === "/Login" ? "active" : ""}`} to="/Login">Login</Link>
                        <Link className={`btn btn-primary mx-2 ${location.pathname === "/Signup" ? "active" : ""}`} to="/Signup">SignUp</Link>

                    </div>:<button className='btn btn-primary' onClick={logout}>Logout</button>}
                </div>
            </nav>
        </>
    )
}
