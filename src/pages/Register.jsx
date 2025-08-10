import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import loginPic from '../assets/loginpic.jpg';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);

  // Google Sign-in handler
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const userEmail = result.user.email;
      await axios.post(
        'https://blog-share-server.vercel.app/jwt',
        { email: userEmail },
        { withCredentials: true }
      );
      Swal.fire('Success', 'Logged in with Google!', 'success');
      navigate('/');
    } catch (error) {
      console.error('Google Sign-in Error:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Google Sign-in Failed',
        text: error.message,
      });
    }
  };

  // Register with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password validation
    if (!/[A-Z]/.test(password)) {
      Swal.fire('Error', 'Password must contain at least one uppercase letter.', 'error');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      Swal.fire('Error', 'Password must contain at least one special character.', 'error');
      return;
    }
    if (!/[a-z]/.test(password)) {
      Swal.fire('Error', 'Password must contain at least one lowercase letter.', 'error');
      return;
    }
    if (!/[0-9]/.test(password)) {
      Swal.fire('Error', 'Password must contain at least one numeric digit.', 'error');
      return;
    }
    if (password.length < 6) {
      Swal.fire('Error', 'Password must be at least 6 characters long.', 'error');
      return;
    }

    try {
      await createUser(email, password);
      await updateUser(name, photo);

      
      await axios.post(
        'https://blog-share-server.vercel.app/jwt',
        { email },
        { withCredentials: true }
      );

      Swal.fire('Success', 'Registration successful!', 'success');
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire('Error', error.message || 'Failed to register', 'error');
    }
  };

  return (
    <div
      className="mt-2 min-h-screen max-w-7xl mx-auto flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
        border: "1.5px solid rgba(170, 152, 169, 0.5)",
      }}
    >
      <div className="relative w-full max-w-7xl h-full rounded-3xl overflow-hidden flex">
        {/* Left side image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={loginPic}
            alt="Register Illustration"
            className="object-cover h-full w-full rounded-l-3xl"
          />
        </div>

        {/* Right side form container */}
        <div className="w-full lg:w-1/2 bg-[#2A2540] rounded-r-3xl p-6 sm:p-8 flex flex-col justify-center items-center max-w-md mx-auto">
          <h2 className="text-center text-3xl font-semibold text-[#AA98A9] mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
              required
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
              required
            />
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#5F4D7A] to-[#8B74A4] hover:from-[#8B74A4] hover:to-[#A58BBE] text-white font-bold text-lg transition-all duration-300"
            >
              Register
            </button>
          </form>

          <button
            onClick={handleSignInWithGoogle}
            className="btn w-full mt-6 flex items-center justify-center gap-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 text-gray-700 hover:bg-gray-100 transition-all"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-[#AA98A9] text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
