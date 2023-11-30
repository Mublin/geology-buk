import React, { ReactElement, useContext } from 'react'
import { UserContext } from '../context/useUserHook'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}: any) => {
    const {state} = useContext(UserContext)
    const { userDetails } = state
  return (userDetails?.isAdmin ? children : <Navigate to={'/home'}/>)
}

export default AdminRoute;