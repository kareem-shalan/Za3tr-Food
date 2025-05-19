import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CategoryFilters from './CategoryFilters';

function Layout() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.startsWith('/category/')) {
      const category = path.split('/').pop();
      return `${category.charAt(0).toUpperCase() + category.slice(1)} Meals`;
    }
    if (path.startsWith('/product/')) return 'Meal Details';
    if (path === '/login') return 'Login';
    if (path === '/SingUp') return 'Sign Up';
    return 'Z3ater';
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      
      {location.pathname === '/' || location.pathname.startsWith('/category/') ? (
        <CategoryFilters />
      ) : null}

      <main className="flex-grow w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-6 min-h-[calc(100vh-200px)]">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
            {getPageTitle()}
          </h1>
          <div key={location.pathname} className="transition-all duration-300">
            <Outlet />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;
