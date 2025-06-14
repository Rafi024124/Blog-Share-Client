import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
//import { Helmet } from 'react-helmet';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import registerLottieData from '../assets/lottie/register.json';
import loginPic from '../assets/loginpic.jpg'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error('Google Sign-in Error:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-in Failed',
          text: error.message,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        e.target.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log('Firebase login error:', error.code);

        switch (error.code) {
          case 'auth/user-not-found':
            Swal.fire({
              icon: 'error',
              title: 'User Not Found',
              text: "No user found with this email.",
            });
            break;

          case 'auth/wrong-password':
            Swal.fire({
              icon: 'error',
              title: 'Wrong Password',
              text: "The password you entered is incorrect.",
            });
            break;

          case 'auth/invalid-email':
            Swal.fire({
              icon: 'warning',
              title: 'Invalid Email',
              text: "Please enter a valid email address.",
            });
            break;

          case 'auth/too-many-requests':
            Swal.fire({
              icon: 'info',
              title: 'Too Many Attempts',
              text: "Please wait and try again later.",
            });
            break;

          default:
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: "Something went wrong. Please try again.",
            });
        }
      });
  };

  return (
    <div className="mt-2 min-h-screen flex items-center justify-center px-4">
      {/* <Helmet>
        <title>PLUNT | Login</title>
      </Helmet> */}

      <div className="relative w-full max-w-7xl h-full rounded-3xl overflow-hidden shadow-2xl">
        

        <div className=" p-4 relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-20">
          
          <div className='bg-amber-300 hidden lg:flex'>
                 <img src={loginPic} alt="" />
          </div>
          <div className="w-full max-w-md bg-red-100 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl p-8">
            <div className="w-40 h-40 mx-auto mb-6">
              <Lottie animationData={registerLottieData} loop={true} />
            </div>

            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
              Login to Your Account
            </h2>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 rounded-lg border border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2 rounded-lg border border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="text-right mb-4">
                <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="btn w-full text-white bg-[#A53860]  hover:scale-105 transition-all duration-300 py-2 rounded-lg"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                New to this website?{' '}
                <Link to="/register" className="text-blue-500 hover:text-blue-700">
                  Register Now
                </Link>
              </p>
            </div>

            <button
              onClick={handleSignInWithGoogle}
              className="btn w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 text-gray-700 shadow-md hover:bg-gray-100 transition-all"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                alt="Google Logo"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
