import React from 'react'
import { useEffect, useState } from 'react';
import '../css/LoginReg.css'



export const AuthPage = () => {
    const [currentPage, setCurrentPage] = useState("login");

    function passwordShowHide() {
        let pwd = document.querySelectorAll("#password");
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
        cont.style.width = "4rem";
        cont.style.height = "4rem";
        cont.style.borderRadius = "100%";
        cont.style.overflow = "hidden";
        cont.style.top = "100%";
        cont.style.left = "100%";
        cont.style.zIndex = "3";
        cont.style.transform = "translate(-100%, -100%)";
        setTimeout(() => {
            setCurrentPage("none");
        }, 255);
    }

    function changeToSign() {
        let cont = document.querySelectorAll(`.${currentPage}`);
        cont.forEach((item) => {
            item.style.height = "37rem";
        });
        setTimeout(() => {
            setCurrentPage("sign");
        }, 255);
    }

    function changeToLogin() {
        let cont = document.querySelectorAll(`.${currentPage}`);
        cont.forEach((item) => {
            item.style.height = "30rem";
        });
        setCurrentPage("login");
    }

    function changeToForgot() {
        let cont = document.querySelectorAll(`.${currentPage}`);
        cont.forEach((item) => {
            item.style.height = "17rem";
        });
        setCurrentPage("forgot");
    }

    //Register
    if (currentPage === "sign") {
        return (
            <>
                <div className="container sign">

                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="content">
                        <h2 className='title'><a className='activeTitle'>Sign Up</a><a className='notActiveTitle' onClick={() => changeToLogin()}>Log In</a></h2>

                        <form action=''>
                            <span className="input-item">
                                <i className="fa-solid fa-user"></i>
                                <input className="form-input" id="username" type="text" placeholder="Username" required />
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="form-input" id="email" type="email" placeholder="Email" required />
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-key"></i>
                                <input className="form-input" type="password" placeholder="Password" id="password" name="password" required />
                                <i className="fa-solid fa-eye" type="button" id="eye" onClick={() => passwordShowHide()}></i>
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-key"></i>
                                <input className="form-input" type="password" placeholder="Confirm Password" id="password" name="password" required />
                                <i className="fa-solid fa-eye" type="button" id="eye" onClick={() => passwordShowHide()}></i>
                            </span>
                            <button className="btn" type="submit">Sign up</button>
                            <div className="or">
                                or
                            </div>
                            <button className="btn googleBtn">
                                <i className="fa fa-google"></i>
                                Google
                            </button>
                        </form>
                    </div>

                </div>
            </>
        )
    }
    //Login
    else if (currentPage === "login") {
        return (
            <>
                <div className="container login">
                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="content">
                        <h2 className='title'><a className='activeTitle'>Log In</a><a className='notActiveTitle' onClick={() => changeToSign()}>Sign Up</a></h2>
                        <form action=''>
                            <span className="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="form-input" id="email" type="email" placeholder="Email" required />
                            </span>
                            <span className="input-item">
                                <i className="fa-solid fa-key"></i>
                                <input className="form-input" type="password" placeholder="Password" id="password" name="password" required />
                                <i className="fa-solid fa-eye" type="button" id="eye" onClick={() => passwordShowHide()}></i>

                            </span>
                            <a className='forgotPassword' onClick={() => changeToForgot()}>Forgot Password</a>
                            <button className="btn" type="submit">Log In</button>
                            <div className="or">
                                or
                            </div>
                            <button className="btn googleBtn">
                                <i className="fa fa-google"></i>
                                Google
                            </button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
    //forgot password
    else if (currentPage === "forgot") {
        return (
            <>
                <div className="container forgot">
                    <i className="fa-solid fa-x" onClick={() => close()}></i>
                    <div className="content">
                        <h2 className='title'><a className='activeTitle'>Forgot Password</a></h2>
                        <form action=''>
                            <span className="input-item">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="form-input" id="email" type="email" placeholder="Email" required />
                            </span>
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
            <></>
        )
    }
}
