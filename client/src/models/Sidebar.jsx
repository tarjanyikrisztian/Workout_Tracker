import { useEffect, useState } from 'react';
import '../css/Sidebar.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';


export const Sidebar = ({ }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [extended, setExtended] = useState(false);


    function logoutUser() {
        dispatch(logout());
        toast.success('See you soon! 😊');
        dispatch(reset());
        navigate('/');
    };



    useEffect(() => {
        if (extended) {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.add("extended");
            const ext_icon = document.querySelector('.extend');
            ext_icon.classList.remove("fa-angle-double-left");
            ext_icon.classList.add("fa-angle-double-right");
            const icons = document.querySelectorAll('.icon');
            icons.forEach(icon => {
                icon.classList.add("extended_icon");
            });
            const iconInfo = document.querySelectorAll('.iconInfo');
            iconInfo.forEach(info => {
                info.style.display = "block";
                info.style.opacity = "0";
                setTimeout(() => {
                    info.style.opacity = "1";
                }, 250);
            });
        } else {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove("extended");
            const ext_icon = document.querySelector('.extend');
            ext_icon.classList.remove("fa-angle-double-right");
            ext_icon.classList.add("fa-angle-double-left");
            const icons = document.querySelectorAll('.icon');
            icons.forEach(icon => {
                icon.classList.remove("extended_icon");
                icon.style.justifyContent = "left"
                setTimeout(() => {
                    icon.style.justifyContent = "center"
                }, 250);
            });
            const iconInfo = document.querySelectorAll('.iconInfo');
            iconInfo.forEach(info => {
                info.style.opacity = "0";
                info.style.display = "none";
            });
        }
    }, [extended]);

    let userIcon = "icon fa-solid fa-user-circle";
    if (user) {
        userIcon = `icon fa-solid fa-${user.firstname[0].toLowerCase()}`;
    }

    useEffect(() => {
        if (user.image) {
          const profileImage = document.getElementById(`profSideImage`);
          let image = Buffer.from(user.image, 'base64').toString('ascii');
          profileImage.style.backgroundImage = `url('data:image/JPEG;base64,${image}')`;
          if(extended) {
          const removeBg = document.getElementById(`removeProfImage`);
            removeBg.style.backgroundImage = "none";
          }
        }
      }, [user.image, extended]);


    return (
        <>
            <div className="sidebar">
                <i className="extend fa-solid fa-angle-double-left" onClick={() => setExtended(!extended)}></i>
                <div className="sidebar__item">
                    {user.image ?
                        (extended ?
                            <Link to="/" className="icon" id='removeProfImage' >
                                <div id="profSideImage" className='iconSideProf'></div>
                                <span className='iconInfo'>{user.firstname}</span>
                            </Link>
                            :
                        <Link to="/" className="icon" id="profSideImage" >
                            <span className='iconInfo'>{user.firstname}</span>
                        </Link>
                        )
                        :
                        <Link to="/" className={userIcon}>
                            <span className='iconInfo'>{user.firstname}</span>
                        </Link>
                    }
                </div>
                <div className="sidebar__item">
                    <Link to="/exercises" className="icon fa-solid fa-dumbbell">
                        <span className='iconInfo'>Excersises</span>
                    </Link>
                </div>
                <div className="sidebar__item">
                    <Link to="/workouts" className="icon fa-solid fa-calendar-days">
                        <span className='iconInfo'>Workouts</span>
                    </Link>
                </div>
                <div className="sidebar__item icon_last">
                    <i className='icon singInOut fa-solid fa-right-from-bracket' onClick={() => logoutUser()}>
                        <span className='iconInfo'>Log Out</span>
                    </i>
                </div>
            </div>
        </>
    )
}
