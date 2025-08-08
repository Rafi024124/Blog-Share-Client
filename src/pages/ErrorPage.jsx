import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center px-4">
            <AlertTriangle size={60} className="text-pink-500 mb-4" />
            <h1 className="text-4xl font-bold text-pink-600 mb-2">Oops! Page Not Found</h1>
            <p className="text-lg text-pink-400 mb-6">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
