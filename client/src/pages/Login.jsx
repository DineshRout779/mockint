import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { actionTypes } from '../context/actionTypes';
import { useApp } from '../context/AppContext';
import { LoginService } from '../services/auth-services';

const Login = () => {
  const { dispatch } = useApp();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormsubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (values.email && values.password) {
      try {
        const res = await LoginService(values);
        console.log(res);

        if (res.status === 200) {
          dispatch({
            type: actionTypes.LOGIN,
            payload: res.data.user,
          });
          navigate('/book');
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response);
        setError(error.response.data.error);
      }

      // make login call
    } else {
      setError('All fields are required!');
      setLoading(false);
    }
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className='dark:bg-[#131313] dark:text-white'>
      <div className='container dark:bg-[#131313] dark:text-white px-4 md:p-0 mx-auto mx-lg flex justify-center items-center min-h-[90vh]'>
        <div className='max-w-sm shadow-lg p-4 px-6 dark:bg-[#262626]  rounded-md'>
          <h3 className='text-2xl my-4 font-bold text-center'>Login</h3>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <form onSubmit={handleFormsubmit}>
            <input
              ref={ref}
              type='text'
              name='email'
              onChange={handleInputChange}
              placeholder='Email'
              className='w-full dark:bg-[#262626] px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            />

            <input
              type='password'
              name='password'
              onChange={handleInputChange}
              placeholder='Password'
              className='w-full dark:bg-[#262626] px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            />

            <button
              type='submit'
              className='px-6 w-full py-2 my-2 text-white bg-blue-600 rounded-md hover:bg-blue-900 borer-2 border-blue-600'
            >
              {loading ? (
                <>
                  Logging in
                  <Spinner />
                </>
              ) : (
                'Login'
              )}
            </button>

            <p className='mt-2'>
              New here?{' '}
              <Link to='/signup' className='text-blue-600'>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
