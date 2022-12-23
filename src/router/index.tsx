import Login from "@/pages/login"

import Offline from "@/pages/offline"
import NotFound from "@/pages/404"
import Layout from "@/layout"



import type { RouteObject } from "react-router-dom"


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />
      }
    ]
  },
  { path: "offline", element: <Offline /> },
  { path: "*", element: <NotFound /> }
]

export default routes
