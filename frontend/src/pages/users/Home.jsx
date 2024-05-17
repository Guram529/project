import { NavLink } from "react-router-dom";

export const Home = () => {
    return (
      <div className="logo">
        <h1>
          <i className="bi bi-envelope-at"></i>
        </h1>
        <div className="btns">
         <button className="btn"><NavLink className="link" href="/inbox">Inbox</NavLink></button>
         <button className="btn"><NavLink className="link" href="/sent">Sent</NavLink></button>
         <button className="btn"><NavLink className="link"  href="/archive">Archive</NavLink></button>
         <button className="btn"><NavLink className="link"  href="/compose">Compose</NavLink></button>

        </div>
        
      </div>
    );
  };
  
