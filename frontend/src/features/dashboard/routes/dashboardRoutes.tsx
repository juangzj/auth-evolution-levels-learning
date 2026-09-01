import { Route } from "react-router-dom";
import { DashboardLayout } from "../../../layouts/dashboard/DashboardLayout";
import { DashboardPage } from "../pages/DashboardPage";

export const dashboardRoutes = (
  <Route path="/dashboard" element={<DashboardLayout />}>
    {/* /dashboard */}
    <Route index element={<DashboardPage />} />
  </Route>
);
