import { Navigate, createBrowserRouter } from "react-router-dom"
import LDashboard from "./layouts/dashboard"
import { DataTable, EnhancedTable } from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LDashboard />,
    children: [
      { element: <Navigate to="/table" />, index: true },
      { path: "table", element: <DataTable /> },
      { path: "sample", element: <DataTable /> },
      { path: "data-table", element: <EnhancedTable /> },
    ],
  },
])

export default router
