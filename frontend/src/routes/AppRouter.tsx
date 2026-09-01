// AppRouter.tsx

import { Routes, Route } from "react-router-dom";

import { ProtectedRoutes } from "./ProtectedRoutes";

import LandingPage from "../pages/landing/LandingPage";

import { authRoutes } from "../features/auth/routes/authRoutes";
import { userRoutes } from "../features/user/routes/userRoutes";
import { dashboardRoutes } from "../features/dashboard/routes/dashboardRoutes";

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />

      {authRoutes}

      {userRoutes}

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
        {/* Authenticated users */}
        {dashboardRoutes}
      </Route>
    </Routes>
  );
}
