import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/useUserHook'
import Loader from '../components/Loader'

const SigninPage = () => {
  const navigate = useNavigate()
  const { state, signInHandler } = useContext(UserContext)
  const {userDetails } = state
  const [registrationNumber, setregistrationNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInHandler(registrationNumber, password, setIsLoading)
  }
  useEffect(()=>{
    userDetails && navigate('/home')
  },[userDetails])
  return (
    isLoading ? <Loader /> : <div className='content'>
      <div className="signin">
        <form onSubmit={submitHandler}>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Registration Number:<input type="text" name='Reg-no' required placeholder='Capital letters e.g EES/00/GEL/00000' value={registrationNumber} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setregistrationNumber(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Password: <input type="password" placeholder='something secret like birth year e.g 1198' name='password' required  value={password} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setPassword(e.target.value)}}  />
          </label>
          <button type='submit'>Sign-in</button>
          <div className="forgotten">
            <h4>Forgotten password? <Link to={'/forgottenpassword'}>click here</Link></h4>
          </div>
          <label className="forgotten" style={{marginBottom: '.6rem'}}>
            <h4>New User? <Link to={'/register'}>Sign-up here</Link></h4>
          </label>
        </form>
      </div>
    </div>
  )
}

export default SigninPage