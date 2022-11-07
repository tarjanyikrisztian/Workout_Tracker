import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../css/Profile.css'
import { motion, AnimatePresence } from "framer-motion"
import { ProfileInfoEdit } from '../models/ProfileInfoEdit';

export const Profile = () => {

  const { user } = useSelector(state => state.auth);

  let userIcon = "fa-solid fa-user-circle";
  if (user) {
    userIcon = `fa-solid fa-${user.firstname[0].toLowerCase()}`;
  }

  const [edit, setEdit] = useState(false);

  const open = () => { setEdit(true) };
  const close = () => { setEdit(false) };

  return (
    <>
    <div className='profile'>
      <div className="profileRow1">
        <div className="profileInfo profileCards">
          <div className="profileInfoTop">
            <div className="profileImage">
              {user.image
                ? <img src={user.image} alt="profile" />
                : <i className={userIcon} />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eaque laborum corporis laboriosam incidunt atque fuga qui repudiandae placeat totam, recusandae in repellat officiis! Numquam vero voluptas id quis libero?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eaque laborum corporis laboriosam incidunt atque fuga qui repudiandae placeat totam, recusandae in repellat officiis! Numquam vero voluptas id quis libero?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eaque laborum corporis laboriosam incidunt atque fuga qui repudiandae placeat totam, recusandae in repellat officiis! Numquam vero voluptas id quis libero?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eaque laborum corporis laboriosam incidunt atque fuga qui repudiandae placeat totam, recusandae in repellat officiis! Numquam vero voluptas id quis libero?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eaque laborum corporis laboriosam incidunt atque fuga qui repudiandae placeat totam, recusandae in repellat officiis! Numquam vero voluptas id quis libero?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eaque laborum corporis laboriosam incidunt atque fuga qui repudiandae placeat totam, recusandae in repellat officiis! Numquam vero voluptas id quis libero?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eaque laborum corporis laboriosam incidunt atque fuga qui repudiandae placeat totam, recusandae in repellat officiis! Numquam vero voluptas id quis libero?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eaque laborum corporis laboriosam incidunt atque fuga qui repudiandae placeat totam, recusandae in repellat officiis! Numquam vero voluptas id quis libero?

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
