import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../css/LoginReg.css'
import { Link } from "react-router-dom";
import { register, reset, login } from '../redux/auth/authSlice';
import { motion } from 'framer-motion';
import { Backdrop } from './Backdrop';



export const AuthPage = ({ handleClose }) => {
    const [currentPage, setCurrentPage] = useState("login");

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


    const [formDataReg, setFormDataReg] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: "",
    });

    const { firstname, lastname, email, password, password2 } = formDataReg;


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
                toast.success("Welcome! 💪");
            }
            else if (currentPage === "sign") {
                toast.success("Your account has been created, please verify your email! 🎉");
                setCurrentPage("login");
            }
            else if (currentPage === "forgot") {
                toast.success("Password reset link sent! 📧");
                setCurrentPage("login");
            }

        }

        dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    const [goodPassword, setGoodPassword] = useState([false, false, false, false]);

    const testPassword = (password) => {
        const passwordRequirements = document.querySelectorAll(".pwdReq");
        if (password.length >= 8) {
            passwordRequirements[0].classList.remove("pwdNotContains");
            passwordRequirements[0].classList.add("pwdContains");
            setGoodPassword((goodPassword) => {
                goodPassword[0] = true;
                return goodPassword;
            });
        }
        else {
            passwordRequirements[0].classList.remove("pwdContains");
            passwordRequirements[0].classList.add("pwdNotContains");
            setGoodPassword((goodPassword) => {
                goodPassword[0] = false;
                return goodPassword;
            });
        }
        if (password.match(/[A-Z]/)) {
            passwordRequirements[1].classList.remove("pwdNotContains");
            passwordRequirements[1].classList.add("pwdContains");
            setGoodPassword((goodPassword) => {
                goodPassword[1] = true;
                return goodPassword;
            });
        }
        else {
            passwordRequirements[1].classList.remove("pwdContains");
            passwordRequirements[1].classList.add("pwdNotContains");
            setGoodPassword((goodPassword) => {
                goodPassword[1] = false;
                return goodPassword;
            });
        }
        if (password.match(/[a-z]/)) {
            passwordRequirements[2].classList.remove("pwdNotContains");
            passwordRequirements[2].classList.add("pwdContains");
            setGoodPassword((goodPassword) => {
                goodPassword[2] = true;
                return goodPassword;
            });
        }
        else {
            passwordRequirements[2].classList.remove("pwdContains");
            passwordRequirements[2].classList.add("pwdNotContains");
            setGoodPassword((goodPassword) => {
                goodPassword[2] = false;
                return goodPassword;
            });
        }
        if (password.match(/[0-9]/)) {
            passwordRequirements[3].classList.remove("pwdNotContains");
            passwordRequirements[3].classList.add("pwdContains");
            setGoodPassword((goodPassword) => {
                goodPassword[3] = true;
                return goodPassword;
            });
        }
        else {
            passwordRequirements[3].classList.remove("pwdContains");
            passwordRequirements[3].classList.add("pwdNotContains");
            setGoodPassword((goodPassword) => {
                goodPassword[3] = false;
                return goodPassword;
            });
        }
    }




    const onChangeReg = (e) => {
        setFormDataReg((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))

        if (e.target.name === "password") {
            testPassword(e.target.value);
        }
    }

    const onSubmitReg = (e) => {
        e.preventDefault()
        if (!(goodPassword[0] && goodPassword[1] && goodPassword[2] && goodPassword[3])) {
            toast.error("Password is not strong enough! 🤔");
        }
        else if (password !== password2) {
            toast.error('Passwords do not match 🤔');
        } else {
            const userDataReg = {
                firstname,
                lastname,
                email,
                password,
            }

            dispatch(register(userDataReg))
        }
        setFormDataReg({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: "",
        })

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

        setFormDataLog({
            email: '',
            password: '',
        })
    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); 
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    }

    const authAppear = {
        hidden: {
            left: "100%",
            top: "0",
            width: "3rem",
            height: "3rem",
            borderRadius: "100%",
        },
        visible: {
            left: "50%",
            top: "50%",
            width: "25rem",
            height: "30rem",
            borderRadius: "1rem",
            transition: {
                duration: 0.25,
            },
        },
        exit: {
            top: "0",
            left: "100%",
            width: "3rem",
            height: "3rem",
            borderRadius: "100%",
            transition: {
                duration: 0.25,
            },
        },

        sign: {
            height: "43rem",
            transition: {
                duration: 0.25,
            },
        },
        login: {
            height: "30rem",
            transition: {
                duration: 0.25,
            },
        },
        forgot: {
            height: "18rem",
            transition: {
                duration: 0.25,
            },
        },
    }

    const close = () => {
        setCurrentPage("login");
        handleClose();
    }



    //Register
    if (currentPage === "sign") {
        return (
            <Backdrop onClick={close}>
                <motion.div className="containerAuth sign"
                    onClick={(e) => e.stopPropagation()}
                    variants={authAppear}
                    animate="sign"
                    exit="exit"
                >

                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="contentAuth">
                        <h2 className='titleAuth'><a className='activeTitleAuth'>Sign Up</a>
                            <a className='notActiveTitleAuth' onClick={() => setCurrentPage("login")}>Log In</a></h2>

                        <form onSubmit={onSubmitReg}>
                            <span className="input-item">
                                <i className="fa-solid fa-user"></i>
                                <input className="form-input" id="firstname" type="text" placeholder="Firstname" name='firstname' value={firstname} onChange={onChangeReg} required />
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-user"></i>
                                <input className="form-input" id="lastname" type="text" placeholder="Lastname" name='lastname' value={lastname} onChange={onChangeReg} required />
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="form-input" id="email" type="email" placeholder="Email" name='email' value={email} onChange={onChangeReg} required />
                            </span>
                            <span className="input-item pwdItem">
                                <i className="fa-solid fa-key"></i>
                                <input className="form-input password" type="password" placeholder="Password" id="password" name="password" value={password} onChange={onChangeReg} required />
                                <i className="fa-solid fa-eye" type="button" id="eye" onClick={() => passwordShowHide()}></i>

                            </span>
                            <span className="input-item pwdItem2">
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

                </motion.div>
                <motion.span className="password-requirments"
                    initial={{ x: "-10%" }}
                    animate={{ x: "85%" }}
                    transition={{ duration: 0.25 }}
                >
                    <p>Password must contain:</p>
                    <ul>
                        <li className="pwdReq pwdNotContains">At least 8 characters</li>
                        <li className="pwdReq pwdNotContains">At least 1 uppercase letter</li>
                        <li className="pwdReq pwdNotContains">At least 1 lowercase letter</li>
                        <li className="pwdReq pwdNotContains">At least 1 number</li>
                    </ul>
                </motion.span>
            </Backdrop>
        )
    }
    //Login
    else if (currentPage === "login") {
        return (
            <Backdrop onClick={close}>
                <motion.div className="containerAuth login"
                    onClick={(e) => e.stopPropagation()}
                    variants={authAppear}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="contentAuth">
                        <h2 className='titleAuth'><a className='activeTitleAuth'>Log In</a>
                            <a className='notActiveTitleAuth' onClick={() => setCurrentPage("sign")}>Sign Up</a></h2>
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
                            <a className='forgotPassword' onClick={() => setCurrentPage("forgot")}>Forgot Password</a>
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
                </motion.div>
            </Backdrop>
        )
    }
    //forgot password
    else if (currentPage === "forgot") {
        return (
            <Backdrop onClick={close}

            >
                <motion.div className="containerAuth forgot"
                    onClick={(e) => e.stopPropagation()}
                    variants={authAppear}
                    animate="forgot"
                    exit="exit"
                >
                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="contentAuth">
                        <h2 className='titleAuth'><a className='activeTitleAuth'>Forgot Password</a></h2>
                        <form action=''>
                            <span className="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="form-input" id="email" type="email" placeholder="Email" required />
                            </span>
                            <a className='forgotPassword' onClick={() => setCurrentPage("login")}>Back to log in</a>
                            <button className="btn" type="submit">Send</button>
                        </form>
                    </div>
                </motion.div>
            </Backdrop>
        )
    }
}
