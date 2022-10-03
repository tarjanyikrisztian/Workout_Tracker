import './App.css'
import { AuthPage } from './models/AuthPage'
import { Sidebar } from './models/Sidebar'
import { useState } from 'react';


function App() {
  

  return (
    <div className="App">
        <Sidebar />
        <AuthPage />
    </div>
  )
}

export default App
