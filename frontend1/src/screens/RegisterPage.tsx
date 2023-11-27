import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/useUserHook'

const RegisterPage = () => {
  const navigate = useNavigate()
  const {state, registerHandler} = useContext(UserContext)
  const {userDetails} = state
  const [regNo, setRegNo] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cPassword, setCPassword] = useState<string>('')
  // const [igneous, setIgneous] = useState<any>(null)
  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerHandler(regNo, password, email)
  }
  useEffect(()=>{
    userDetails && navigate('/home')
  },[userDetails])
  return (
    <div className='content'>
      <div className="register">
        <form onSubmit={submitHandler}>
          <label htmlFor="">
            Registration Number: <input type="text" name='reg-no' value={regNo} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setRegNo(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Email: <input type="email" name='email' value={email} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setEmail(e.target.value)}}  />
          </label>
          {/* <label htmlFor="">
            File: <input type="file" name='lecture-note' accept='.pdf' onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setIgneous(e.target.files?.[0])}}  />
          </label> */}
          <label htmlFor="">
            Password: <input type="password" name='password' value={password} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setPassword(e.target.value)}} />
          </label>
          <label htmlFor="">
            Confirm Password: <input type="password"  value={cPassword} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setCPassword(e.target.value)}} />
          </label>
          <button type='submit'>Sign Up</button>
          <div className="forgotten">
            <h4>Already a user? <Link to={'/signin'}>Sign-in here</Link></h4>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage