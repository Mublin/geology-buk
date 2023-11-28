import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/useUserHook';

const NavBar = () => {
  const { state, logOutHandler } = useContext(UserContext);
  const { userDetails } = state;  
  return (
    <div className='nav'>
      <div className="logo"></div>
      <div className="nav-links">
        <div className="nav-link-container">
          <div className="nav-link">
            <Link to={'/home'} className='nav-item'>Home</Link>
          </div>
        </div>
        <div className="nav-link-container">
          <div className="nav-link">
            <div className='nav-item'>Programs</div>
            <div className="invisible">
              <p><Link className='nav-item' to={'/programs'}>Undergraduate</Link></p>
              <p><Link className='nav-item' to={'/home'}>Postgraduate</Link></p>
              <p><Link className='nav-item' to={'/home'}>Study materials</Link></p>
            </div>
          </div>
        </div>
        <div className="nav-link-container">
          <div className="nav-link">
            <div className="profile nav-item"> {userDetails ? userDetails.name : 'Profile'}</div>
            <div className="invisible">
              <p><Link to={'/profile'} className='nav-item'>Profile</Link></p>
              <p className='nav-item' onClick={()=>{logOutHandler()}}>Log-out</p>
            </div>
          </div>
        </div>
        <div className="nav-link-container">
          <div className="nav-link">
            <Link to={'/about'} className='nav-item'>About</Link>
          </div>
        </div>
        <div className="nav-link-container">
          <div className="nav-link">
            <Link to={'/contact'} className='nav-item'>Contact</Link>
          </div>
        </div>
        {userDetails ? <div className="nav-link-container">
          <div className="nav-link">
          <p className='nav-item' onClick={()=>{logOutHandler()}}>Log-out</p>
          </div>
        </div> : <div className="nav-link-container">
          <div className="nav-link">
            <Link to={'/signin'} className='nav-item'>Sign-in/Register</Link>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default NavBar;
