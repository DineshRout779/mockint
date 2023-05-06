import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { state } = useApp();
  const { user } = state;

  return (
    <div className='dark:bg-[#131313] dark:text-white'>
      <div className='container p-4 md:px-0 mx-auto mx-lg min-h-screen'>
        <h1 className='text-2xl my-4'>Welcome, {user.name}!</h1>
      </div>
    </div>
  );
};
export default Dashboard;
