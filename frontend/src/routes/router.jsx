import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";


import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClasses from "../pages/Classes/SingleClasses";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/Payment/Payment";



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
      },
      {
        path: "/class/:id",
        element:<SingleClasses/>,
        loader: ({ params }) => fetch(`http://localhost:5000/class/${params.id}`),
      }
    ]
  },

  {
    path: "/dashboard",
    element:<DashboardLayout/>,
    children:[
      {
        index: true,
        element: <Dashboard/>
      },

      //Student routes
      {
        path: "student-cp",
        element:<StudentCP/>
      },
      {
        path: "enrolled-class",
        element:<EnrolledClasses/>
      },
      {
        path: "my-selected",
        element:<SelectedClass/>
      },
      {
        path: "my-payments",
        element:<MyPaymentHistory/>
      },
      {
        path: "apply-instructor",
        element:<AsInstructor/>
      },
      {
        path: "user/payment",
        element:<Payment/>
      }
    ]
  }
]);

export default router;