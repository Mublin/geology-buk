import axios from 'axios'
import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'

const AddLecturePage = () => {
    const [courseTitle, setCourseTitle] = useState<string>('')
    const [courseCode, setCourseCode] = useState<string>('')
    const [lectureNote, setLectureNote] = useState<any>(null)
    const [level, setLevel] = useState<number>(0)
    const submitHandler = async (e: MouseEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (lectureNote) {
            console.log(lectureNote)
            try {
                const formData = new FormData()
                formData.append('file', lectureNote);
                formData.append('courseTitle', courseTitle);
                formData.append('courseCode', courseCode);
                formData.append('level', level.toString());
                const {data} :{data: {
                    message: string
                }} = await axios.post(`http://localhost:9000/api/course/newnote`, formData)
                if (data) {
                    toast.success(data.message)
                }
            } catch (error: any) {
                toast.error(error.message)
            }
        }
    }
  return (
    <div className='content'>
      <div className="register">
        <form onSubmit={submitHandler}>
          <label htmlFor="">
            Course Title: <input type="text" name='courseTitle' value={courseTitle} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setCourseTitle(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Course Code: <input type="text" name='courseCode' value={courseCode} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setCourseCode(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Upload Lecture Note: <input type="file" name='lecture-note' accept='.pdf' onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setLectureNote(e.target.files?.[0])}}  />
          </label>
          <label htmlFor="">
            Level: <input type="number" name='level' value={level} onChange={(e: ChangeEvent<HTMLInputElement>) => { setLevel(parseInt(e.target.value, 10)) }} />
        </label>

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default AddLecturePage