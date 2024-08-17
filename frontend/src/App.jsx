import HomePage, { HomaepageLoader } from "./pages/HomePage"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Template from "./pages/templates/Template";
import StudentLoginPage from "./pages/Auth/StudentLoginPage"
import TeacherLoginPage from "./pages/Auth/TeacherLoginPage";
import StudentRegisterPage from "./pages/Auth/StudentRegisterPage";
import TeacherDetailPage, {teacherDetailPageLoader} from "./pages/TeacherDetailPage";
import TeacherHomePage, { teacherHomePageLoader } from "./pages/teacher/teacherHomePage";
import AdminPage from "./pages/Admin/AdminPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Template/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
        loader: HomaepageLoader
      },
      {
        path: "/admin",
        element: <AdminPage/>,
      },
      {
        path: "/login/",
        element: <StudentLoginPage/>
      },
      {
        path: "/login/teacher",
        element: <TeacherLoginPage/>
      },
      {
        path: "/register",
        element: <StudentRegisterPage/>
      },
      {
        path: "/tr/:name",
        element: <TeacherDetailPage/>,
        loader: teacherDetailPageLoader
      },
      {
        path: "teacher",
        element: <TeacherHomePage/>,
        loader: teacherHomePageLoader
      }
    ]
  },
]);

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App;
