import React from 'react'
import '../css/Exercises.css'
import { useState, useEffect } from 'react';
import { ExerciseModel } from '../models/ExerciseModel'
import Multiselect from 'multiselect-react-dropdown';
import { selectedMuscleGroups, setSelectedMuscleGroups, muscleGroups } from '../models/Global'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { getExercises, reset } from '../redux/exercises/exerciseSlice';
import { CreateExercise } from '../models/CreateExercise';
import {motion, AnimatePresence} from 'framer-motion';
import { Navbar } from '../models/Navbar';

export const Exercises = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [exercisesType, setExercisesType] = useState('all');

  const { exercises, isSuccess, isError, isLoading, message } = useSelector((state) => state.exercises);

  const [exercisesList, setExercisesList] = useState(exercises);

  const [myExercises, setMyExercises] = useState([]);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching exercises");
      dispatch(reset());
    }

    if (isLoading) {
      toast.loading("Loading exercises...");
    }

    dispatch(getExercises());

    setExercisesList(exercises);
    

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError]);

  useEffect(() => {
    if (exercisesType === 'all') {
    setExercisesList(exercises);
    } else if (exercisesType === 'my') {
      setExercisesList(myExercises);
    }
  }, [exercises, exercisesType]);


  const showLikedExercises = () => {
    //sort by user liked exercises
    setExercisesType('liked');
  }

  const showMyExercises = () => {
    setMyExercises(exercises.filter(exercise => exercise.user === JSON.parse(localStorage.getItem('user'))._id));
    console.log(myExercises);
    setExercisesType('my');

  }


  const onSelectMuscle = (selectedList) => {
    setSelectedMuscleGroups(selectedList);
  }


  const [openCreateExercise, setOpenCreateExercise] = useState(false);

  const open = () => {setOpenCreateExercise(true)}

  const close = () => {setOpenCreateExercise(false)}

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

  return (
    <>
    {!user && <Navbar />}
      <div className="exercises" id='excCont'>
        <div className="exerciseSearch">
          <span className="searchBarWrap">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" placeholder="Search for an exercise" className="searchBar" />
            
          </span>
          <form className="filterMuscleForm">
              <Multiselect
                isObject={false}
                options={muscleGroups}
                placeholder="Muscle groups"
                hidePlaceholder={true}
                id="muscleFilter"
                selectedValues={selectedMuscleGroups}
                onSelect={onSelectMuscle}
                onRemove={onSelectMuscle}
                closeIcon="cancel"
                style={{
                  optionContainer: { border: "none" },
                  chips: { margin: "1px", padding:"0", paddingLeft: "2px",paddingRight: "2px", backgroundColor: "var(--teal-500)", borderRadius: "5px", color: "white" },
                  searchBox: { border: "none", maxWidth: "15rem", maxHeight: "3rem", backgroundColor: "white", cursor: "pointer", margin: "0", padding: "1px",paddingBottom:"2px"},
                }}
                avoidHighlightFirstOption={true}
              />
            </form>
          {user &&
            <div className="createExercise">
              <button className='btn plusMyExcBtn' onClick={() => showMyExercises()}>
                <i className="fa-solid fa-database"></i>
              </button>
              <button className='btn plusHeartBtn' onClick={() => showLikedExercises()}>
                <i className="fa-solid fa-heart"></i>
              </button>
              <button className='btn plusBtn' onClick={() => (openCreateExercise ? close() : open())}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            }
        </div>
        <div className='exerciseGrid'>
          {exercisesList.map((exercise, index) => (
            exercise === undefined ?
              null
              :
              <ExerciseModel key={index} excName={exercise.exercisename} excDesc={exercise.description} bodyparts={exercise.bodypart} id={exercise._id}/>
          ))}
        </div>
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
