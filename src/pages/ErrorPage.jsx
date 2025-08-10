import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2A2540] text-center px-4">
      <AlertTriangle size={60} className="text-[#AA98A9] mb-4" />
      <h1 className="text-4xl font-bold text-[#AA98A9] mb-2">Oops! Page Not Found</h1>
      <p className="text-lg text-[#C1B8D4] mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-gradient-to-r from-[#5F4D7A] to-[#8B74A4] hover:from-[#8B74A4] hover:to-[#A58BBE] text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
