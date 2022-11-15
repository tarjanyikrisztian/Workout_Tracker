import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../css/Profile.css'
import { motion, AnimatePresence } from "framer-motion"
import { logout } from '../redux/auth/authSlice';
import { getExercises, reset } from '../redux/exercises/exerciseSlice';
import { ProfileInfoEdit } from '../models/ProfileInfoEdit';
import { Buffer } from 'buffer';
import { WeightGraph } from '../models/WeightGraph';

export const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { exercises, isSuccess, isError, isLoading, message } = useSelector(state => state.exercises);

  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(getExercises());
    }
    }, [exercises.length]);

  useEffect(() => {
    if (message === "jwt expired") {
      toast.error("Your session has expired. Please log in again.");
      dispatch(logout());
    }
  }, [message]);

  let userIcon = "fa-solid fa-user-circle";
  if (user) {
    userIcon = `fa-solid fa-${user.firstname[0].toLowerCase()}`;
  }

  useEffect(() => {
    if (user.image) {
      const profileImage = document.getElementById(`profImage`);
      let image = Buffer.from(user.image, 'base64').toString('ascii');
      profileImage.style.backgroundImage = `url('data:image/JPEG;base64,${image}')`;
    }
  }, [user.image]);
  const [edit, setEdit] = useState(false);

  const open = () => { setEdit(true) };
  const close = () => { setEdit(false) };

  return (
    <>
      <div className='profile'>
        <div className="profileRow1">
          <div className="profileInfo profileCards">
            <div className="profileInfoTop">
              <div className="profileImage" id="profImage">
                {!user.image &&
                  <i className={userIcon} />
                }
              </div>
              <span className="profileName">{user.firstname} {user.lastname}</span>
            </div>
            <span className="profileBio">
              {(user.bio.length > 0) ? user.bio : "No bio yet."}
            </span>
            <table className="profileInfoTable">
              <tbody>
                <tr>
                  <td className="profileInfoTableElement">Age:</td>
                  <td className="profileInfoTableElement">{user.age}</td>
                </tr>
                <tr>
                  <td className="profileInfoTableElement">Height:</td>
                  <td className="profileInfoTableElement">{(user.height+"cm")}</td>
                </tr>
                <tr>
                  <td className="profileInfoTableElement">Weight:</td>
                  <td className="profileInfoTableElement">{(user.weight[(user.weight.length-1)]+"kg")}</td>
                </tr>
                </tbody>
            </table>

            <i className="fa-solid fa-pen pen-profile" onClick={() => (edit ? close() : open())}></i>
          </div>
          <div className="div2 profileCards">
            <WeightGraph />
          </div>
        </div>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {edit && <ProfileInfoEdit handleClose={close} />}
      </AnimatePresence>

    </>


  )
}
