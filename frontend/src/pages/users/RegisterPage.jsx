import React, { useState } from "react";

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    validateUsername(e.target.value);
  };

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



  
  const validateUsername = (value) => {
    const usernamePattern = /^[a-zA-Z]+$/;
    if (!value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Please enter a username.' }));
    } else if (!usernamePattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Username must contain only letters.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 8 characters long.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    console.log({
      username,
      email,
      password,
      confirmPassword
    });

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  const isDisabled = Object.values(errors).some((error) => error !== '');

  return (
    <div className="RegisterCont">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <br />
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        <br />
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}

        </div>
        <br />
        <div className="box">
           <p className="accountTxt">Or if you have an Account </p> <a className="link" href="/login">Log in</a>
           {!isDisabled && <button type="submit">Register</button>}
        </div>
       
      </form>
    </div>
  );
}
