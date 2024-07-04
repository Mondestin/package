import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Dashboard = lazy(() => import("../views/Dashboard.js"));
const Tables = lazy(() => import("../views/Tables.js"));
const RedirectToGoogle = lazy(() => import("../views/RedirectToGoogle.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/admin/users" /> },
      { path: "/profile/:userId", exact: true, element: <Dashboard /> },
      { path: "/admin/users", exact: true, element: <Tables /> },
      { path: "/not", exact: true, element: <RedirectToGoogle /> },
    ],
  },
];

export default ThemeRoutes;
