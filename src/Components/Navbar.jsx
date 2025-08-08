import React, { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';
import BlogLoader from './BlogLoader';

const Navbar = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = (
  <>
    <li >
      <NavLink
        to="/"
        style={{ color: '#483248' }}
        className={({ isActive }) => isActive ? "active-link" : "nav-link"}
      >
        Home
      </NavLink>
    </li>
    {user && 
    <li>
      <NavLink
        to="/addBlogs"
        style={{ color: '#483248' }}
        className={({ isActive }) => isActive ? "active-link " : "nav-link"}
      >
        Add Blog
      </NavLink>
    </li>}
    <li>
      <NavLink
        to="/allBlogs"
        style={{ color: '#483248' }}
        className={({ isActive }) => isActive ? "active-link" : "nav-link"}
      >
        All Blogs
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/featuredBlogs"
        style={{ color: '#483248' }}
        className={({ isActive }) => isActive ? "active-link" : "nav-link"}
      >
        Featured Blogs
      </NavLink>
    </li>
    {user &&
    <li>
      <NavLink
        to="/myWishList"
        style={{ color: '#483248' }}
        className={({ isActive }) => isActive ? "active-link" : "nav-link"}
      >
        Wishlist
      </NavLink>
    </li>}
  </>
);


  if (isLoading) {
    return <BlogLoader />;
  }

  return (
    <div
      className="navbar shadow-sm sticky top-0 z-50"
      style={{
        background: 'linear-gradient(to right, #E6E6FA, #CBC3E3, #CF9FFF)', // Lavender to Light Purple to Light Violet
      }}
    >
      {/* Large screens */}
      <div className="hidden lg:flex md:flex justify-center items-center w-full">
        <ul className="menu menu-horizontal px-1 gap-8" style={{ color: '#AA98A9' }}>
          {links}
        </ul>
      </div>

      {/* Small screens */}
      <div className="flex lg:hidden md:hidden justify-center items-center w-full relative">
        <button
          onClick={handleMenuToggle}
          className="focus:outline-none"
          style={{ color: "#AA98A9" }} // text color for hamburger icon
          aria-label="Toggle menu"
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
          <div
            className="absolute top-full mt-2 rounded-md shadow-lg w-11/12 max-w-xs z-50 p-4"
            style={{ backgroundColor: "#CBC3E3" }} // Light Purple background
          >
            <ul className="grid grid-cols-2 gap-3" style={{ color: '#AA98A9' }}>
              {links}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
