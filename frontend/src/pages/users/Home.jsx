export const Home = () => {
    return (
      <div className="logo">
        <h1>
          <i className="bi bi-envelope-at"></i>
        </h1>
        <div className="btns">
         <button className="btn"><a className="link" href="/inbox">Inbox</a></button>
         <button className="btn"><a className="link" href="/sent">Sent</a></button>
         <button className="btn"><a className="link"  href="/archive">Archive</a></button>
         <button className="btn"><a className="link"  href="/compose">Compose</a></button>

        </div>
        
      </div>
    );
  };
  