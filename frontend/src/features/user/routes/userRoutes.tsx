import { Route } from "react-router-dom";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { EditProfilePage } from "../pages/profile/EditProfilePage";
import { UserPage } from "../pages/admin/users/UserPage";
import { UserEditPage } from "../pages/admin/users/UserEditPage";

export const userRoutes = (
  <>
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/profile/edit" element={<EditProfilePage />} />
    <Route path="/users" element={<UserPage />} />
    <Route path="/users/edit/:id" element={<UserEditPage />} />
  </>
);
