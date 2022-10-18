import React from 'react'
import '../css/Exercises.css'
import { useState, useEffect } from 'react';
import { ExerciseModel } from '../models/ExerciseModel'
import Multiselect from 'multiselect-react-dropdown';
import { selectedMuscleGroups, setSelectedMuscleGroups, muscleGroups } from '../models/Global'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { toast } from 'react-toastify';
import { getExercises, reset } from '../redux/exercises/exerciseSlice';
import { CreateExercise } from '../models/CreateExercise';
import {motion, AnimatePresence} from 'framer-motion';
import { Navbar } from '../models/Navbar';

export const Exercises = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { exercises, isSuccess, isError, isLoading } = useSelector((state) => state.exercises, shallowEqual);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching exercises");
      dispatch(reset());
    }

    dispatch(getExercises());

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError]);


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
    }
    else {
      excCont.style.marginTop = '0';
      excCont.style.marginRight = '3rem';
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
            <form className="filterMuscleForm">
              <Multiselect
                isObject={false}
                options={muscleGroups} // Options to display in the dropdown
                placeholder="Muscle groups"
                hidePlaceholder={true}
                id="muscleFilter"
                selectedValues={selectedMuscleGroups} // Preselected value to persist in dropdown
                onSelect={onSelectMuscle} // Function will trigger on select event
                onRemove={onSelectMuscle}
                closeIcon="cancel"
                style={{
                  optionContainer: { border: "none" },
                  chips: { margin: "1px", padding: "6px", paddingTop: "2px", paddingBottom: "2px", backgroundColor: "var(--teal-500)" },
                  searchBox: { border: "none", width: "100%", height: "100%", backgroundColor: "transparent", cursor: "pointer", margin: "0", padding: "0", paddingLeft: "0.5rem", paddingRight: "0.5rem" },
                }}
                avoidHighlightFirstOption={true}
              />
            </form>
          </span>
          {user &&
            <div className="createExercise">
              <button className='btn plusMyExcBtn' >
                <i className="fa-solid fa-database"></i>
              </button>
              <button className='btn plusHeartBtn' >
                <i className="fa-solid fa-heart"></i>
              </button>
              <button className='btn plusBtn' onClick={() => (openCreateExercise ? close() : open())}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            }
        </div>
        <div className='exerciseGrid'>
          {exercises.map((exercise, index) => (
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
