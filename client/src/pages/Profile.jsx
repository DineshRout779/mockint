import { MdModeEdit } from 'react-icons/md';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { state } = useApp();
  const { user } = state;
  return (
    <div className='dark:bg-[#131313] dark:text-gray-300'>
      <div className='container p-4 md:px-0 mx-auto mx-lg min-h-screen'>
        <div className='relative z-10 my-4 w-fit mx-auto'>
          <img
            src='https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg'
            alt=''
            className='object-cover w-24 h-24 rounded-full border-8 border-gray-200'
          />
          <button className='bg-blue-600 p-2 rounded-full text-white absolute bottom-0 right-0'>
            <MdModeEdit />
          </button>
        </div>
        <h1 className='text-4xl my-4 text-center dark:text-white'>
          {user.name}
        </h1>
      </div>
    </div>
  );
};
export default Profile;
