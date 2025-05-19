import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../public/logoZ3ater.jpg';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        setUsername(user?.username || '');
      }
    };

    checkAuth();
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', href: '/' },

    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary"><img src={logo} alt="Logo" className="h-10 w-20" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  isActive ? 'text-primary'  : 'text-gray-600 hover:text-primary transition-colors'
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/SingUp')}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 