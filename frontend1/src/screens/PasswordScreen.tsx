import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/useUserHook'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getError } from '../components/getError'

const PasswordScreen = () => {
  const navigate = useNavigate()
  const {state} = useContext(UserContext)
  const { userDetails} = state
  const [oldPassword, setOldPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cPassword, setCPassword] = useState<string>('')
  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const {data}: {data :{
        message: string
      }} = await axios.post(`/api/users/changepassword/${userDetails?.id}`,{
        password: oldPassword,
        regNo: userDetails?.regNo,
        newPassword: password
      }, {
        headers : {
          authorization : `Bearer ${userDetails?.tokened}`
        }
      })
      if (data) {
        navigate('/profile')
        toast.success(data.message)
      }else{
        throw Error("Unable to change password")
      }
    } catch (error) {
      console.log(error)
      toast.error(getError(error))
    }
  }
  return (
    <div className='content'>
      <div className="register">
        <form onSubmit={submitHandler}>
          <label htmlFor="">
            Old password: <input type="password" name='old-pass' value={oldPassword} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setOldPassword(e.target.value)}}/>
          </label>
          <label htmlFor="">
            New password: <input type="password" name='new-pass' value={password} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setPassword(e.target.value)}}/>
          </label>
          <label htmlFor="">
            Confirm password: <input type="password" name='c-pass' required value={cPassword} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setCPassword(e.target.value)}} />
          </label>
          <div className="password">
            <button type='submit'>Change password</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordScreen