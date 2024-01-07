import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsMoon, BsPerson, BsSun } from 'react-icons/bs';
import { useApp } from '../context/AppContext';
import { actionTypes } from '../context/actionTypes';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, user } = state;

  const handleTheme = () => {
    dispatch({
      type: 'TOGGLE_THEME',
      payload: theme === 'light' ? 'dark' : 'light',
    });
  };

  const handleMenuToggle = () => {
    !open && setOpen(true);
  };

  const handleLogout = () => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
    navigate('/login');
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className='w-full  z-50  sticky top-0 bg-white dark:bg-[#131313] backdrop-filter backdrop-blur-sm bg-opacity-10 dark:text-white shadow-sm'>
      <div className='container w-[90%] px-4 md:px-0 mx-auto max-w-[1200px]'>
        <div className='py-4'>
          <div className='flex justify-between'>
            <div className='flex justify-between items-center'>
              <Link
                to='/'
                className='block text-2xl leading-none font-bold text-zinc-800 dark:text-white'
              >
                MockInt
              </Link>
            </div>

            {user && (
              <div className='flex'>
                <Link to='dashboard' className='block p-2 rounded-sm '>
                  Dashboard
                </Link>
                <Link to='book' className='block p-2 rounded-sm '>
                  Book
                </Link>
              </div>
            )}
            <div className='flex items-center gap-4 relative'>
              {user ? (
                <>
                  <button onClick={handleTheme}>
                    {theme === 'light' ? <BsSun /> : <BsMoon />}
                  </button>
                  <button
                    className='text-2xl flex justify-center items-center rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 w-8 h-8'
                    id='menu-btn'
                    onClick={handleMenuToggle}
                  >
                    <BsPerson />
                  </button>
                  {open && (
                    <div
                      ref={menuRef}
                      className='absolute top-full mt-4 right-8 bg-white dark:bg-[#262626] shadow-lg border border-gray-200 dark:border-gray-700 rounded-md'
                    >
                      <div className='p-2 px-4 border-b dark:border-gray-700'>
                        <h3 className='text-lg text-gray-900 dark:text-white'>
                          {user.name}
                        </h3>
                        <p className='text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
                          {user.email}
                        </p>
                      </div>

                      <div>
                        <Link
                          to='profile'
                          className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className='w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button onClick={handleTheme}>
                    {theme === 'light' ? <BsSun /> : <BsMoon />}
                  </button>
                  <Link to='login' className='p-2 px-4 rounded-md'>
                    Login
                  </Link>
                  <Link
                    to='signup'
                    className='bg-blue-600 hover:bg-blue-700 text-white p-2 px-4 rounded-md'
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
