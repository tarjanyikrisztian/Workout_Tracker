import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../css/Home.css'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    //a home page with navbar which has a link to the exercises page and a login register button, and a main section with a welcome message
    <>
      <div className="home">
        <nav>
          <h1 className="iconHomeTitle">Workout Tracker</h1>
          <i className="fa-solid fa-right-to-bracket iconHomeLogin"></i>
        </nav>
        <header>
          <h1>Welcome to the workout app</h1>
        </header>
        <main>
          <p>Here you can find and create exercises and create your own workouts and track them.</p>
        </main>
        <footer>
          <p>Created by:
            <a href="" target="_blank">Your name</a>
          </p>
        </footer>
      </div>

    </>
  )
}
