// AppRouter.tsx

import { Routes, Route } from "react-router-dom";

import { ProtectedRoutes } from "./ProtectedRoutes";

import LandingPage from "../pages/landing/LandingPage";

import { authRoutes } from "../features/auth/routes/authRoutes";
import { userRoutes } from "../features/user/routes/userRoutes";
import { dashboardRoutes } from "../features/dashboard/routes/dashboardRoutes";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout";

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />

      {authRoutes}

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardLayout />}>
          {/* Authenticated users */}
          {dashboardRoutes}
          {userRoutes}
        </Route>
      </Route>
    </Routes>
  );
}
