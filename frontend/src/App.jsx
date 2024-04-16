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
import { LoginPage } from "./users/LoginPage";
import { RegisterPage } from "./users/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Start } from "./users/start";

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
