import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";


import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      }
      ,
      {
        path: "instructors",
        element:<Instructors/>
      },
      {
        path:"classes",
        element:<Classes/>
      },
      {
        path: "/login",
        element:<Login/>
      },
      {
        path: "/register",
        element:<Register/>
      }
    ]
  },
]);

export default router;