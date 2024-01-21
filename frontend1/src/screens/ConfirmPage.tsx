import axios from 'axios'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../context/useUserHook'
import { useNavigate } from 'react-router-dom'

const ConfirmPage = () => {
    const navigate = useNavigate()
    const {state} = useContext(UserContext)
    const {userDetails} = state
    const addHandler =async () => {
      try {
        const {data} = await axios.get(`/api/course/code`, {
            headers: {
                authorization: `Bearer ${userDetails?.tokened}`
            }
        })
        window.location.href = data
      } catch (error) {
        toast.error('Unable to connect')
      }
    }
    const questionHandler = (answer: string) =>{
      if (answer === 'Yes') {
        addHandler()
      } else {
        navigate('/home')
      }
    }
  return (
    <div className='content'>
      <div className="confirmation">
        <div>
          <div className="que">
            <h3>Do you want to add a lecture note?</h3>
          </div>
          <div className="ans">
            <button onClick={()=>{questionHandler('Yes')}}>Yes</button>
            <button onClick={()=>{questionHandler('No')}}>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPage