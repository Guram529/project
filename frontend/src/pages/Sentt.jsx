import React, { useEffect, useState } from "react";
import { Home } from "./users/Home";

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export function Sent() {
  const [emails, setEmails] = useState([]);

  const loadEmails = () => {
    const inbox = JSON.parse(localStorage.getItem("inbox")) || [];
    setEmails(inbox);
  };

  const clearInbox = () => {
    localStorage.removeItem("inbox");
    setEmails([]);
  };
  const deleteEmail = (index) => {
    const inbox = [...emails]; 
    inbox.splice(index, 1); 
    localStorage.setItem('inbox', JSON.stringify(inbox)); 
    setEmails(inbox);
  };

  const archiveEmail = (index) => {
    const inbox = [...emails];
    const archivedEmail = inbox.splice(index, 1)[0];
    const archive = JSON.parse(localStorage.getItem("archive")) || [];
    archive.push(archivedEmail);
    localStorage.setItem("archive", JSON.stringify(archive));
    localStorage.setItem("inbox", JSON.stringify(inbox));
    setEmails(inbox);
  };

  useEffect(() => {
    loadEmails();
  }, []);

  return (
    <div>
      <Home />
      <p className="inbox-title">Inbox</p>
      <button className="clear" onClick={clearInbox}>
        Clear
      </button>
      {emails.length === 0 ? (
        <p className="not-found">No emails found</p>
      ) : (
        emails.map((email, index) => (
          <div className="inbox-cont" key={index}>
            <p className="style-inbox">
              To: <b>{email.recipient}</b>
            </p>
            <div className="style-inbox2">
              <p className="style-inbox"> {email.subject}</p>
            </div>
            <p className="style-inbox3">
              <p> {formatDate(email.date)}</p>

              <button className="archive" onClick={() => archiveEmail(index)}>
                Archive
              </button>
            </p>
            <div onClick={deleteEmail} className="trash">
              <i className="bi bi-trash" id="trash"></i>
            </div>
            
          </div>
        ))
      )}
    </div>
  );
}
