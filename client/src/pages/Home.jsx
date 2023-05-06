import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='dark:bg-[#131313] dark:text-white'>
      <div className='container px-4 md:p-0 mx-auto  mx-lg flex justify-center items-center min-h-[90vh]'>
        <div className='w-full flex flex-col md:gap-8 md:flex-row-reverse'>
          <div className='basis-1/3'>
            <img
              src='./imgs/book.svg'
              className='max-w-[360px] m-auto object-cover w-full'
              alt=''
            />
          </div>
          <div className='basis-2/3 text-center md:text-left my-4 md:my-0'>
            <h1 className='text-4xl my-4 lg:text-6xl  text-neutral-800 dark:text-white font-bold lg:leading-snug'>
              Mock Interview <br /> Made Easy!
            </h1>
            <p className='text-md lg:w-2/4 text-gray-500 dark:text-gray-400'>
              MockInt is a platform where anyone can take or give mock
              interviews for free.
            </p>
            <Link
              to='book'
              className='bg-blue-600 text-md font-bold tracking-wide hover:bg-blue-800 inline-block mt-4 text-white p-4 px-8 rounded-full'
            >
              Book your slot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
