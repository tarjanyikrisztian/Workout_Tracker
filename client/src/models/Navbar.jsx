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
          <Link to='/' className="iconHomeTitle"><h1 >Workout Tracker</h1></Link>
          <i onClick={() => (isAuthOpen ? close() : open())}
            className="fa-solid fa-right-to-bracket iconHomeLogin"></i>
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
