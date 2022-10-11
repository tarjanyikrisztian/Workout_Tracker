import { useEffect, useState } from 'react';
import { AuthPage } from './AuthPage'
import '../css/Sidebar.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const Sidebar = ({ }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [extended, setExtended] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    function openAuth() {
        setOpenLogin(true);
        setTimeout(() => {
            setOpenLogin(false);
        }, 255);
    };

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
            if (window.innerWidth < 768 || window.innerHeight < 768) {
                ext_icon.style.left = "-0.5rem";
                ext_icon.style.borderTopLeftRadius = "0rem";
                ext_icon.style.borderBottomLeftRadius = "0";
                ext_icon.style.borderTopRightRadius = "2rem";
                ext_icon.style.borderBottomRightRadius = "2rem";
            }
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
            if (window.innerWidth < 768 || window.innerHeight < 768) {
                ext_icon.style.left = "-2rem";
                ext_icon.style.borderTopLeftRadius = "2rem";
                ext_icon.style.borderBottomLeftRadius = "2rem";
                ext_icon.style.borderTopRightRadius = "0";
                ext_icon.style.borderBottomRightRadius = "0";
            }
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
   if(user) {
    userIcon = `icon fa-solid fa-${user.username[0]}`;
   }
    return (
        <>
            <div className="sidebar">
                <i className="extend fa-solid fa-angle-double-left" onClick={() => setExtended(!extended)}></i>
                {user ? (
                     
                    <>
                        <div className="sidebar__item">
                            <Link to="/" className={userIcon}>
                                <span className='iconInfo'>{user.username}</span>
                            </Link>
                        </div>
                        <div className="sidebar__item">
                            <Link to="/exercises" className="icon fa-solid fa-dumbbell">
                                <span className='iconInfo'>Excersises</span>
                            </Link>
                        </div>
                        <div className="sidebar__item">
                            <i className="icon fa-solid fa-calendar-days">
                                <span className='iconInfo'>Workouts</span>
                            </i>
                        </div>
                        <div className="sidebar__item icon_last">
                            <i className='icon singInOut fa-solid fa-right-from-bracket' onClick={() => logoutUser()}>
                                <span className='iconInfo'>Log Out</span>
                            </i>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="sidebar__item">
                            <Link to="/" className="icon fa-solid fa-home">
                                <span className='iconInfo'>Homepage</span>
                            </Link>
                        </div>
                        <div className="sidebar__item">
                            <Link to="/exercises" className="icon fa-solid fa-dumbbell">
                                <span className='iconInfo'>Excersises</span>
                            </Link>
                        </div>
                        <div className="sidebar__item icon_last">
                            <i className='icon singInOut fa-solid fa-right-to-bracket' onClick={() => openAuth()}>
                                <span className='iconInfo'>Sign In</span>
                            </i>
                        </div>
                    </>
                )}
            </div>
            <AuthPage openLogin={openLogin} />
        </>
    )
}
