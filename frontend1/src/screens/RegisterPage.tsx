import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/useUserHook'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const RegisterPage = () => {
  const navigate = useNavigate()
  const {state, registerHandler} = useContext(UserContext)
  const {userDetails} = state
  const [registrationNumber, setregistrationNumber] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cPassword, setCPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === cPassword) {
      registerHandler(registrationNumber, password, email, setIsLoading)
    } else {
      toast.error('passwords do not match')
    }
  }
  useEffect(()=>{
    userDetails && navigate('/home')
  },[userDetails])
  return (
    isLoading ? <Loader /> : <div className='content'>
      <div className="register">
        <form onSubmit={submitHandler}>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Registration Number: <input type="text" name='reg-no' placeholder='capital letters e.g EES/00/GEL/00000' required value={registrationNumber} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setregistrationNumber(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Email: <input type="email" name='email' placeholder='email address e.g abc@gmail.com' value={email} required onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setEmail(e.target.value)}}  />
          </label>
          {/* <label htmlFor="">
            File: <input type="file" name='lecture-note' accept='.pdf' onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setIgneous(e.target.files?.[0])}}  />
          </label> */}
          <label htmlFor="">
            Password: <input type="password" placeholder='something secret e.g girlfriend/boyfriend name' name='password' value={password} required onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setPassword(e.target.value)}} />
          </label>
          <label htmlFor="">
            Confirm Password: <input type="password" placeholder='re-enter password' value={cPassword} required onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setCPassword(e.target.value)}} />
          </label>
          <button type='submit'>Sign Up</button>
          <label className="forgotten" style={{marginBottom: '.6rem'}}>
            <h4>Already a user? <Link to={'/signin'}>Sign-in here</Link></h4>
          </label>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage