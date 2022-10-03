import React from 'react'
import { useEffect, useState } from 'react';
import '../css/LoginReg.css'



export const AuthPage = () => {
    const [currentPage, setCurrentPage] = useState("login");
    useEffect(() => {
        let cont = document.querySelector(`.${currentPage}`);
        document.body.addEventListener('click', function (event) {
            let contBord = document.querySelector('.containerBorder');
            if (cont.contains(event.target)) {
                contBord.style.translate = "1rem 1rem";
            } else {
                contBord.style.translate = "-1rem -1rem";
            }
        });
    });

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
        setCurrentPage("none");
    }

    function changeToSign() {
        let border = document.querySelector('.containerBorder');
        border.style.zIndex = "11";
        border.style.height = "45rem";
        border.style.width = "30rem";
        border.style.transition = "all 0.75s ease-in-out";
        setTimeout(() => {
            setCurrentPage("sign");
            border.style.zIndex = "9";
            border.style.height = "38rem";
            border.style.width = "25rem";
            border.style.transition = "all 0.75s ease-in-out";
            setTimeout(() => {
                border.style.transition = "all 0.25s ease-in-out";
            }, 750);
        }, 750);

    }

    function changeToLogin() {
        let border = document.querySelector('.containerBorder');
        border.style.zIndex = "11";
        border.style.height = "45rem";
        border.style.width = "30rem";
        border.style.transition = "all 0.75s ease-in-out";
        setTimeout(() => {
            setCurrentPage("login");
            border.style.zIndex = "9";
            border.style.height = "30rem";
            border.style.width = "25rem";
            border.style.transition = "all 0.75s ease-in-out";
            setTimeout(() => {
                border.style.transition = "all 0.25s ease-in-out";
            }, 750);
        }, 750);
    }

    function changeToForgot(){
        let border = document.querySelector('.containerBorder');
        border.style.zIndex = "11";
        border.style.height = "45rem";
        border.style.width = "30rem";
        border.style.transition = "all 0.75s ease-in-out";
        setTimeout(() => {
            setCurrentPage("forgot");
            border.style.zIndex = "9";
            border.style.height = "17rem";
            border.style.width = "25rem";
            border.style.transition = "all 0.75s ease-in-out";
            setTimeout(() => {
                border.style.transition = "all 0.25s ease-in-out";
            }, 750);
        }, 750);
    }

    //Register
    if(currentPage === "sign"){
    return (
        <>
            <div className="container sign">
            
                <i className="fa-solid fa-x" onClick={()=> close()}></i>
                <div className="content">
                    <h2 className='title'><a className='activeTitle'>Sign Up</a><a className='notActiveTitle' onClick={()=> changeToLogin()}>Log In</a></h2>

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
            <div className="containerBorder sign">
                </div>
        </>
    )
    }
    //Login
    else if(currentPage === "login"){
    return (
        <>
            <div className="container login">
            <i className="fa-solid fa-x" onClick={()=> close()}></i>
                <div className="content">
                    <h2 className='title'><a className='activeTitle'>Log In</a><a className='notActiveTitle' onClick={()=> changeToSign()}>Sign Up</a></h2>
                    <form action=''>
                        <span className="input-item">
                            <i className="fa-solid fa-envelope"></i>
                            <input className="form-input" id="email" type="email" placeholder="Email" required />
                        </span>
                        <span className="input-item">
                            <i className="fa-solid fa-key"></i>
                            <input className="form-input" type="password" placeholder="Password" id="password" name="password" required />
                            <i className="fa-solid fa-eye" type="button" id="eye" onClick={()=> passwordShowHide()}></i>

                        </span>
                        <a className='forgotPassword' onClick={()=> changeToForgot()}>Forgot Password</a>
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
            <div className="containerBorder login">
            </div>
        </>
    )
    }
    //forgot password
    else if(currentPage === "forgot"){
    return (
        <>
            <div className="container forgot">
            <i className="fa-solid fa-x" onClick={()=> close()}></i>
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
            <div className="containerBorder forgot">
            </div>
        </>
    )
    }
    //nothing
    else if(currentPage === "none"){
        return(
            <></>
        )
    }
}
