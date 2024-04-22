import React, { useState } from "react";
import { Home } from "./users/Home";

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
};

export function Compose() {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isRecipientValid, setIsRecipientValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleRecipientChange = (e) => {
    const email = e.target.value;
    setRecipient(email);
    setIsRecipientValid(isValidEmail(email)); 
  };

  const isFormValid = () => {
    
    return recipient && subject && body && isRecipientValid;
  };

  const handleSend = () => {
    if (!isFormValid()) {
      setErrorMessage(
        !isRecipientValid
          ? 'Invalid recipient email. Please enter a valid email address.'
          : 'Please fill in all fields before sending.'
      );
      return; 
    }

    const newEmail = {
      recipient,
      subject,
      body,
      date: new Date().toISOString(),
    };

    const inbox = JSON.parse(localStorage.getItem('inbox')) || [];
    inbox.push(newEmail);
    localStorage.setItem('inbox', JSON.stringify(inbox));

    setRecipient('');
    setSubject('');
    setBody('');

    setErrorMessage(''); 
    alert('Email sent successfully!');
  };
  return (
    <div>
      <Home />
      <div className="compose-box">
        <div className="inner-box">
          <div>
            <label htmlFor="recipient">Recipient:</label>
            <br />
            <input
              type="text"
              id="recipient"
              className="input"
              value={recipient}
              onChange={handleRecipientChange}
            />
            {!isRecipientValid && (
              <p style={{ color: "red" }}>
                Please enter a valid email address.
              </p>
            )}
          </div>
          <br />
          <div>
            <label htmlFor="subject">Subject:</label>
            <br />
            <input
              type="text"
              id="subject"
              className="input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="body">Body:</label>
            <br />
            <textarea
              id="body"
              value={body}
              className="input-3"
              onChange={(e) => setBody(e.target.value)}
            />
            <br />
            <button onClick={handleSend} disabled={!isRecipientValid}>
              Send
              
            </button>
            {errorMessage && ( // Display error message in red if there is an error
              <p style={{ color: 'red' }}>{errorMessage}</p>
               )}
          </div>
        </div>
      </div>
    </div>
  );
}
