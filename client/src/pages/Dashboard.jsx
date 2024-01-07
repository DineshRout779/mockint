import { useApp } from '../context/AppContext';
import { RiMapPin2Line } from 'react-icons/ri';

const Dashboard = () => {
  const { state } = useApp();
  const { user } = state;

  return (
    <div className='dark:bg-[#131313] dark:text-white'>
      <div className='container w-[90%] px-4 md:px-0 py-8 mx-auto max-w-[1200px] min-h-screen'>
        <div className='flex gap-4 '>
          <div className=''>
            <img
              src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
              className='aspect-square w-36 rounded-md'
              alt=''
            />
          </div>
          <div className='grow p-4'>
            <h1 className='text-2xl '>{user.name}</h1>
            <p className='text-gray-600 text-sm my-1 dark:text-gray-400'>
              Frontend Developer <span className='text-blue-400'>@Ziplr</span>
            </p>
            <p className='text-gray-600 text-sm my-1 dark:text-gray-400 flex items-center gap-2'>
              <RiMapPin2Line /> Bhubaneswar, Odisha, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
