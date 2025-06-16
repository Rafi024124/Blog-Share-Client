// import React, { useContext } from 'react';
import React, { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';
import BlogLoader from './BlogLoader';
// import logo from "../assets/blog logo.png";
// import { AuthContext } from '../providers/AuthProvider';


const Navbar = () => {
  //   const { user, signOutUser } = useContext(AuthContext);

  //   const handleSignOut = () => {
  //     signOutUser()
  //       .then(() => {
  //         console.log('user signed out successfully');
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  const {user, isLoading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "nav-link"}>
          Home
        </NavLink>
      </li>
      {user && 
      <li>
        <NavLink to="/addBlogs" className={({ isActive }) => isActive ? "active-link" : "nav-link"}>
          Add Blog
        </NavLink>
      </li>}
      <li>
        <NavLink to="/allBlogs" className={({ isActive }) => isActive ? "active-link" : "nav-link"}>
          All Blogs
        </NavLink>
      </li>
      <li>
        <NavLink to="/featuredBlogs" className={({ isActive }) => isActive ? "active-link" : "nav-link"}>
          Featured Blogs
        </NavLink>
      </li>
      {user &&
      <li>
        <NavLink to="/myWishList" className={({ isActive }) => isActive ? "active-link" : "nav-link"}>
          Wishlist
        </NavLink>
      </li>}
    </>
  );

 if(isLoading){
    return <BlogLoader></BlogLoader>
 }


  return (
    <div
      className="navbar shadow-sm"
      style={{
        background: 'linear-gradient(to right, #EF88AD, #A53860, white)'
      }}
    >
      {/* Large screens */}
      <div className="hidden lg:flex md:flex justify-center items-center w-full">
        <ul className="menu menu-horizontal px-1 gap-8 text-white">
          {links}
        </ul>
      </div>

      {/* Small screens */}
      <div className="flex lg:hidden md:hidden justify-center items-center w-full relative">
        <button
          onClick={handleMenuToggle}
          className="text-white focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute top-full mt-2 bg-[#A53860] rounded-md shadow-lg w-11/12 max-w-xs z-50 p-4">
            <ul className="grid grid-cols-2 gap-3 text-white">
  {links}
</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
