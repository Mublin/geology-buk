import React, { MouseEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/useUserHook';

const NavBar = () => {
  const { state, logOutHandler } = useContext(UserContext);
  const { userDetails } = state;  
  const toggleHandler = (e: MouseEvent<HTMLDivElement>)=>{
        document.getElementById('program-toggle')?.classList.toggle('show-toggle')
  }
  const profileToggler = (e: MouseEvent<HTMLDivElement>)=>{
    document.getElementById('profile-toggle')?.classList.toggle('show-toggle')
  }
  const menuHandler = (e: MouseEvent<HTMLButtonElement>) =>{
    document.getElementById('nav-menu')!.classList.toggle('menuToggle')
  }
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
              <p><Link className='nav-item' to={'/programs/undergraduate'}>Undergraduate</Link></p>
              <p><Link className='nav-item' to={'/home'}>Postgraduate</Link></p>
              <p><Link className='nav-item' to={'/home'}>Study materials</Link></p>
              { userDetails?.isAdmin && <p><Link className='nav-item' to={'/updateadmin'}>Admin page</Link></p>}
              { userDetails?.isAdmin && <p><Link className='nav-item' to={'/new-note'}>Add lecture Note</Link></p>}
              { <p><Link className='nav-item' to={'/lecturenotes'}>Lecture Notes</Link></p>}
            </div>
          </div>
        </div>
        <div className="nav-link-container">
          <div className="nav-link">
            <div className="profile nav-item"> {userDetails ? userDetails.name : 'Profile'}</div>
            {userDetails?.registrationNumber && <div className="invisible">
              <p><Link to={'/profile'} className='nav-item'>Profile</Link></p>
              <p className='nav-item' onClick={()=>{logOutHandler()}}>Log-out</p>
            </div>}
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
        <div className="nav-link-container appear">
          <div className="nav-linkss">
            <div className="logo"></div>

            <div className='nav-button-div'>
              <button className='nav-button' onClick={menuHandler}>...</button>
            </div>
            
          </div>
          <div className="nav-iitems menuToggle" id='nav-menu'>
                  <div className="nav-link-container drop">
                <div className="nav-link">
                  <Link to={'/home'} className='nav-item'>Home</Link>
                </div>
              </div>
              <div className="nav-link-container drop">
                <div className="nav-link">
                  <div className='profile nav-item' onClick={toggleHandler}><p>Programs</p> <p>...</p></div>
                  <div className="invisible" id='program-toggle'>
                    <p><Link className='nav-item' to={'/programs/undergraduate'}>Undergraduate</Link></p>
                    <p><Link className='nav-item' to={'/home'}>Postgraduate</Link></p>
                    <p><Link className='nav-item' to={'/home'}>Study materials</Link></p>
                    { userDetails?.isAdmin && <p><Link className='nav-item' to={'/updateadmin'}>Admin page</Link></p>}
                    {userDetails?.isAdmin && <p><Link className='nav-item' to={'/new-note'}>Add lecture Note</Link></p>}
                    {<p><Link className='nav-item' to={'/lecturenotes'}>Lecture Notes</Link></p>}
                  </div>
                </div>
              </div>
              <div className="nav-link-container drop">
                <div className="nav-link" onClick={profileToggler}>
                  <div className="profile nav-item"> <p>{userDetails ? userDetails.name : 'Profile'}</p><p>...</p></div>
                  {userDetails ? <div className="invisible" id='profile-toggle'>
                    <p><Link to={'/profile'} className='nav-item'>Profile</Link></p>
                    <p className='nav-item' onClick={()=>{logOutHandler()}}>Log-out</p>
                  </div> :  <div className="nav-link-container">
          <div className="nav-link">
            <Link to={'/signin'} className='nav-item'>Sign-in/Register</Link>
          </div>
        </div>}
                </div>
              </div>
              <div className="nav-link-container drop">
                <div className="nav-link">
                  <Link to={'/about'} className='nav-item'>About</Link>
                </div>
              </div>
              <div className="nav-link-container drop">
                <div className="nav-link">
                  <Link to={'/contact'} className='nav-item'>Contact</Link>
                </div>
              </div>
              {userDetails ? <div className="nav-link-container drop">
                <div className="nav-link">
                <p className='nav-item' onClick={()=>{logOutHandler()}}>Log-out</p>
                </div>
              </div> : <div className="nav-link-container drop">
                <div className="nav-link">
                  <Link to={'/signin'} className='nav-item'>Sign-in/Register</Link>
                </div>
              </div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
