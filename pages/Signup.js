// components/Signup.js
import React, { useState } from 'react';
import { signupSuccess } from '../slices/signupSlice';
import { useDispatch } from 'react-redux';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      dispatch(signupSuccess({ userId: user.user.id }))
      console.log('User signed up successfully');
    } else {
      console.error('Error signing up user');
    }
  };

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
    </form>
  );
};

export default Signup;
