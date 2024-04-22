import { Outlet,  Link, useLocation,  } from "react-router-dom";
import React, { useState, useEffect } from 'react';


import { ActiveLinkButton, Button } from "@/components/ui/button";


export const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  

  useEffect(() => {
    
    if (location.pathname === '/home' || location.pathname === '/compose' || location.pathname === '/archive' || location.pathname === '/sent' || location.pathname === '/inbox') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
   
    setIsLoggedIn(false);
   
   
  };
  return (
    <div className="max-w-4xl mx-auto px-4">
      <header className="flex justify-between items-center border-b gap-2 py-4">
        <h1 className="text-2xl hidden md:inline-block">
          <Link className="mail" to="/">
            Mail
          </Link>
        </h1>

        {!isLoggedIn && (
              <>
                <div className="button-cont">
          <ActiveLinkButton variant="outline" to="login">
            <button>Login</button>
          </ActiveLinkButton>
          <ActiveLinkButton variant="outline" to="register">
            <button>Register</button>
          </ActiveLinkButton>
        </div>
              </>
            )}
        
        {isLoggedIn && (
           <div className="logout">
           <Button className="btn" variant="outline" onClick={handleLogout}>
             <a href="/" className="link">Log out</a>
           </Button>
         </div>
        )

        }
        
    
        
        
      </header>
      <main className="my-8">
        <Outlet />
       
      </main>
    </div>
  );
};
