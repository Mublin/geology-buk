import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandPage from './screens/LandPage'
import Homepage from './screens/HomePage'
import RegisterPage from './screens/RegisterPage'
import SigninPage from './screens/SigninPage'
import AboutPage from './screens/AboutPage'
import ProfileScreen from './screens/ProfileScreen'
import NavBar from './components/NavBar'
import { Footer } from './components/Footer'
import CoursesPage from './screens/CoursesPage'
import CoursePage from './screens/CoursePage'
import ContactPage from './screens/ContactPage'
import { UserProvider, initialState } from './context/useUserHook'
import { ToastContainer } from 'react-toastify'
import  'react-toastify/dist/ReactToastify.css'
import AddLecturePage from './screens/AddLecturePage'

function App() {
  return (
    <>
    <BrowserRouter>
    <UserProvider userDetails={initialState.userDetails} >
      <div className='page'>
        <ToastContainer position='bottom-center'  />
        <div className='navy'>
        <NavBar/>
        </div>
        <div className="page-content">
      <Routes>
        <Route path='/' element={<LandPage />}/>
        <Route path='/home' element={<Homepage />}/>
        <Route path='/new-note' element={<AddLecturePage />}/>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/programs' element={<CoursesPage />} />
        <Route path='/programs/:program' element={<CoursePage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Routes>
        </div>
        <div className="footy">
        <Footer/>
        </div>
      </div>
      </UserProvider>
    </BrowserRouter>
    </>
  )
}

export default App
