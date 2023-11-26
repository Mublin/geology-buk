import React from 'react'

const RegisterPage = () => {
  return (
    <div className='content'>
      <div className="register">
        <form>
          <label htmlFor="">
            Registration Number: <input type="text"  />
          </label>
          <label htmlFor="">
            Password: <input type="password"  />
          </label>
          <label htmlFor="">
            Confirm Password: <input type="password"  />
          </label>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage