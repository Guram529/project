import React, { useState } from 'react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter an email address.' }));
    } else if (!emailPattern.test(value)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};
    validateEmail(email);
    validatePassword(password);

    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    console.log({
      email,
      password,
    });

    setEmail('');
    setPassword('');
    setErrors({});
  };

  

  const isDisabled = Object.values(errors).some((error) => error !== '');
  return (
    <div className='loginPageCont'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div className="box">
           <p className="accountTxt">Didn't have an Account? </p> <a className="link" href="/register">Register</a>
           
           {!isDisabled && <button type="submit"><a className='link' href="/home">Log in</a></button>}
        </div>
      </form>
    </div>
  );
}

