// components/Signup.js
import React, { useState } from 'react';
import { signupSuccess } from '../slices/signupSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Anek_Latin } from 'next/font/google';
import styles from '../src/app/Signup.module.css'
import axios from 'axios';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../src/components/ui/command"

const anek = Anek_Latin({
  weight: ['300', '500', '700'],
  subsets: ['latin']
})

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
  const [check, setCheck] = useState(true);
  const [cities, setCities] = useState([]);

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'city') {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_MAPBOX_URL}/suggest?q=${e.target.value}&language=en&session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_SECRET}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)

        if (response.status === 200) {
          setCities(response.data.suggestions);
          console.log(cities);
        } else {
          console.log("error occurred getting cities");
        }
      } catch (error) {
        setCities([]);
        console.log("error occurred setting cities: ", error)
      }
    }
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    if (formData.confirmPassword != formData.password) {
      setCheck(false);
    } else {
      try {
        const response = await axios.post('/api/signup', formData, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
          console.log("conso", response.data.id)
          dispatch(signupSuccess({ userId: response.data.id }));
          console.log('User signed up successfully');
        } else {
          console.error('Error response up user');
        }
      } catch (error) {
        console.error('Error signing up user:', error);
      }
    }
  };

  return (
    <div className={`h-[100vh] ${anek.className} flex`}>
      <div className={`${styles.bg} sm:w-1/2 h-full`}>
        <div className='flex flex-col'>
          <div className='mt-20 sm:mt-12 ml-12 text-5xl text-gray-500'>
            <p> Hello! Joining Us ? </p>
          </div>
          <div className={`ml-16`}>
            <form onSubmit={handleSubmit} className={` flex flex-col space-y-4 w-[18rem] mt-10`}>
              <input
                name="name"
                placeholder="name"
                onChange={handleChange}
                className='p-2 outline rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600'
              />
              <input
                name="email"
                placeholder="email"
                onChange={handleChange}
                className='p-2  rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600'
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                className='p-2 rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600'
              />
              {
                check ? <input
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                  onChange={handleChange}
                  className='p-2 rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600'
                /> :
                  <div className='flex flex-col'>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="confirm password"
                      onChange={handleChange}
                      className='p-2-red rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600'
                    />
                    <p className='text-xs text-red-500'>the passwords don't match sir</p>
                  </div>
              }
              <div className='flex flex-col'>
                <input
                  name="city"
                  placeholder="city"
                  onChange={handleChange}
                  className='p-2  rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600'
                />
                <Command className="rounded-lg border shadow-md transition-all ease-in bg-transparent backdrop-blur-md">
                  <CommandList>
                    {
                      cities.length > 0 ? (
                        <CommandGroup heading="Showing matching cities">
                          {
                            cities.map((x, i) => {
                              return (
                                <CommandItem>
                                  {x.name}, {x.place_formatted}
                                </CommandItem>
                              )
                            })
                          }
                        </CommandGroup>
                      )
                        : ''
                    }
                  </CommandList>
                </Command>
              </div>
              <input
                name="phoneNumber"
                placeholder="phone number"
                onChange={handleChange}
                className='p-2 rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600'
              />
              <input
                name="funFood"
                placeholder="Which food/fruit would describe you the best?"
                onChange={handleChange}
                className='p-2 rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600'
              />
              <div className=''>
                <button
                  type="submit"
                  className='mt-4 w-full p-2 shadow-md font-medium'
                > <p> Sign Up </p> </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={`${styles.bg1} sm:flex hidden w-1/2 p-4`}>

      </div>
    </div>

  );
};

export default Signup;
