import React from 'react';
import logo from '../assets/blog logo.png'

const Logo = () => {
    return (
        <div className='w-full flex justify-around items-center p-2'>

             <div>
        <img
          src={logo}
          alt="logo"
          width={80}
          className="rounded-full border-4 border-pink-500 shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>


          
            <div>
                  <h1 className=' text-pink-500 text-3xl font-bold'>BlogShare.</h1>
            </div>
             
      
     
            <div>
                <div className="navbar-end">
        {/* {user ? (
          <div className="flex justify-center items-center gap-3">
            <img
              src={user.photoURL}
              alt="User profile"
              className="w-12 h-12 rounded-full"
              title={user.displayName}
            />
            <Link
              onClick={handleSignOut}
              to={"/login"}
              className="btn bg-white text-pink-700 rounded-full hover:bg-pink-100"
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="btn bg-white text-pink-700 rounded-full hover:bg-pink-100"
          >
            Login
          </Link>
        )} */}
        <button className='btn bg-pink-600'>Login</button>
        
      </div>
            </div>
            
        </div>
    );
};

export default Logo;