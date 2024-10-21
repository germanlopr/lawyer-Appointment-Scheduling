import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">LegalScheduler</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                </li>
                <li>
                  <Link to="/schedule" className="hover:text-blue-200">Schedule Appointment</Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/admin" className="hover:text-blue-200">Admin</Link>
                  </li>
                )}
                <li className="flex items-center">
                  <UserCircle className="mr-2" />
                  <span>{user?.name}</span>
                </li>
                <li>
                  <button onClick={logout} className="flex items-center hover:text-blue-200">
                    <LogOut className="mr-2" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-200">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-blue-200">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;