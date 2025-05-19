import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetails from './components/ProductDetails';
import CategoryPage from './components/CategoryPage';
import ContextMealsProvider from './context/ContextMeals';
import NotFound from './pages/notFound';
import SingUp from './components/SingUp';
import Login from './components/Login';
import Protecter from './components/protecter';
import About from './pages/About';
import Contact from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Protected routes group
      {
        element: <Protecter />,
        children: [
          {
            path: 'category/:categoryName',
            element: <CategoryPage />,
          },
          {
            path: 'product/:id',
            element: <ProductDetails />,
          },
        ],
      },
      // Public routes
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      // Auth routes
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '/SingUp',
        element: <SingUp />,
      },
      // Catch-all route
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <ContextMealsProvider>
      <RouterProvider router={router} />
    </ContextMealsProvider>
  );
}

export default App;
