import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='nav'>
        <div className="logo"></div>
        <div className="nav-links">
            <div className="nav-link">
                <Link to={'/'} className='nav-item'>Home</Link>
            </div>
            <div className="nav-link">
                <Link to={'/programs'} className='nav-item'>Programs</Link>
            </div>
            
            <div className="nav-link">
                <div className="profile">Profile</div>
            </div>
            <div className="nav-link">
                <Link to={'/about'} className='nav-item'>About</Link>
            </div>
            <div className="nav-link">
                <Link to={'/contact'} className='nav-item'>Contact</Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar