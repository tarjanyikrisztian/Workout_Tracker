import React from 'react'
import '../css/ExerciseModel.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeExercise, dislikeExercise, reset } from '../redux/exercises/exerciseSlice';
import { Buffer } from 'buffer';


export const ExerciseModel = ({ exercise, key_id }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [hasBackground, sethasBackground] = useState(exercise.image ? true : false);

    let returnParts = [];
    for (let i = 0; i < exercise.bodypart.length; i++) {
        returnParts.push(<span className="bodypart" key={i}>{exercise.bodypart[i]}</span>)
    }

    const handleLike = () => {
        if (exercise.likedBy.includes(user._id)) {
            dispatch(dislikeExercise(exercise._id));
        } else {
            dispatch(likeExercise(exercise._id));
        }
    }

    useEffect(() => {
        const exercises = document.getElementById(`exercise-${key_id}`);
        if (!hasBackground) {
            exercises.style.backgroundImage = "url('https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')";
        } else {
            console.log(exercise.image);
            let image = Buffer.from(exercise.image, 'base64').toString('ascii');
            exercises.style.backgroundImage = `url('data:image/png;base64,${image}')`;
        }
    }, []);

    let id_name = `exercise-${key_id}`;

    return (
        <div className="exerciseModel" >
            <div className='exerciseContainer' id={id_name}>
                <div className="containerGradient">

                    <span className="exerciseName">{exercise.exercisename}</span>
                    <div className="exerciseDescription">
                        {exercise.description}
                    </div>
                    {(user && (user._id !== exercise.user)) && 
                    (exercise.likedBy.includes(user._id) ? (            
                                <i className="fa-solid fa-heart heart-like liked" onClick={() => handleLike()}></i>
                        ) : (

                                <i className="fa-solid fa-heart heart-like" onClick={() => handleLike()}></i>
                        )
                    )}
                    {(user && (user._id === exercise.user))
                        // make exercise editable where user can edit and delete exercise
                        ? (
                            <i className="fa-solid fa-pen pen-edit"></i>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
            <div className="bodypartsContainer">
                {returnParts}
            </div>
        </div>
    )
}


