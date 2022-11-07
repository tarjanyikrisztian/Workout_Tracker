import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../css/Profile.css'
import { motion, AnimatePresence } from "framer-motion"
import { ProfileInfoEdit } from '../models/ProfileInfoEdit';
import { Buffer } from 'buffer';

export const Profile = () => {

  const { user } = useSelector(state => state.auth);

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
            <i className="fa-solid fa-pen pen-profile" onClick={() => (edit ? close() : open())}></i>
          </div>
          <div className="div2 profileCards">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos tempora labore, debitis laboriosam, nulla nemo, ut maiores odio quibusdam alias ullam iure officiis cumque doloribus expedita et porro quasi obcaecati?
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
