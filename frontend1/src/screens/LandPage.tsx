import React from 'react'
import './LandPage.css'
import { useNavigate } from 'react-router-dom'



const LandPage = () => {
  const navigate = useNavigate()
  return (
    <div className="content">
    <div className='land'>
       <div className='geology'>
        <div className="head">
          <h1>Geology Department</h1>
        </div>
        <div className="head-text">
          <p><h4>" You are welcome to the one of the most important professional, academic and economic enhancing courses. The development of any nation depends on availability of income generating resources. Since geologist creates wealth, we believe that economic depression or shortages of natural resources will arise not from physical exhaustion of geological resources but from courses related to technology/exploitation, environment or societal pressures. The economic geological resources are sufficient to meet the growing demand industrial and future demographic changes. Nigeria and indeed Africa is endowed with wide range of mineral resources the vast majority of which are either unexploited or under-exploited. We in Bayero University are Committed to producing trend Geologist that will participate in reagional research and exploration in the Geology and contribute towards wealth creation and as well as community services in any appropriate way,  Irrespective race, creed, religion, gender, nationality or ethnicity. We train geologist in both theoritical or relevant practical skills in ping and data interpretation that can compete effectively with other graduates and contribute positively in the national building" </h4></p>   
        </div>
       </div>
       <div className='geology-action'>
       <button onClick={()=> {navigate('/home')}}>Find out more</button>
       </div>
    </div>
    </div>
  )
}

export default LandPage