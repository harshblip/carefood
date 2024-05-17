// components/Signup.js
import React, { useState } from 'react';
import { signupSuccess } from '../slices/signupSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    phoneNumber: '',
    funFood: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        console.log(response.data.user)
        dispatch(signupSuccess({ userId: response.data.user.id }));
        console.log('User signed up successfully');
      } else {
        console.error('Error signing up user');
      }
    } catch (error) {
      console.error('Error signing up user:', error);
    }
  };


  const jao = () => {
    router.push('/Ngoregister');
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 w-[24rem]'>
      <input name="name" placeholder="Name" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
      <input name="email" placeholder="Email" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
      <input name="city" placeholder="City" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
      <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
      <input name="funFood" placeholder="Which food/fruit would describe you the best?" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
      <button type="submit">Sign Up</button>
      <button onClick={jao} className='border-2 p-2 hover:rounded-lg transition-all'> register an ngo </button>
    </form>
  );
};

export default Signup;
