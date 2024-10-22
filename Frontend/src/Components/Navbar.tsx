import React, { useState, useEffect ,useCallback} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scissors, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import {jwtDecode} from 'jwt-decode';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUserRole = useCallback(() => {
    const token = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');
    if (token && storedUserRole) {
      setUserRole(storedUserRole);
    } else {
      setUserRole(null);
    }
  }, []);
  useEffect(() => {
    checkUserRole();
  }, [location, checkUserRole]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu toggled, new state:', !isMenuOpen); // Log menu toggle
  };

  const getNavItems = () => {
    switch (userRole) {
      case 'customer':
        return ['Home', 'Customer', 'Tailor', 'Order', 'Track', 'Support', 'Profile', 'Fabric'];
      case 'tailor':
        return ['Tailor Dashboard', 'Inventory Management'];
      case 'admin':
        return ['Home', 'Customer', 'Tailor', 'Order', 'Track', 'Support', 'Profile', 'Fabric', 'Admin Dashboard', 'Tailor Dashboard', 'Inventory Management'];
      default:
        return ['Home'];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserRole(null);
    console.log('User logged out, token removed and role set to null'); // Log logout action
    navigate('/');
  };

  const navItems = getNavItems();
  console.log('Navigation items for current user:', navItems); // Log nav items

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <Scissors className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">TailorMe</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-600 hover:text-primary hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {!userRole ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-primary hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {!userRole ? (
              <>
                <div className="flex items-center px-5">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login" onClick={toggleMenu}>Log In</Link>
                  </Button>
                </div>
                <div className="mt-3 px-5">
                  <Button asChild className="w-full">
                    <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center px-5">
                <Button variant="outline" onClick={() => {
                  handleLogout();
                  toggleMenu();
                }} className="w-full">
                  Log Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;