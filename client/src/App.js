import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
