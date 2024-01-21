import React, { useEffect, useState } from 'react'
import './LevelPage.css'
import { useParams } from 'react-router-dom'
import { levelCourses } from '../context/data'
const LevelPage = () => {
    let {level} = useParams()
    function getlevel(courselevel : string | undefined) {
        if (courselevel) {
            return courselevel == '1' ? 'one' : courselevel == '2' ? 'two' :courselevel == '3' ? 'three' : 'four' 
        }
        return 'one'
    }
    const [course, setCourses] = useState<{
        first: {
            courseCode: string;
            courseName: string;
        }[];
        second: {
            courseCode: string;
            courseName: string;
        }[];
    } | null>(null)
    useEffect(()=>{

        const getCourses :{
            first: {
                courseCode: string;
                courseName: string;
            }[];
            second: {
                courseCode: string;
                courseName: string;
            }[];
        } = levelCourses[getlevel(level)]
        function standardizelength(ab: {
            courseCode: string;
            courseName: string;
        }[], bc: {
            courseCode: string;
            courseName: string;
        }[]) {
            if (ab.length > bc.length) {
                let no = ab.length - bc.length
                let newBc = bc
               for (let i = 0; i < no; i++) {
                   newBc = [...newBc, {courseCode: '.....', courseName: '.....'}]
               }
                return {first: ab, second: newBc}
            }
            if (bc.length > ab.length) {
                let no = bc.length - ab.length
                let newAb = ab
               for (let i = 0; i < no; i++) {
                   newAb = [...newAb, {courseCode: '.....', courseName: '.....'}]
               }
                return {first: newAb, second: bc}
            }
            return {first: ab, second: bc}
        };
        const newArray = standardizelength(getCourses.first, getCourses.second)
        setCourses(newArray)
    }, [level])
    return (
        <div>
          <h2>Course Table</h2>
          <table>
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>First Semester Course</th>
                <th>Second Semester Course</th>
              </tr>
            </thead>
            <tbody>
              {course?.first.map((firstItem, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><strong>{firstItem.courseCode + ' '}</strong>{firstItem.courseName}</td>
                  {course.second[i] && (
                    <>
                      <td><strong>{course.second[i].courseCode + ' '}</strong>{course.second[i].courseName}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
                  }
      
export default LevelPage