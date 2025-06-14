import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

//import { Helmet } from 'react-helmet';

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!/[A-Z]/.test(password)) {
  Swal.fire('Error', 'Password must contain at least one uppercase letter.', 'error');
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


    createUser(email, password)
      .then(() => {
        updateUser(name, photo)
          .then(() => {
            Swal.fire('Success', 'Registration successful!', 'success');
            navigate('/');
          })
          .catch((error) => {
            console.log("Error updating user:", error);
            Swal.fire('Error', 'Failed to update profile.', 'error');
          });
      })
      .catch((error) => {
        console.log("Error creating user:", error.message);
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
    <div className="mt-2 min-h-screen flex items-center justify-center px-4">
      {/* <Helmet>
        <title>Appfinity | Register</title>
      </Helmet> */}

    
      <div className="relative w-full max-w-7xl h-full rounded-3xl overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
        background: 'linear-gradient(to right, #EF88AD, #A53860, white)'
      }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Registration form section */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl p-8">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
              Create an Account
            </h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 rounded-lg border border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="w-full p-2 rounded-lg border border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Photo URL"
                  required
                />
              </div>
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
              <button
                type="submit"
                className="btn w-full text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-300 py-2 rounded-lg mt-2"
              >
                Register
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
