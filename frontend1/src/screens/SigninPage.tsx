import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/useUserHook'

const SigninPage = () => {
  const navigate = useNavigate()
  const { state, signInHandler } = useContext(UserContext)
  const {user } = state
  const [regNo, setRegNo] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInHandler(regNo, password)
  }
  useEffect(()=>{
    user && navigate('/home')
  },[user])
  return (
    <div className='content'>
      <div className="signin">
        <form onSubmit={submitHandler}>
          <label htmlFor="">
            Registration Number:<input type="text" name='Reg-no' value={regNo} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setRegNo(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Password: <input type="password" name='password'  value={password} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setPassword(e.target.value)}}  />
          </label>
          <button type='submit'>Sign-in</button>
          <div className="forgotten">
            <h4>Forgotten password? <Link to={'/forgottenpassword'}>click here</Link></h4>
          </div>
          <div className="forgotten">
            <h4>New User? <Link to={'/register'}>Sign-up here</Link></h4>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SigninPage