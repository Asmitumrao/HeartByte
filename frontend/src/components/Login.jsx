import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import useLogin from '../customHook/useLogin.jsx';

const Login = () => {
  const {
    formData,
    handleChange,
    handleSubmit
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg border-t-8 border-blue-600 transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-gray-700">Remember me</label>
            </div>
            <div>
              <a href="#" className="text-blue-500 hover:text-blue-700 hover:underline">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 font-medium hover:underline hover:text-blue-700 transition-colors duration-300">
            Register here
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
