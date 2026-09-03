import { Route } from "react-router-dom";
import { ProfilePage } from "../pages/profile/ProfilePage";

export const userRoutes = (
  <>
    <Route path="/profile" element={<ProfilePage />} />
  </>
);
