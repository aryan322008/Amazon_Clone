import React from 'react';
import logo from "../../assets/images/amazon-logo.png";
import InfoIcon from '@mui/icons-material/Info';
import {
    Link,
  } from "react-router-dom";

const Auth = () => {
    return (
        <>
            <div className="authContainer">

                <div className="logo">
                    <img src={logo} />
                    <span className="img_span">.in</span>
                </div>

                <div className="formContainer">
                    <h2>Create a Account</h2>
                    <form className="authForm">

                        {/* Make a seprate components for input */}

                        <div className="inputContainer">
                            <label for="name">Name</label>
                            <input
                                type="text" name="name" id="name" placeholder="First and Last Name" />
                        </div>

                        <div className="inputContainer">
                            <label for="email">Email</label>
                            <input
                                type="email" name="email" placeholder="email" id="email" />
                        </div>

                        <div className="inputContainer">
                            <label for="password">Password</label>
                            <input
                                type="password" name="password" placeholder="At least 6 Characters" id="password" style={{ marginBottom: "0.2rem" }} />
                            <span className="passwordText">
                                <InfoIcon style={{ fontSize: "1rem" }} />
                                Passwords must be at least 6 characters. </span>

                        </div>


                        <div className="policy">By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Amazon. Message and data rates may apply.</div>

                        <button type="submit">Continue</button>
                    </form>

                    <div className="changePageLink">
                        Already have an account? <Link to="/">Sign in</Link>
                        </div>

                </div>

            </div>

        </>

    );
}

export default Auth;
