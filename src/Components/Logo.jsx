import React, { useContext } from 'react';
import logo from '../assets/logo1.png';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Logo = () => {
  const { user, signOutUser } = useContext(AuthContext);
 
 
  
  const handleSignOut = async () => {
  try {
    // Sign out from Firebase
    await signOutUser();

    // Clear backend JWT cookie
    await axios.post('https://blog-share-server.vercel.app/logout', {}, { withCredentials: true });

    console.log('User signed out successfully and cookie cleared');
  } catch (error) {
    console.log('Error during sign out:', error);
  }
};


  return (
    <div className="w-full bg-[#1C1C1C]">
      
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 gap-4 md:gap-0'>
          {/* Logo */}
      <div className="flex justify-center md:justify-start flex-1">
        <img
          src={logo}
          alt="logo"
          width={80}
          className="rounded-full  hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title */}
      <div className="flex-1 text-center">
        <h1 className="text-[#AA98A9] text-3xl font-bold">BlogShare.</h1>
      </div>

      {/* Buttons or User Profile */}
      <div className="flex-1 flex justify-center md:justify-end">
  <div className="flex flex-col md:flex-row items-center gap-3">
    {user ? (
      <div className="flex items-center gap-3">
        <img
          src={user.photoURL}
          alt="User profile"
          className="w-12 h-12 rounded-full border-2 border-[#AA98A9] shadow-md"
          title={user.displayName}
        />
        <Link
          onClick={handleSignOut}
          to="/login"
          className="btn btn-sm rounded-lg shadow-md flex items-center justify-center gap-2 px-4 py-2 font-semibold"
          style={{
            background: "linear-gradient(90deg, #5F4D7A, #8B74A4)",
            border: "none",
            color: "white",
            letterSpacing: "0.5px",
            boxShadow: "0 3px 6px rgba(95, 77, 122, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(90deg, #8B74A4, #A58BBE)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(155, 129, 185, 0.6)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(90deg, #5F4D7A, #8B74A4)";
            e.currentTarget.style.boxShadow = "0 3px 6px rgba(95, 77, 122, 0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Logout
         
        </Link>
      </div>
    ) : (
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        {["Login", "Register"].map((text) => (
         <Link
  key={text}
  to={`/${text.toLowerCase()}`}
  className=" btn btn-sm rounded-lg shadow-md flex items-center justify-center gap-2 px-4 py-2 font-semibold"
  style={{
    background: "linear-gradient(90deg, #5F4D7A, #8B74A4)",
    border: "none",
    color: "white",
    letterSpacing: "0.5px",
    boxShadow: "0 3px 6px rgba(95, 77, 122, 0.3)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "linear-gradient(90deg, #8B74A4, #A58BBE)";
    e.currentTarget.style.boxShadow = "0 6px 15px rgba(155, 129, 185, 0.6)";
    e.currentTarget.style.transform = "translateY(-2px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "linear-gradient(90deg, #5F4D7A, #8B74A4)";
    e.currentTarget.style.boxShadow = "0 3px 6px rgba(95, 77, 122, 0.3)";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  {text}
  
</Link>
        ))}
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default Logo;
