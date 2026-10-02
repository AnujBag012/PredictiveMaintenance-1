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
import Login from './components/Login'
import ComponentOverview from './components/ComponentOverview'
import UpdateMaintenance from './components/UpdateMaintenance'
import ComponentData from './components/ComponentData'
import MaintenanceList from './components/MaintenanceList'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path="/" element={<Navigate to="/Login" />} />
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
        <Route path='/Component-Maintenance' element={
          <ProtectedRoute>
            <ComponentOverview />
          </ProtectedRoute>
          
          }>
        </Route>
        <Route path='/Component-Maintenance/:component' element={
          <ProtectedRoute>
            <UpdateMaintenance />
          </ProtectedRoute>
          
          }>
        </Route>
        <Route path='/:component/data' element={
          <ProtectedRoute>
            <ComponentData />
          </ProtectedRoute>
          
          }>
        </Route>
        <Route path='/Maintenance-Order' element={
          <ProtectedRoute>
            <MaintenanceList />
          </ProtectedRoute>
          
          }>
        </Route>
      </Routes> 
    </BrowserRouter>
    
  )
}

export default App