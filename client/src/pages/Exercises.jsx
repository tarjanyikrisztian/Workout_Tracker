import React from 'react'
import '../css/Exercises.css'
import { useState, useEffect } from 'react';
import { ExerciseModel } from '../models/ExerciseModel'
import Multiselect from 'multiselect-react-dropdown';
import {selectedMuscleGroups, setSelectedMuscleGroups, muscleGroups} from '../models/Global'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import { getExercises, reset } from '../redux/exercises/exerciseSlice';
import { CreateExercise } from '../models/CreateExercise';

export const Exercises = () => {
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  
  
  const {exercises, isError, isSuccess, message} = useSelector((state) => state.exercises);


  useEffect(() => {

    
    if(isError){
      toast.error(message);
    }
    if(isSuccess){

    }

    dispatch(getExercises());

    return () => {
      dispatch(reset());
    }

  }, [exercises,isError, isSuccess, message, dispatch]);

  const onSelectMuscle = (selectedList) => {
    setSelectedMuscleGroups(selectedList);
  }
  

  const [openCreateExercise, setOpenCreateExercise] = useState(false);

  const openCreateExerciseModal = () => {
    setOpenCreateExercise(true);
    setTimeout(() => {
      setOpenCreateExercise(false);
    }, 1000);
  }

  return (
    <>
    <div className="exercises">
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
              optionContainer:{border: "none" },
              chips:{margin:"1px",padding:"6px",paddingTop:"2px",paddingBottom:"2px",backgroundColor:"var(--teal-500)"}, 
              searchBox: {border: "none",width:"100%",height:"100%", backgroundColor: "transparent", cursor:"pointer", margin:"0",padding:"0",paddingLeft:"0.5rem",paddingRight:"0.5rem" },
            }}
            avoidHighlightFirstOption={true}
          />
        </form>
        </span>
        {user ?
        <div className="createExercise">
          <button className='btn' onClick={() => openCreateExerciseModal()}>
          <i className="fa-solid fa-plus"></i>
            Create exercise
          </button>
        </div>
        : null}
      </div>
      <div className='exerciseGrid'>
        {exercises.map((exercise, index) => (
          exercise===undefined ? 
          null
          :
          <ExerciseModel key={index} excName={exercise.exercisename} excDesc={exercise.description} bodyparts={exercise.bodypart}/>  
        ))}
      </div>
    </div>
    <CreateExercise open={openCreateExercise}/>
    </>
  )
}
