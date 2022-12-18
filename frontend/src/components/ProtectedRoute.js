import React from 'react';
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({ isLoggedIn, path, children }) => {
    //console.log(isLoggedIn)
    return (isLoggedIn ? children : <Navigate to={"/siginup"} />)
}

export default ProtectedRoute