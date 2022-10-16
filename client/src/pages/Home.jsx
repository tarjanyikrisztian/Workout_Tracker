import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../css/Home.css'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthPage } from '../models/AuthPage';

export const Home = () => {

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const open = () => { setIsAuthOpen(true) }

  const close = () => { setIsAuthOpen(false) }

  const setParentWidth = (parent) => {
    if (parent) {
      parent.style.width = '100%';
    }
  }

  return (
    <>
      <div className="home">
        <nav>
          <h1 className="iconHomeTitle">Workout Tracker</h1>
          <i onClick={() => (isAuthOpen ? close() : open())}
            className="fa-solid fa-right-to-bracket iconHomeLogin"></i>
        </nav>
        <main>
          <div className='homeHeader'>
            <h1>Welcome to the workout app</h1>
            <p>Here you can find and create exercises and create your own workouts and track them.</p>
          </div>

          <div className="row">
            <section className='homeLong1'></section>
            <section className='homeShort1'>
            <i className='fa-solid fa-angle-double-left short1open'></i>
            </section>
          </div>

          <div className="row">
            <section className='homeShort2'><i className='fa-solid fa-angle-double-right short2open'></i></section>
            
            <section className='homeLong2'></section>
          </div>
        </main>
        <footer>
          <p>Created by:
            <a href="" target="_blank">Your name</a>
          </p>
        </footer>
      </div>
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
