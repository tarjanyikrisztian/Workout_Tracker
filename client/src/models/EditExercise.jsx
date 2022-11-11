import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../css/Exercises.css'
import Multiselect from 'multiselect-react-dropdown';
import { muscleGroups } from '../models/Global'
import { logout } from '../redux/auth/authSlice';
import { updateExercise,deleteExercise, getExercises,reset, } from '../redux/exercises/exerciseSlice';
import { motion } from "framer-motion"
import { Backdrop } from './Backdrop';
import Resizer from "react-image-file-resizer";
import { Buffer } from 'buffer';

export const EditExercise = ({ handleClose, exercise }) => {
    const { user } = useSelector((state) => state.auth);

    const [newExerciseMuscleGroups, setNewExerciseMuscleGroups] = useState(exercise.bodypart);
    const [isPublic, setIsPublic] = useState(exercise.ispublic);

    const onSelectMuscle = (selectedList) => {
        setNewExerciseMuscleGroups(selectedList);
    }

    const [file, setFile] = useState(exercise.image ? Buffer.from(exercise.image, 'base64').toString('ASCII') : null);
    const [preview, setPreview] = useState(null);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                400,
                400,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const handleFile = (evt) => {
        let f = evt.target.files[0];
        setPreview(URL.createObjectURL(f));
        resizeFile(f).then((resizedImageUri) => {
            setFile(resizedImageUri.split(",")[1]);
        });
    }

    const [formDataExc, setFormDataExc] = useState({
        exercisename: exercise.exercisename,
        bodypart: newExerciseMuscleGroups,
        description: exercise.description,
        ispublic: isPublic,
        image: file,
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
        const bodypart = newExerciseMuscleGroups;
        const ispublic = isPublic;
        const image = file;
        const id  = exercise._id;
        const updatedExercise = {
            user: user._id,
            id,
            exercisename,
            bodypart,
            description,
            ispublic,
            image,
        }
        if (bodypart.length === 0) {
            toast.error("Please select at least one muscle group");
        } else {
            dispatch(updateExercise(updatedExercise));
            handleClose();
        }
    }

    const slideIn = {
        hidden: {
            top: "-100%",
        },
        visible: {
            top: "50%",
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            top: "-100%",
            transition: {
                duration: 0.2,
            },
        }
    }

    const closeImage = () => {
        setPreview(null);
        setFile(null);
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this exercise?")) {
            dispatch(deleteExercise(exercise._id));
            handleClose();
        }
    }






    return (
        <Backdrop onClick={handleClose}>
            <motion.div className="containerCreateExercise"
                onClick={(e) => e.stopPropagation()}
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <i className="fa-solid fa-x" onClick={handleClose}></i>
                <div className="contentAuth">
                    <h2 className='titleAuth activeTitleAuth'>Edit exercise</h2>
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
                                placeholder="Muscles"
                                hidePlaceholder={true}
                                id="muscleFilter"
                                onSelect={onSelectMuscle} // Function will trigger on select event
                                onRemove={onSelectMuscle}
                                selectedValues={newExerciseMuscleGroups}
                                selectionLimit={3}
                                closeIcon="cancel"
                                name='bodypart'
                                style={{
                                    optionContainer: { border: "none", boxShadow: "3px 5px 0px 0px rgba(0, 0, 0, 0.15)" },
                                    chips: { margin: "1px", padding: "6px", paddingTop: "2px", paddingBottom: "2px", backgroundColor: "var(--teal-500)" },
                                    searchBox: {
                                        border: "none", width: "100%", height: "100%", backgroundColor: "transparent", cursor: "pointer", margin: "0", paddingLeft: "0.5rem", paddingRight: "0.5rem",
                                        padding: "0.5rem", minWidth:"18.5rem"
                                    },
                                }}
                                avoidHighlightFirstOption={true}
                            />
                        </span>
                        <span className="input-item">
                            <i className="fa-solid fa-comment"></i>
                            <textarea className="form-input" id="description" type="textarea" rows="4" placeholder="Description" name='description' value={description} onChange={onChangeExc} />
                        </span>
                        <span className="input-item input-item-upload" htmlFor="file">
                            <div className="file-upload">
                                <input type="file" id="file" name="file" onChange={handleFile} accept="image/png, image/jpeg" hidden />
                                {preview ? (
                                    <div className="previewImageWrap">
                                        <i className="fa-solid fa-x" id="previewImageX" onClick={closeImage}></i>
                                        <label htmlFor="file">
                                            <img src={preview} alt="preview" className='exerciseImagePreview' />
                                        </label>
                                    </div>
                                ) : (
                                    exercise.image ? (
                                        <div className="previewImageWrap">
                                        <label htmlFor="file">
                                            <img src={`data:image/JPEG;base64,${Buffer.from(exercise.image, 'base64').toString('ASCII')}`} alt="preview" className='exerciseImagePreview' />
                                        </label>
                                    </div>
                                    ) : (
                                    <>
                                        <label htmlFor="file">
                                            <i className="fa-solid fa-upload"></i>
                                            <span>Drag & drop or select an <u>image</u>.</span>
                                        </label>
                                    </>
                                    ))}
                            </div>
                        </span>
                        <span className="input-item-check">
                            <input className="form-input-public" id="ispublic" type="checkbox" name='ispublic' checked={isPublic} onChange={onChangeExc} onClick={() => setIsPublic(!isPublic)} />
                            <label htmlFor='ispublic'>Is this exercise public?</label>
                        </span>
                        
                        <button className="btn" type="submit">
                            Update
                        </button>
                        <span className="input-item-check">
                            <u className="form-input-delete" onClick={handleDelete}>Delete exercise</u>
                        </span>
                    </form>
                </div>
            </motion.div>
        </Backdrop>
    )
}
