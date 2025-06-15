import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddBlogs from "../pages/addBlogs/AddBlogs";
import AllBlogs from "../pages/allBlogs/AllBlogs";
import BlogDetails from "../pages/blogDetails/BlogDetails";
import PrivateRoute from "./PrivateRoute";


   const Router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
             {
                path: '/addBlogs',
                element: <PrivateRoute><AddBlogs></AddBlogs></PrivateRoute>
            },
             {
                path: '/allBlogs',
                element: <AllBlogs></AllBlogs>,
                loader: ()=>fetch(`http://localhost:3000/blogs`)
            },
             {
                path: '/blogDetails/:id',
                element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:3000/blogs/${params.id}`)
            },
            
            
            

        ]
    }
   ]);

   export default Router