import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [regNo, setRegNo] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cPassword, setCPassword] = useState<string>('')
  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({regNo, password, cPassword})
  }
  return (
    <div className='content'>
      <div className="register">
        <form onSubmit={submitHandler}>
          <label htmlFor="">
            Registration Number: <input type="text" name='reg-no' value={regNo} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setRegNo(e.target.value)}}  />
          </label>
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