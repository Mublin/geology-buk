import React from 'react'

const SigninPage = () => {
  return (
    <div className='content'>
      <div className="signin">
        <form>
          <label htmlFor="">
            Registration Number:<input type="text"  />
          </label>
          <label htmlFor="">
            Password: <input type="password"  />
          </label>
        </form>
      </div>
    </div>
  )
}

export default SigninPage