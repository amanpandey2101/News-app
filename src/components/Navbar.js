import React from 'react'
import '../global.css'
import { Link } from 'react-router-dom'
const Navbar=()=>{

    return (
      <div className="nav">
        <nav className="navbar fixed-top navbar-expand-lg bg-dark">
        <div className='image'>
        <Link className="navbar-brand" to="/">
              <img src={require('./logo2.png')} alt="" height={'60px'} width={'60px'} ></img>
            </Link>
        </div>
          <div className="container-fluid"> 
            <button className="navbar-toggler"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to ="/general">General</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to ="/business">Business</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to ="/entertainment">Entertainment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to ="/health">Health</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to ="/science">Science</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to ="/sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to ="/technology">Technology</Link>
                </li>
              
                </ul>
              
            </div>
          </div>
        </nav>
      </div>
    )
  }

export default Navbar
