import { format } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Select from 'react-select';
import { useApp } from '../context/AppContext';
import { createSlotService } from '../services/book-service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const options = [
  { value: 'frontend', label: 'Front-end' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full-Stack' },
  { value: 'general', label: 'General (oncampus)' },
  { value: 'devops', label: 'DevOps' },
];

const Book = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    date: null,
    time: '',
    type: '',
    link: '',
    info: '',
    created_by: state.user._id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.date && values.time && values.type && values.link) {
      try {
        const res = await createSlotService(
          values,
          state.user,
          state.user.token
        );

        if (res.status === 201) {
          toast.success('Slot booked ✅');
          navigate('/dashboard');
        }
      } catch (error) {
        // toast.success(error.response.)
        console.log(error.response);
      }
    } else {
      // console.log('please fill all the fields');
      toast.error('Please fill all the fields');
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (value) => {
    setValues({
      ...values,
      date: value,
    });
  };

  const handleChangeSelect = (option) => {
    setValues({
      ...values,
      type: option.value,
    });
  };

  return (
    <div className='dark:bg-[#131313] dark:text-gray-300'>
      <div className='container w-[90%] px-4 md:px-0 mx-auto max-w-[1200px] py-8 min-h-screen'>
        <h1 className='text-2xl mb-4 dark:text-white'>
          Open a slot for giving a mock interview.
        </h1>

        <form className='md:flex gap-8' onSubmit={handleSubmit}>
          <div className='basis-1/2'>
            <p>Choose your interview topic</p>
            <div className='my-2 text-gray-900 max-w-[360px]'>
              <Select
                options={options}
                value={options.find((obj) => obj.value === values.type)}
                onChange={handleChangeSelect}
              />
            </div>

            <p>Choose your timing</p>
            <input
              type='time'
              className='w-full border  text-black border-[#ccc] my-2 max-w-[360px] rounded-[4px] focus:outline-none p-2'
              name='time'
              id='time'
              defaultValue={values.time}
              onChange={handleChange}
            />

            <p>Provide the meet link</p>
            <input
              type='text'
              name='link'
              value={values.link}
              onChange={handleChange}
              placeholder='i.e. meet.google.com/hnv-bkes-tdc'
              className='w-full border text-black border-[#ccc] my-2 max-w-[360px] rounded-[4px] focus:outline-none p-2'
            />

            <p>Additional information (optional)</p>
            <textarea
              value={values.info}
              onChange={handleChange}
              name='info'
              id='info'
              placeholder='Any additional information...'
              className='w-full border text-black border-[#ccc] my-2 max-w-[360px] rounded-[4px] focus:outline-none p-2'
            ></textarea>

            <button
              type='submit'
              className='block bg-blue-600 my-2 text-white p-2 px-4 rounded-md'
            >
              Submit
            </button>
          </div>

          <div className='basis-1/2'>
            <p>Please pick a date</p>
            <div className='my-2'>
              <DayPicker
                mode='single'
                selected={values.date}
                onSelect={handleDateChange}
                fromDate={new Date()}
              />
            </div>
            {values.date && <p>You selected {format(values.date, 'PP')} ✅</p>}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Book;
