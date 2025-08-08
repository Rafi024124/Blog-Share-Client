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
import MyWishList from "../pages/myWishList/MyWishList";
import UpdateBlog from "../pages/updateBlog/UpdateBlog";
import FeaturedBlogs from "../pages/featuredBlogs/FeaturedBlogs";
import ErrorPage from "../pages/ErrorPage";


   const Router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
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
            {
                path:'/myWishList',
                element: <PrivateRoute><MyWishList></MyWishList></PrivateRoute>,
                
            },
            {
  path: "/updateBlog/:id",
  element: <UpdateBlog></UpdateBlog>
},
 {
                path:'/featuredBlogs',
                element:<FeaturedBlogs></FeaturedBlogs>,
                
            },

            
            

        ]
    }
   ]);

   export default Router