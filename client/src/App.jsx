import './App.css'
import { Sidebar } from './models/Sidebar'
import { useState } from 'react';
import { Home } from './pages/Home'
import { Exercises } from './pages/Exercises'
import { Workouts } from './pages/Workouts'
import { Profile } from './pages/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useSelector } from 'react-redux';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  const { user } = useSelector(state => state.auth);



  return (
    <>
      <Router>
        <div className="App">
          {user && <Sidebar />}
          <Routes>
            <Route path="/"  element={user ? <Profile /> : <Home/>} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
