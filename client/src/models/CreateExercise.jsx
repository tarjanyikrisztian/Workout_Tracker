import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../css/Exercises.css'
import Multiselect from 'multiselect-react-dropdown';
import { muscleGroups } from '../models/Global'
import { createExercise, reset } from '../redux/exercises/exerciseSlice';


export const CreateExercise = ({ open }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { isError, isSuccess, message } = useSelector((state) => state.exercises);

    const [newExerciseMuscleGroups, setNewExerciseMuscleGroups] = useState([]);
    const [isPublic, setIsPublic] = useState(false);

    const onSelectMuscle = (selectedList) => {
        setNewExerciseMuscleGroups(selectedList);
    }

    const [formDataExc, setFormDataExc] = useState({
        exercisename: "",
        bodypart: newExerciseMuscleGroups,
        description: "",
        ispublic: isPublic,
        user: ""
    });


    const { exercisename, description } = formDataExc;

    const onChangeExc = (e) => {
        setFormDataExc((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if (user !== null) {
            const user = user._id;
        }
        const bodypart = newExerciseMuscleGroups;
        const ispublic = isPublic;
        const newExercise = {
            exercisename,
            bodypart,
            description,
            ispublic,
            user
        }
        if (bodypart.length === 0) {
            toast.error("Please select at least one muscle group");
        } else {
            dispatch(createExercise(newExercise));
            close();
        }
    }


    const [openCreateExercise, setOpenCreateExercise] = useState(false);

    useEffect(() => {
        if (open) {
            setOpenCreateExercise(true);
            setTimeout(() => {
                const container = document.querySelector('.containerCreateExercise');
                container.style.transform = 'translate(-50%, -50%)';
            }, 100);
        }
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
        }

        return () => {
            dispatch(reset());
        }
    }, [open, isError, isSuccess, message, dispatch]);

    const close = () => {
        const container = document.querySelector('.containerCreateExercise');
        container.style.transform = 'translate(-50%, -300%)';
        setTimeout(() => {
            setOpenCreateExercise(false);
        }, 100);
    }

    if (openCreateExercise && user) {
        return (
            <div className="containerCreateExercise">
                <i className="fa-solid fa-x" onClick={() => close()}></i>
                <div className="contentAuth">
                    <h2 className='titleAuth activeTitleAuth'>Create a new Exercise</h2>
                    <form onSubmit={onSubmit}>
                        <span className="input-item">
                            <i className="fa-solid fa-signature"></i>
                            <input className="form-input" id="exercisename" type="text" placeholder="Exercise name" name='exercisename' value={exercisename} onChange={onChangeExc} required />
                        </span>
                        <span className="input-item">
                            <i className="fa-solid fa-tag"></i>
                            <Multiselect
                                isObject={false}
                                options={muscleGroups} // Options to display in the dropdown
                                placeholder="Muscle groups"
                                hidePlaceholder={true}
                                id="muscleFilter"
                                onSelect={onSelectMuscle} // Function will trigger on select event
                                onRemove={onSelectMuscle}
                                closeIcon="cancel"
                                name='bodypart'
                                style={{
                                    optionContainer: { border: "none", boxShadow: "3px 5px 0px 0px rgba(0, 0, 0, 0.15)" },
                                    chips: { margin: "1px", padding: "6px", paddingTop: "2px", paddingBottom: "2px", backgroundColor: "var(--teal-500)" },
                                    searchBox: {
                                        border: "none", width: "100%", height: "100%", backgroundColor: "transparent", cursor: "pointer", margin: "0", paddingLeft: "0.5rem", paddingRight: "0.5rem",
                                        padding: "0.5rem"
                                    },
                                }}
                                avoidHighlightFirstOption={true}
                            />
                        </span>
                        <span className="input-item">
                            <i className="fa-solid fa-comment"></i>
                            <textarea className="form-input" id="description" type="textarea" placeholder="Description" name='description' value={description} onChange={onChangeExc} />
                        </span>
                        <span className="input-item-check">
                            <input className="form-input-public" id="ispublic" type="checkbox" name='ispublic' onChange={onChangeExc} onClick={() => setIsPublic(!isPublic)} />
                            <label htmlFor='public'>Is this exercise public?</label>
                        </span>
                        <button className="btn" type="submit">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}
