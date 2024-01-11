import React, { useContext, useEffect, useState } from 'react'
import './LectureNotesPage.css'
import { lectureNote } from '../types/types'
import axios from 'axios'
import { UserContext } from '../context/useUserHook'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { getError } from '../components/getError'

const LectureNotesPage = () => {
    const {state} = useContext(UserContext)
    const {userDetails} = state
    const [lectureNotes, setLectureNotes] = useState<lectureNote[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(()=>{
        const fetchNotes = async ()=>{
            try {
                setIsLoading(true)
            const {data}: {data : lectureNote[]} = await axios.get(`/api/course/lecturenotes`, {
                headers: {
                    authorization: `Bearer ${userDetails?.tokened}`
                }
            })
            if (data) {
                setLectureNotes(data)
                setIsLoading(false)
            }
            } catch (error) {
                toast.error('Unable to fetch lecture-notes')
            } finally{
                setIsLoading(false)
            }
        }
        fetchNotes()
    },[])
    const deleteHandler= async(unique: number)=>{
        setIsLoading(true)
        try {
            const {data}: {data: {message: string}} = await axios.delete(`/api/course/lecturenote/${unique}`, {
                headers: {
                    authorization: `Bearer ${userDetails?.tokened}`
                }
            })
                setLectureNotes(lectureNotes.filter(x=> x.id !== unique))
                toast.success(data.message)
        } catch (error) {
            toast.error(getError(error))
        } finally {
            setIsLoading(false)
        }
    }
  return ( isLoading ? <Loader /> : <div className='content'>
  <div className="lecture-note">
  <div className="container">
<h2> Lecture Notes</h2>
<ul className="responsive-table">
<li className="table-header">
<div className="col col-1">Course Code</div>
<div className="col col-3">Course Title</div>
<div className="col col-4">Level</div>
<div className="col col-4">Lecture file</div>
<div className="col col-3">Action</div>
</li>
{lectureNotes.map((notes)=>(
  <li className="table-row" key={notes.id}>
  <div className="col col-1" data-label="Course Code">{notes.course_code}</div>
  <div className="col col-3" data-label="Course Title">{notes.course_title}</div>
  <div className="col col-4" data-label="Level">{notes.level}</div>
  <div className="col col-4" data-label="Lecture File">
    <a
      href={`/api/course/download/${encodeURIComponent(notes.file_path)}`}
      target='_blank'
      download={notes.course_title}
    >
      {notes.course_title}
    </a>
  </div>
  <div className="col col-4"><button onClick={()=>{deleteHandler(notes.id)}}>Delete</button></div>

</li>
))}
</ul>
</div>
  </div>
</div>
    
  )
}

export default LectureNotesPage