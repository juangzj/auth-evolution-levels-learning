import { Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";

export const userRoutes = (
  <>
    <Route path="/register" element={<RegisterPage />} />
  </>
);
