import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { RootLayout } from "./pages/RootLayout";
import { AuthContext, AuthContextProvider } from "./components/AuthContext";
import { useContext } from "react";
import { LoginPage } from "./pages/users/LoginPage";
import { RegisterPage } from "./pages/users/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Start } from "./pages/users/start";
import { Home } from "./pages/users/Home";
import { Compose } from "./pages/compose";
import { Sent } from "./pages/Sentt";
import { Archive } from "./pages/Archive";


const ProtectedRoute = () => {
  const { user, initialLoading } = useContext(AuthContext);

  if (initialLoading) return null;

  if (user !== null) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};


export const App = () => {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Start />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/sent" element={<Sent />} />
            <Route path="/archive" element={<Archive />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};
