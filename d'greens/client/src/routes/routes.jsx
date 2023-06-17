import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedPage from "./protectedPage";
import VerifyPage from "../pages/VerifyPage";
import RegisterPage from "../pages/RegisterPage";
import Login from "../pages/login";
import Register from "../pages/register";
import ProfilePage from "../pages/ProfilePage";

const routes = [
  <Route
    path="/home"
    element={
      <ProtectedPage needLogin={true}>
        <HomePage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/profile"
    element={
      <ProtectedPage needLogin={true}>
        <ProfilePage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="vp/:token"
    element={
      <ProtectedPage guestOnly={true}>
        <VerifyPage />
      </ProtectedPage>
    }
  ></Route>,
];

// <Route path="register" element={<RegisterPage />} />,
// <Route path="home" element={<HomePage />} />,

export default routes;
