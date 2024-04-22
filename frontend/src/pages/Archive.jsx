import React, { useEffect, useState } from "react";
import { formatDate } from "./Sentt";
import { Home } from "./users/Home";

export const Archive = () => {
    const [archivedEmails, setArchivedEmails] = useState([]);

    const loadArchivedEmails = () => {
      const archive = JSON.parse(localStorage.getItem('archive')) || [];
      setArchivedEmails(archive);
    };

    const unarchiveEmail = (index) => {
        const archive = [...archivedEmails];
        const emailToUnarchive = archive.splice(index, 1)[0]; 
        const inbox = JSON.parse(localStorage.getItem('inbox')) || [];
        inbox.push(emailToUnarchive); 
        localStorage.setItem('inbox', JSON.stringify(inbox)); 
        localStorage.setItem('archive', JSON.stringify(archive)); 
        setArchivedEmails(archive); 
      };
    
  
    useEffect(() => {
      loadArchivedEmails();
    }, []);
  

  return (
    <div>
    <Home />
    <p className="inbox-title">Archive</p>
    
    {archivedEmails.length === 0 ? (
      <p className="not-found">No emails found</p>
    ) : (
      archivedEmails.map((email, index) => (
        <div className="inbox-cont2" key={index}>
          <p className="style-inbox">
           
            To: <b>{email.recipient}</b>
          </p>
          <div className="style-inbox2">
            <p className="style-inbox"> {email.subject}</p>
          </div>
          <p className="style-inbox3">
            <p> {formatDate(email.date)}</p><button className="unarchive" onClick={() => unarchiveEmail(index)}>UnArchive</button> 
          </p>
          
        </div>
      ))
    )}
  </div>
  );
};
