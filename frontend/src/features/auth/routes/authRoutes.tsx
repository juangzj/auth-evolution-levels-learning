import { Route } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../../user/pages/register/RegisterPage";

export const authRoutes = (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </>
);
