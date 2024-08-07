// components/Signup.js
import React, { useState } from 'react';
import { signupSuccess } from '../slices/signupSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../src/components/ui/command"

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


  const jao = () => {
    router.push('/Ngoregister');
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 w-[24rem]'>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className='p-2 border  rounded-md transition-all'
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className='p-2 border  rounded-md transition-all'
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className='p-2 border rounded-md transition-all'
      />
      {
        check ? <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className='p-2 border  rounded-md transition-all'
        /> :
          <div className='flex flex-col'>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className='p-2 border border-red rounded-md transition-all'
            />
            <p className='text-xs text-red-500'>the passwords don't match sir</p>
          </div>
      }
      <div className='flex flex-col'>
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className='p-2 border  rounded-md transition-all'
        />
        <Command className="rounded-lg border shadow-md">
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
                : <p>lol</p>
            }
          </CommandList>
        </Command>
      </div>
      <input
        name="phoneNumber"
        placeholder="Phone Number"
        onChange={handleChange}
        className='p-2 border  rounded-md transition-all'
      />
      <input
        name="funFood"
        placeholder="Which food/fruit would describe you the best?"
        onChange={handleChange}
        className='p-2 border  rounded-md transition-all'
      />
      <button type="submit"> Sign Up </button>
      <button
        onClick={jao}
        className='border-2 p-2 hover:rounded-lg transition-all'>
        register an ngo
      </button>
    </form>
  );
};

export default Signup;
