import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Decode token if needed (or store user info during login/register)
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name || 'User' }); // Temporary placeholder
      } catch (e) {
        setUser({ name: 'User' });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name || 'User' }); // Assuming token contains user info
      } catch (e) {
        setUser({ name: 'User' });
      }
    }
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
        MERN Blog
      </Link>

      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/create" className="text-gray-700 hover:text-blue-600">
          Create Post
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-600">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
