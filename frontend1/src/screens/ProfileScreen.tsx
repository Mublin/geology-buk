import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/useUserHook'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getError } from '../components/getError'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const {state} = useContext(UserContext)
  const { userDetails} = state
  const [email, setEmail] = useState<string>('')
  const [regNo, setRegNo] = useState<string>('')
  const [name, setName] = useState<string>('')
  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const {data}: {data: {message: string}} = await axios.put(`http://localhost:9000/api/users/${userDetails?.id}`, {
        email
      }, {
        headers:{
          authorization: `Bearer ${userDetails?.tokened}`
        }
      })
      if (data) {
        toast.success(data.message)
        return
      } else {
        throw Error('unable to change email')
      }
    } catch (error) {
      toast.error(getError(error))
    }
  }
  useEffect(()=>{
    const fetchData = async () =>{
      const {data}: {data :{
        regNo: string,
        name: string,
        email: string
      }} = await axios.get(`http://localhost:9000/api/users/${userDetails?.id}`, {
        headers : {
          authorization : `Bearer ${userDetails?.tokened}`
        }
      })
      if (data) {
        setEmail(data.email)
        setName(data.name)
        setRegNo(data.regNo)
      }
    }
    fetchData()
  },[userDetails?.id])
  return (
    <div className='content'>
      <div className="register">
        <form onSubmit={submitHandler}>
          <label htmlFor="">
            Registration Number: <input type="text" name='reg-no' value={regNo} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setRegNo(e.target.value)}} disabled />
          </label>
          <label htmlFor="">
            Name: <input type="text" name='reg-no' value={name} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setName(e.target.value)}} disabled />
          </label>
          <label htmlFor="">
            Email: <input type="email" name='email' required value={email} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setEmail(e.target.value)}} />
          </label>
          <button type='submit'>Change details</button>
          <div className="password">
            <button onClick={()=>{navigate('/changepassword')}}>Change password</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileScreen