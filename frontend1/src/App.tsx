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
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import PasswordScreen from './screens/PasswordScreen'
import LectureNotesPage from './screens/LectureNotesPage'
import AddAdminPage from './screens/AddAdminPage'
import Level1Page from './screens/Level1Page'
import Level2Page from './screens/Level2Page'
import Level3Page from './screens/Level3Page'
import Level4Page from './screens/Level4Page'

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
        <Route path='/programs/1' element={<Level1Page />} />
        <Route path='/programs/2' element={<Level2Page />} />
        <Route path='/programs/3' element={<Level3Page />} />
        <Route path='/programs/4' element={<Level4Page />} />
        <Route path='/updateadmin' element={<AdminRoute><AddAdminPage /></AdminRoute>} />
        <Route path='/home' element={<Homepage />}/>
        <Route path='/new-note' element={<AdminRoute><AddLecturePage /></AdminRoute>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/programs/undergraduate' element={<CoursesPage />} />
        <Route path='/programs/undergraduate/:program' element={<ProtectedRoute><CoursePage /> </ProtectedRoute>} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/lecturenotes' element={<LectureNotesPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/profile' element={<ProtectedRoute> <ProfileScreen /> </ProtectedRoute>} />
        <Route path='/changepassword' element={<ProtectedRoute> <PasswordScreen /> </ProtectedRoute>} />
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
