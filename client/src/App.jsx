import './App.css'
import { Sidebar } from './models/Sidebar'
import { useState } from 'react';
import { Home } from './pages/Home'
import { Exercises } from './pages/Exercises'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {


  return (
    <>
      <Router>
        <div className="App">
          <Sidebar />
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/exercises" element={<Exercises />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
