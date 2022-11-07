//edit profile info
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../css/Profile.css'
import { motion } from "framer-motion"
import { Backdrop } from './Backdrop';
import { update } from '../redux/auth/authSlice';

export const ProfileInfoEdit = ({ handleClose }) => {
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    let userIcon = "fa-solid fa-user-circle";
    if (user) {
        userIcon = `fa-solid fa-${user.firstname[0].toLowerCase()}`;
    }

    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        bio: user.bio,
        //image: user.image
    });

    const { firstname, lastname, email, bio } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(update(formData));

        handleClose();
    }


    const slideIn = {
        hidden: {
            top: "1rem",
            left: "1rem",
            scale: 0.2,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            scale: 0.2,
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        }
    }

    return (
        <Backdrop onClick={handleClose}>
            <motion.div className='profileEdit'
                onClick={(e) => e.stopPropagation()}
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <i className="fa-solid fa-x" onClick={handleClose}></i>
                <div className="profileEditRow1">
                <div className="profileImage">
                    {user.image
                        ? <img src={user.image} alt="profile" />
                        : <i className={userIcon} />
                    }
                </div>
                <h1>Edit profile</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <span className="input-item">
                        <input type="text" className="form-input" value={firstname} placeholder="Firstname" name="firstname" onChange={onChange} />
                    </span>
                    <span className="input-item">
                        <input type="text" className="form-input" value={lastname} placeholder="Lastname" name="lastname" onChange={onChange} />
                    </span>
                    <span className="input-item">
                        <input type="textarea" rows="4" className="form-input" value={bio} placeholder="Bio" name="bio" onChange={onChange} />
                    </span>
                <button className="btn" type="submit">
                    Save
                </button>
                </form>
            </motion.div>
        </Backdrop>
    )
}