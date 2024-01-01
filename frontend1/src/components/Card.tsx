import React from 'react'


export default function Card({level}: {level: string}) {
  return (
    <div className='card'>
        <div className="card-image">
            <img src={'h'} alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level {level ? level : 1}</h3>
            </div>
            <div className="card-description">
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    </div>
  )
}
