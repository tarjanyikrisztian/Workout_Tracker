import { useEffect, useState } from 'react';
import { AuthPage } from './AuthPage'
import '../css/Sidebar.css'

export const Sidebar = ({ }) => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [extended, setExtended] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    function openAuth() {
        setOpenLogin(true);
        setTimeout(() => {
            setOpenLogin(false);
        }, 255);
    }



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

    return (
        <>
            <div className="sidebar">
                <i className="extend fa-solid fa-angle-double-left" onClick={() => setExtended(!extended)}></i>
                <div className="sidebar__item">
                    <i className="icon fa-solid fa-home">
                        <span className='iconInfo'>Homepage</span>
                    </i>
                </div>
                <div className="sidebar__item">
                    <i className="icon fa-solid fa-user">
                        <span className='iconInfo'>Profile</span>
                    </i>
                </div>
                <div className="sidebar__item">
                    <i className="icon fa-solid fa-dumbbell">
                        <span className='iconInfo'>Excersises</span>
                    </i>
                </div>
                <div className="sidebar__item">
                    <i className="icon fa-solid fa-calendar-days">
                        <span className='iconInfo'>Workouts</span>
                    </i>
                </div>
                <div className="sidebar__item icon_last">
                    <i className='icon singInOut fa-solid fa-right-to-bracket' onClick={() => openAuth()}>
                        <span className='iconInfo'>Sign In</span>
                    </i>
                </div>
            </div>
            <AuthPage openLogin={openLogin}/>
        </>
    )
}
