import React, { useContext } from 'react';
import logo from '../assets/logo1.png';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Logo = () => {
  const { user, signOutUser } = useContext(AuthContext);
  console.log(user);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log('User signed out successfully'))
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full bg-[#1C1C1C]">
      
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 gap-4 md:gap-0'>
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
        <h1 className="text-[#CF9FFF] text-3xl font-bold">BlogShare.</h1>
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
                className="
                  group w-full md:w-[140px] px-4 py-2 
                  text-center flex items-center justify-center gap-2 
                  bg-[#CF9FFF] text-[#3B2E5B] text-base font-semibold 
                  shadow-md transition-all duration-300 
                  rounded-full 
                  hover:bg-gradient-to-r hover:from-[#CBC3E3] hover:to-[#E6E6FA] 
                  hover:shadow-lg hover:shadow-purple-300
                "
              >
                Logout
                <span className="w-5 h-5 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <ArrowRight size={20} />
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Link
                to="/login"
                className="
                  group w-full md:w-[140px] px-4 py-2 
                  text-center flex items-center justify-center gap-2 
                  bg-[#CF9FFF] text-[#3B2E5B] text-base font-semibold 
                  shadow-md transition-all duration-300 
                  rounded-full 
                  hover:bg-gradient-to-r hover:from-[#CBC3E3] hover:to-[#E6E6FA] 
                  hover:shadow-lg hover:shadow-purple-300
                "
              >
                Login
                <span className="w-5 h-5 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <ArrowRight size={20} />
                </span>
              </Link>

              <Link
                to="/register"
                className="
                  group w-full md:w-[140px] px-4 py-2 
                  text-center flex items-center justify-center gap-2 
                  bg-[#CF9FFF] text-[#3B2E5B] text-base font-semibold 
                  shadow-md transition-all duration-300 
                  rounded-full 
                  hover:bg-gradient-to-r hover:from-[#CBC3E3] hover:to-[#E6E6FA] 
                  hover:shadow-lg hover:shadow-purple-300
                "
              >
                Register
                <span className="w-5 h-5 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <ArrowRight size={20} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Logo;
