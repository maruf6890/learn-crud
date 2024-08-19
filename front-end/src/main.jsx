import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./Home";
import Users from "./Users";
import Blogs from "./Blogs";
import Update from "./Update";

const router = createBrowserRouter([
  {
  
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/users",
        loader: ()=>fetch("http://localhost:5000/users"),
        element: <Users></Users>
      },
      {
        path: "/users/:id",     
        element: <Update></Update>
      }
      ,
      {
        path:"/blogs",
        element: <Blogs></Blogs>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
