import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../css/Home.css'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthPage } from '../models/AuthPage';
import { Navbar } from '../models/Navbar';

export const Home = () => {

  setTimeout(() => {
    const left = document.getElementById("left");

    const handleMove = e => {
      left.style.width = `${e.clientX / window.innerWidth * 100}%`;
    }

    document.onmousemove = e => handleMove(e);

    document.ontouchmove = e => handleMove(e.touches[0]);
  }, 10);

  return (
    <>
      <div className="home">
        <Navbar />
        <main>
          <div className='homeHeader' id='left'>
            <p className="title">Get better<br />
              <span className="fancy">results</span></p>
          </div>
          <div className='homeHeader' id='right'>
            <p className="title">Track your<br />
              <span className="fancy">workouts</span></p>
          </div>
        </main>
      </div>
      
    </>
  )
}
