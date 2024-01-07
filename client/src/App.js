import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Toaster position='bottom-center' reverseOrder={false} />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
