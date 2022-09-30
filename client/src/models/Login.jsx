import React from 'react'
import '../css/LoginReg.css'


export const Login = () => {
    return (
        <div className="wrap">
            <div className="containerBorder">
                </div>
            <div class="container">
            
                <div class="content">
                
                    <h2>Log In</h2>
                    <form action="">
                        <span class="input-item">
                            <i class="fa-solid fa-envelope"></i>
                            <input class="form-input" id="email" type="email" placeholder="Email" required />
                        </span>
                        <span class="input-item">
                            <i class="fa fa-key"></i>
                            <input class="form-input" type="password" placeholder="Password" id="password" name="password" required />
                            <i class="fa fa-eye" aria-hidden="true" type="button" id="eye"></i>

                        </span>
                        <a href="#" className='forgotPassword'>Forgot Password</a>
                        <button class="btn">Log In</button>
                    </form>
                    <div className="or">
                        or
                    </div>
                    <div className="btn googleBtn">

                    </div>

                </div>
            </div>
            
        </div>
    )
}
