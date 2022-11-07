//edit profile info
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../css/Profile.css'
import { motion } from "framer-motion"
import { Backdrop } from './Backdrop';
import { update } from '../redux/auth/authSlice';
import Resizer from "react-image-file-resizer";
import { Buffer } from 'buffer';

export const ProfileInfoEdit = ({ handleClose }) => {
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

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
    });

    const { firstname, lastname, bio, } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const image = file;
        const updatedUser = {
            firstname,
            lastname,
            bio,
            image,
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