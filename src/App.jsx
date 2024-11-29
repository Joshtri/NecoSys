import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/' element={<Login/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
