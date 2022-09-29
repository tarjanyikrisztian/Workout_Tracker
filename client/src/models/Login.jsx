import React from 'react'
import '../css/LoginReg.css'


export const Login = () => {
    return (
        <div className="container">
            <div className="title">
                <h1>Login</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. <a href='#' className='signUp'>Quisquam, quod.</a>
                </p>
            </div>
            <div className="content">
                <form action="">
                    <span className='spanInput'>
                        <i className="fas fa-email"></i>
                        <input type="email" id='email' placeholder='Email' />
                    </span>
                    <span className='spanInput'>
                        <i className="fas fa-lock"></i>
                        <input type="password" id='password' placeholder='Password' />
                    </span>
                    <button className='btn'>Login</button>
                </form>
                <div className="or">
                    <span>or</span>
                </div>
                <div className="google">
                    <button className='btn googleBtn'>
                        <i className="fab fa-google"></i>
                        Google
                    </button>
                </div>
            </div>
        </div>
    )
}
