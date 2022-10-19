import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthPage } from '../models/AuthPage';
import '../css/Home.css'


export const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const open = () => { setIsAuthOpen(true) }

  const close = () => { setIsAuthOpen(false) }
  return (
    <>
      <nav>
      <div className="navLinks">
          <Link to="/" className='navItem'><i className="fa-solid fa-question iconNav"></i></Link>
          <Link to="/exercises" className='navItem'><i className="fa-solid fa-dumbbell iconNav"></i></Link>
          </div>
          <Link to='/' className='navItem'><h1 className="iconHomeTitle"><span className='fancy'>Workout</span>Tracker</h1></Link>
        <i onClick={() => (isAuthOpen ? close() : open())}
          className="fa-solid fa-right-to-bracket iconNav"></i> 
      </nav>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {isAuthOpen && <AuthPage handleClose={close} />}
      </AnimatePresence>
    </>
  )
}
