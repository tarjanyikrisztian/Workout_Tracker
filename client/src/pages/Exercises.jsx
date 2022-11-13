import React from 'react'
import '../css/Exercises.css'
import { useState, useEffect } from 'react';
import { ExerciseModel } from '../models/ExerciseModel'
import { ExerciseModelSkeleton } from '../models/ExerciseModelSkeleton'
import Multiselect from 'multiselect-react-dropdown';
import { selectedMuscleGroups, setSelectedMuscleGroups, muscleGroups } from '../models/Global'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { getExercises, reset } from '../redux/exercises/exerciseSlice';
import { logout } from '../redux/auth/authSlice';
import { CreateExercise } from '../models/CreateExercise';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../models/Navbar';

export const Exercises = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [exercisesType, setExercisesType] = useState('all');

  const { exercises, isSuccess, isError, isLoading, message } = useSelector((state) => state.exercises);

  const [exercisesList, setExercisesList] = useState(exercises);

  useEffect(() => {
        if (message === "jwt expired") {
        toast.error("Your session has expired. Please log in again.");
        dispatch(logout());
    }
}, [message]);



  useEffect(() => {
    if (isError) {
      toast.error("Error fetching exercises");
      dispatch(reset());
    }

    setExercisesList(exercises);


    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError]);

  useEffect(() => {
    if (exercisesType === 'all') {
      setExercisesList(exercises);
    } else if (exercisesType === 'my') {
      setExercisesList(exercises.filter(exercise => exercise.user === user._id));
    } else if (exercisesType === 'liked') {
      setExercisesList(exercises.filter(exercise => exercise.likedBy.includes(user._id)));
    }
  }, [exercises, exercisesType]);


  const showLikedExercises = () => {
    const likedBtn = document.getElementById('likedExercisesBtn');
    if (document.getElementsByClassName('plusActive').length === 0) {
      likedBtn.classList.add('plusActive');
      setExercisesType('liked');
    } else if (likedBtn.classList.contains('plusActive')) {
      likedBtn.classList.remove('plusActive');
      setExercisesType('all');
    } else {
      const myBtn = document.getElementById('myExercisesBtn');
      myBtn.classList.remove('plusActive');
      showLikedExercises();
    }
  }

  const showMyExercises = () => {
    const myBtn = document.getElementById('myExercisesBtn');
    if (document.getElementsByClassName('plusActive').length === 0) {
      myBtn.classList.add('plusActive');
      setExercisesType('my');
    } else if (myBtn.classList.contains('plusActive')) {
      myBtn.classList.remove('plusActive');
      setExercisesType('all');
    } else {
      const likedBtn = document.getElementById('likedExercisesBtn');
      likedBtn.classList.remove('plusActive');
      showMyExercises();
    }
  }


  const onSelectMuscle = (selectedList) => {
    setSelectedMuscleGroups(selectedList);
    filterExercises();
  }

  const filterExercises = () => {
    if (selectedMuscleGroups.length === 0) {
      setExercisesList(exercises);
    } else {
      setExercisesList(exercises.filter(exercise => {
        return selectedMuscleGroups.some(selectedMuscleGroup => {
          return exercise.bodypart.includes(selectedMuscleGroup);
        })
      }));
    }
  }

  const searchExercises = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setExercisesList(exercises.filter(exercise => {
      return exercise.exercisename.toLowerCase().includes(searchValue);
    }));
  }





  const [openCreateExercise, setOpenCreateExercise] = useState(false);

  const open = () => { setOpenCreateExercise(true) }

  const close = () => { setOpenCreateExercise(false) }

  useEffect(() => {
    const excCont = document.getElementById("excCont");
    if (!user) {
      excCont.style.marginTop = '3rem';
      excCont.style.marginRight = '0';
      dispatch(reset());
      dispatch(getExercises());
    }
    else {
      excCont.style.marginTop = '0';
      excCont.style.marginRight = '3rem';
      dispatch(reset());
      dispatch(getExercises());
    }
  }, [user])

  let returnExercises = [];
  for (let i = 0; i < exercisesList.length; i++) {
    if (exercisesList[i]) {
      returnExercises.push(<ExerciseModel key_id={i} exercise={exercisesList[i]} />)
    }
  }

  return (
    <>
      {!user && <Navbar />}
      <div className="exercises" id='excCont'>
        <div className="exerciseSearch">
          <span className="searchBarWrap">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" placeholder="Search for an exercise" className="searchBar"
              onChange={searchExercises} />
            <form className="filterMuscleForm">
              <Multiselect
                isObject={false}
                options={muscleGroups}
                placeholder="Muscles"
                hidePlaceholder={true}
                id="muscleFilter"
                selectedValues={selectedMuscleGroups}
                onSelect={onSelectMuscle}
                onRemove={onSelectMuscle}
                closeIcon="cancel"
                style={{
                  optionContainer: { border: "none" },
                  chips: { margin: "1px", padding: "0", paddingLeft: "2px", paddingRight: "2px", backgroundColor: "var(--teal-500)", borderRadius: "5px", color: "#e4e4e4" },
                  searchBox: { border: "none", minWidth: "15rem", maxHeight: "3.5rem", backgroundColor: "#e4e4e4", cursor: "pointer", marginLeft: "0.5rem", marginRight: "0.5rem", padding: "1px", paddingBottom: "2px" },
                }}
                avoidHighlightFirstOption={true}
              />
            </form>
          </span>
          {user &&
            <div className="createExercise">
              <button className='btn plusMyExcBtn' id='myExercisesBtn' onClick={() => showMyExercises()}>
                <i className="fa-solid fa-database"></i>
              </button>
              <button className='btn plusHeartBtn' id='likedExercisesBtn' onClick={() => showLikedExercises()}>
                <i className="fa-solid fa-heart"></i>
              </button>
              <button className='btn plusBtn' onClick={() => (openCreateExercise ? close() : open())}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          }
        </div>
        {exercisesList.length === 0 ?
          (isLoading ?
            <div className='exerciseGrid'>
              <ExerciseModelSkeleton />
              <ExerciseModelSkeleton />
              <ExerciseModelSkeleton />
              <ExerciseModelSkeleton />
              <ExerciseModelSkeleton />
              <ExerciseModelSkeleton />
              <ExerciseModelSkeleton />
              <ExerciseModelSkeleton />
            </div>
            :
            <p className="noExercises">No exercises found. 😢</p>
          )
          :
          (
            <div className='exerciseGrid'>
              {returnExercises}
            </div>
          )}
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {openCreateExercise && <CreateExercise handleClose={close} />}
      </AnimatePresence>
    </>
  )
}
