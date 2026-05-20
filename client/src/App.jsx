// import React from 'react'
import './App.css'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './components/Dashboard'
import Electrical from './components/Electrical'
import Electronic from './components/Electronic'
import Mechanical from './components/Mechanical'
import Pneumatic from './components/Pneumatic'
import Signup from './components/Signup'
import Login from './components/login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          
          }>
        </Route>
        <Route path='/dashboard/mechanical' element={
          <ProtectedRoute>
            <Mechanical />
          </ProtectedRoute>
          
          }>
        </Route>
        <Route path='/dashboard/electrical' element={
          <ProtectedRoute>
            <Electrical />
          </ProtectedRoute>
          
          }>
        </Route>
        <Route path='/dashboard/electronic' element={
          <ProtectedRoute>
            <Electronic />
          </ProtectedRoute>
          
          }>
        </Route>
        <Route path='/dashboard/pneumatic' element={
          <ProtectedRoute>
            <Pneumatic />
          </ProtectedRoute>
          
          }>
        </Route>
      </Routes> 
    </BrowserRouter>
    
  )
}

export default App