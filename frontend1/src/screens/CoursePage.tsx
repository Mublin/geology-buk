import React from 'react'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'

const CoursePage = () => {
  const {program} = useParams()
  return (
    <div className='content'>
      <div className="course-level">
        <div className="level-title">
          <h3>Level {program}</h3>
        </div>
        <div className="level-courses">
          {program && <Card level={program}/>}
          {program && <Card level={program}/>}
          {program && <Card level={program}/>}
          {program && <Card level={program}/>}
        </div>
      </div>
    </div>
  )
}

export default CoursePage