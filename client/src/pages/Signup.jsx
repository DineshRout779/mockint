import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { SignupService } from '../services/auth-services';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    isInterviewer: false,
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

    if (values.name && values.email && values.password) {
      try {
        const res = await SignupService(values);

        if (res.status === 200) {
          navigate('/login');
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response);
        setError(error.response.data.error);
      }
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
      <div className='container px-4 md:p-0 mx-auto mx-lg flex justify-center items-center min-h-[90vh]'>
        <div className='max-w-sm shadow-lg p-4 px-6 dark:bg-[#262626] rounded-md'>
          <h3 className='text-2xl my-4 font-bold text-center'>
            Create an account
          </h3>
          {error && <p className='text-red-500 text-center'>{error}</p>}

          <form onSubmit={handleFormsubmit}>
            <input
              ref={ref}
              type='text'
              name='name'
              onChange={handleInputChange}
              placeholder='Full name'
              className='w-full dark:bg-[#262626] px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            />

            <input
              type='email'
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

            <div className='flex items-center my-2'>
              <input
                type='checkbox'
                name='isInterviewer'
                checked={values.isInterviewer}
                onChange={() =>
                  setValues({
                    ...values,
                    isInterviewer: !values.isInterviewer,
                  })
                }
                id='isInterviewer'
              />
              <label htmlFor='isInterviewer' className='ml-2'>
                I want to take interviews
              </label>
            </div>

            <button
              type='submit'
              className='px-6 w-full py-2 my-2 text-white bg-blue-600 rounded-md hover:bg-blue-900'
            >
              {loading ? (
                <>
                  Signing up
                  <Spinner />
                </>
              ) : (
                'Sign up'
              )}
            </button>

            <p className='mt-2'>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-600'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
