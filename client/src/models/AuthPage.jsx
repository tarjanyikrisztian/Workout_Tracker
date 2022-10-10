import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../css/LoginReg.css'
import { Link } from "react-router-dom";
import { register, reset, login } from '../redux/auth/authSlice';



export const AuthPage = ({ openLogin }) => {
    const [currentPage, setCurrentPage] = useState("none");

    function passwordShowHide() {
        let pwd = document.querySelectorAll(".password");
        if (pwd[0].type === "password") {
            let eye = document.querySelectorAll(".fa-eye");
            eye.forEach((item) => {
                item.classList.remove("fa-eye");
                item.classList.add("fa-eye-slash");
            });
            pwd.forEach((item) => {
                item.type = "text";
            });

        } else {
            let eye = document.querySelectorAll(".fa-eye-slash");
            eye.forEach((item) => {
                item.classList.remove("fa-eye-slash");
                item.classList.add("fa-eye");
            });
            pwd.forEach((item) => {
                item.type = "password";
            });
        }
    }

    function close() {
        let cont = document.querySelector(`.${currentPage}`);
        cont.style.width = "3rem";
        cont.style.height = "3rem";
        cont.style.borderRadius = "100%";
        cont.style.overflow = "hidden";
        cont.style.top = "100%";
        cont.style.left = "100%";
        cont.style.zIndex = "3";
        cont.style.transform = "translate(-100%, -100%)";
        setTimeout(() => {
            setCurrentPage("none");
            cont.style.display = "none";
        }, 255);
    }

    useEffect(() => {
        if (openLogin) {
            let cont = document.querySelector(`.none`);
            cont.style.display = "block";
            cont.style.overflow = "hidden";
            setTimeout(() => {

                cont.style.width = "25rem";
                cont.style.height = "30rem";
                cont.style.borderRadius = "1rem";
                if (window.innerWidth < 768 || window.innerHeight < 768) {
                    cont.style.width = "100%";
                    cont.style.height = "100%";
                    cont.style.overflow = "auto";
                }
                cont.style.top = "50%";
                cont.style.left = "50%";
                cont.style.zIndex = "10";
                cont.style.transform = "translate(-50%, -50%)";
                setTimeout(() => {
                    setCurrentPage("login");
                }, 255);
            }, 5);
        }
    }, [openLogin]);

    function changeToSign() {
        let cont = document.querySelector(`.${currentPage}`);
        cont.style.height = "38rem";
        if (window.innerWidth < 768 || window.innerHeight < 768) {
            cont.style.width = "100%";
            cont.style.height = "100%";
            cont.style.overflow = "auto";
            setCurrentPage("sign");
        }
        else {
            setTimeout(() => {
                setCurrentPage("sign");
            }, 255);
        }
    }

    function changeToLogin() {
        let cont = document.querySelector(`.${currentPage}`);
        cont.style.height = "29rem";
        if (window.innerWidth < 768 || window.innerHeight < 768) {
            cont.style.width = "100%";
            cont.style.height = "100%";
            cont.style.overflow = "auto";
        }
        setCurrentPage("login");
    }

    function changeToForgot() {
        let cont = document.querySelector(`.${currentPage}`);
        cont.style.height = "18rem";
        if (window.innerWidth < 768 || window.innerHeight < 768) {
            cont.style.width = "100%";
            cont.style.height = "100%";
            cont.style.overflow = "auto";
        }
        setCurrentPage("forgot");
    }


    const [formDataReg, setFormDataReg] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const { username, email, password, password2 } = formDataReg;


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isLoading) {
            toast.loading("Just a few seconds... 🤔");
        }
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            if (currentPage === "login") {
                toast.success("Welcome back! 💪");
            }
            else if (currentPage === "sign") {
                toast.success("Registered successfully! 🎉");
            }
            else if (currentPage === "forgot") {
                toast.success("Password reset link sent! 📧");
            }
            close();
        }

        dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    const onChangeReg = (e) => {
        setFormDataReg((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmitReg = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userDataReg = {
                username,
                email,
                password,
            }

            dispatch(register(userDataReg))
        }
    }

    const [formDataLog, setFormDataLog] = useState({
        email: '',
        password: '',
    })

    const { email3, password3 } = formDataLog;

    const onChangeLog = (e) => {
        setFormDataLog((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmitLog = (e) => {
        e.preventDefault()
        let email = email3;
        let password = password3;
        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }
      



    //Register
    if (currentPage === "sign") {
        return (
            <>
                <div className="containerAuth sign">

                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="contentAuth">
                        <h2 className='titleAuth'><a className='activeTitleAuth'>Sign Up</a>
                            <a className='notActiveTitleAuth' onClick={() => changeToLogin()}>Log In</a></h2>

                        <form onSubmit={onSubmitReg}>
                            <span className="input-item">
                                <i className="fa-solid fa-user"></i>
                                <input className="form-input" id="username" type="text" placeholder="Username" name='username' value={username} onChange={onChangeReg} required />
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="form-input" id="email" type="email" placeholder="Email" name='email' value={email} onChange={onChangeReg} required />
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-key"></i>
                                <input className="form-input password" type="password" placeholder="Password" id="password" name="password" value={password} onChange={onChangeReg} required />
                                <i className="fa-solid fa-eye" type="button" id="eye" onClick={() => passwordShowHide()}></i>
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-key"></i>
                                <input className="form-input password" type="password" placeholder="Confirm Password" id="password2" name="password2" value={password2} onChange={onChangeReg} required />
                                <i className="fa-solid fa-eye" type="button" id="eye" onClick={() => passwordShowHide()}></i>
                            </span>
                            <button className="btn" type="submit">Sign up</button>
                            <div className="or">
                                or
                            </div>
                            </form>
                            <button className="btn googleBtn g-signin2" data-onsuccess="onSignIn">
                                <i className="fa fa-google"></i>
                                Google
                            </button>
                        
                    </div>

                </div>
            </>
        )
    }
    //Login
    else if (currentPage === "login") {
        return (
            <>
                <div className="containerAuth login">
                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="contentAuth">
                        <h2 className='titleAuth'><a className='activeTitleAuth'>Log In</a>
                            <a className='notActiveTitleAuth' onClick={() => changeToSign()}>Sign Up</a></h2>
                        <form onSubmit={onSubmitLog}>
                            <span className="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="form-input" id="email3" type="email" placeholder="Email" name='email3' value={email3} onChange={onChangeLog} required />
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-key"></i>
                                <input className="form-input password" type="password" placeholder="Password" id="password3" name="password3" value={password3} onChange={onChangeLog} required />
                                <i className="fa-solid fa-eye" type="button" id="eye" onClick={() => passwordShowHide()}></i>

                            </span>
                            <a className='forgotPassword' onClick={() => changeToForgot()}>Forgot Password</a>
                            <button className="btn" type="submit">Log In</button>
                            <div className="or">
                                or
                            </div>
                            </form>
                            <button className="btn googleBtn g-signin2" data-onsuccess="onSignIn">
                                <i className="fa fa-google"></i>
                                Google
                            </button>
                        
                    </div>
                </div>
            </>
        )
    }
    //forgot password
    else if (currentPage === "forgot") {
        return (
            <>
                <div className="containerAuth forgot">
                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="contentAuth">
                        <h2 className='titleAuth'><a className='activeTitleAuth'>Forgot Password</a></h2>
                        <form action=''>
                            <span className="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="form-input" id="email" type="email" placeholder="Email" required />
                            </span>
                            <a className='forgotPassword' onClick={() => changeToLogin()}>Back to log in</a>
                            <button className="btn" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
    //nothing
    else if (currentPage === "none") {
        return (
            <>
                <div className="none"></div>
            </>
        )
    }
}
