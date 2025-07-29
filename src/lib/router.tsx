import { createBrowserRouter, Navigate } from "react-router-dom";

import { DailyReportFormPage } from "@/pages/daily-report-form-page";

/**
 * Router
 * @description Router for the application
 * @returns {BrowserRouterProvider} Router provider
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/form" />,
  },
  {
    path: "/form",
    element: <DailyReportFormPage />,
  },
]);
