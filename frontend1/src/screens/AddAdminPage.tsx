import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/useUserHook'
import Loader from '../components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddAdminPage = () => {
  const navigate = useNavigate()
  const { state } = useContext(UserContext)
  const {userDetails } = state
  const [registrationNumber, setregistrationNumber] = useState<string>('')
  const [adminApp, setAdminApp] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
   try {
    setIsLoading(true)
    const {data} = await axios.put(`http://localhost:9000/api/users/adupdate`,
    {
        registrationNumber,
        adminApp
    }, {
        headers: {
            authorization: `Bearer ${userDetails?.tokened}`
        }
    })
    if (data) {
        toast.success(data.message)
    }
   } catch (error) {
        toast.error("unable to update details")
   } finally {
    setIsLoading(false)
   }
  }
  return (
    isLoading ? <Loader /> : <div className='content'>
      <div className="signin">
        <form onSubmit={submitHandler}>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Registration Number:<input type="text" name='Reg-no' required placeholder='Capital letters e.g EES/00/GEL/00000' value={registrationNumber} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setregistrationNumber(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Admin: <select name="adminvery" required value={adminApp} onChange={(e: ChangeEvent<HTMLSelectElement>)=>{ setAdminApp(e.target.value)}} id="adminselect">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddAdminPage