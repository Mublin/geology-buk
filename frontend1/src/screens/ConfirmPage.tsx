import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../context/useUserHook'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const ConfirmPage = () => {
    const navigate = useNavigate()
    const {state} = useContext(UserContext)
    const {userDetails} = state
    const [loading, setLoading] = useState<boolean>(false)
    const addHandler =async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`/api/course/code`, {
            headers: {
                authorization: `Bearer ${userDetails?.tokened}`
            }
        })
        window.location.href = data
      } catch (error) {
        toast.error('Unable to connect')
      } finally{
        setLoading(false)
      }
    }
    const questionHandler = async (answer: string) =>{
      if (answer === 'Yes') {
        await addHandler()
      } else {
        navigate('/home')
      }
    }
  return (
    <div className='content'>
      {loading ? <Loader /> : (
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
      )}
    </div>
  )
}

export default ConfirmPage