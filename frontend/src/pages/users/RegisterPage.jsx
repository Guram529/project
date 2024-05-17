import React, { useState } from "react";
import axios from "axios";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(e.target.value);
  };

 

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    console.log({
     
      email,
      password,
      confirmPassword,
    });

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const isValid = () => {
    return (
      email &&
      !errors.email &&
      password.length >= 8 &&
      !errors.password &&
      confirmPassword === password &&
      !errors.confirmPassword
    );
  };

  return (
    <div className="RegisterCont">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <br />
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
        </div>
        <br />
        <div className="box">
          <p className="accountTxt">Or if you have an Account </p>{" "}
          <a className="link" href="/login">
            Log in
          </a>
          <div className="register-button-container">
            <button type="submit" className="register-button">
              <a className="link" href="/login">
                Register
              </a>
            </button>
            {!isValid() && <div className="overlay"></div>}
          </div>
        </div>
      </form>
    </div>
  );
}
