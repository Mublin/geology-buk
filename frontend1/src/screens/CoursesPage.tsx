import React from 'react'
import pic from '../assets/IMG_3417.svg'
import { Link } from 'react-router-dom'

const CoursesPage = () => {
  return (
    <div className='content'>
      <div className="courses">
        <div className="level-selection">
          <h3>Select your level</h3>
        </div>
        <div className="levels">
        <div className='card'>
        <Link to={'/programs/1'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src={pic} alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level 1</h3>
            </div>
            <div className="card-description">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
        </Link>
    </div>
    <div className='card'>
    <Link to={'/programs/2'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src={pic} alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level 2</h3>
            </div>
            <div className="card-description">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
        </Link>
    </div>
    <div className='card'>
    <Link to={'/programs/3'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src={pic} alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level 3</h3>
            </div>
            <div className="card-description">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
        </Link>
    </div>
    
    
    <div className='card'>
    <Link to={'/programs/4'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src={pic} alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level 4</h3>
            </div>
            <div className="card-description">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
      </Link>
    </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesPage