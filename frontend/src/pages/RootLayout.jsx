import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthContext";
import { ActiveLinkButton, Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axiosInstance";

export const RootLayout = () => {
  const { user, initialLoading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await axiosInstance.delete("/user/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <header className="flex justify-between items-center border-b gap-2 py-4">
        <h1 className="text-2xl hidden md:inline-block">
          <Link className="mail" to="/">
            Mail
          </Link>
        </h1>
        {initialLoading ? (
          <div className="flex w-full md:w-auto justify-evenly gap-4 md:ml-auto">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ) : user ? (
        <>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={logoutUser}>
              <span className="hidden md:inline-block">Log out</span>
            </Button>
          </div>
        </>
        ) : (
        <div className="button-cont">
          <ActiveLinkButton variant="outline" to="login">
            <button>Login</button>
          </ActiveLinkButton>
          <ActiveLinkButton variant="outline" to="register">
            <button>Register</button>
          </ActiveLinkButton>
        </div>
        )}
      </header>
      <main className="my-8">
        <Outlet />
      </main>
    </div>
  );
};
