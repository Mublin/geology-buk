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
      <div className="a1">
      <div>
        <h2>For enquries:</h2>
        <div>
          <p>Phone: +2348123456789</p>
          <p>WhatsApp: <a href="https://wa/123" style={{color: 'lightblue'}} >WhatsApp link</a></p>
          <p>Email: geology@buk.com</p>
        </div>
      </div>
      <div></div>
      </div>
      <div className="a2">
      <form className='contact' onSubmit={submitHandler}>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Name:<input type="text" name='name' value={name} placeholder='Yusuf Zaki' required onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setName(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Number: <input type="tel" name='telephone' placeholder='+234810000000' required value={number} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setNumber(e.target.value)}}  />
          </label>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Email:<input type="text" name='email' placeholder='e.g abc@gmail.com' value={email} required onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setEmail(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Message: <textarea name='message' placeholder='write a message' required value={message} onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>{ setMessage(e.target.value)}}></textarea>
          </label>
          <button type='submit'>SUBMIT REQUEST</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default ContactPage