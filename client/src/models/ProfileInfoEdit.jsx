//edit profile info
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../css/Profile.css'
import { motion } from "framer-motion"
import { Backdrop } from './Backdrop';
import { update } from '../redux/auth/authSlice';
import Resizer from "react-image-file-resizer";
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';

export const ProfileInfoEdit = ({ handleClose }) => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    let userIcon = "fa-solid fa-user-circle";
    if (user) {
        userIcon = `fa-solid fa-${user.firstname[0].toLowerCase()}`;
    }

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                64,
                64,
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

    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        bio: user.bio,
        image: user.image,
        age: user.age,
        weight: user.weight,
        height: user.height,
    });

    const { firstname, lastname, bio, age, weight, height } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const image = file;
        if (age < 14 || age > 100) {
                toast.error("Age must be between 14 and 100.");
                return;
        }
        if (height < 80 || height > 300) {
                toast.error("Height must be between 80 and 300 cm.");
                return;
        }
        if (bio.length > 200) {
            toast.error("Bio must be less than 200 characters.");
            return;
        }
        if(firstname.length === 0 || lastname.length === 0) {
            toast.error("First and last name must be filled.");
            return;
        }
        const updatedUser = {
            firstname,
            lastname,
            bio,
            image,
            age,
            height,
        };
        dispatch(update(updatedUser));
        handleClose();
    }

    useEffect(() => {
        if (user.image) {
            const profileImage = document.getElementById(`profImageEdit`);
            let image = Buffer.from(user.image, 'base64').toString('ascii');
            profileImage.style.backgroundImage = `url('data:image/JPEG;base64,${image}')`;
        }
    }, []);


    const slideIn = {
        hidden: {
            top: "50%",
            left: "-100%",
            transform: "translate(-50%, -50%)",
        },
        visible: {
            left: "50%",
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            left: "-100%",
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
                    <div className="profileImage profileImageEdit">
                        <label htmlFor="file">
                            <input type="file" id="file" name="file" onChange={handleFile} accept="image/png, image/jpeg" hidden />
                            {preview ? <img src={preview} alt="preview" />
                                : (user.image ?
                                    <div id="profImageEdit" className="profileImage"></div>
                                    : <i className={userIcon}></i>
                                )}
                        </label>
                    </div>
                    <h1>Edit profile</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <span className="input-item">
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" className="form-input" value={firstname} placeholder="Firstname" name="firstname" onChange={onChange} />
                    </span>
                    <span className="input-item">
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" className="form-input" value={lastname} placeholder="Lastname" name="lastname" onChange={onChange} />
                    </span>
                    <span className="input-item">
                        <label htmlFor="bio">Bio</label>
                        <input type="textarea" rows="4" className="form-input" value={bio} placeholder="Bio" name="bio" onChange={onChange} />
                    </span>
                    <span className="input-item">
                        <label htmlFor="age">Age</label>
                        <input type="number" min="14" max="100" className="form-input" value={age} placeholder="Age" name="age" onChange={onChange} />
                    </span>
                    <span className="input-item">
                        <label htmlFor="height">Height</label>
                        <input type="number" min="80" max="300" className="form-input" value={height} placeholder="Height" name="height" onChange={onChange} />
                        <span>cm</span>
                    </span>
                    <button className="btn" type="submit">
                        Save
                    </button>
                </form>
            </motion.div>
        </Backdrop>
    )
}