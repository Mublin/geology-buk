import React, { ChangeEvent, useState } from 'react'

const ContactPage = () => {
  const [name, setName] = useState<string>()
  const [number, setNumber] = useState<any>()
  const [email, setEmail] = useState<string>()
  const [message, setMessage] = useState<string>()
  const submitHandler = async () =>{

  }
  return (
    <div className='content'>
      <div id="contact">
      <div className="about-pg1 a1">
      </div>
      <div className="about-pg1 a2">
      <form onSubmit={submitHandler}>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Name:<input type="text" name='name' value={name} required onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setName(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Number: <input type="tel" name='telephone' required value={number} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setNumber(e.target.value)}}  />
          </label>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Email:<input type="text" name='email' value={email} required onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setEmail(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Message: <textarea name='message' required value={message} onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>{ setMessage(e.target.value)}}></textarea>
          </label>
          <button type='submit'>SUBMIT REQUEST</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default ContactPage