// components/Signup.js
import React, { useState } from 'react';
import { signupSuccess } from '../slices/signupSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Anek_Latin } from 'next/font/google';
import styles from '../src/app/Signup.module.css'
import axios from 'axios';
import { Compass, Cookie, Mail, PersonStanding, Phone, Shield, ShieldEllipsis, UserRound } from 'lucide-react';

const anek = Anek_Latin({
  weight: ['300', '400', '500', '700'],
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
  const [check, setCheck] = useState(false);
  const [city, setCity] = useState('')
  const [phun, setPhun] = useState('');
  const [cities, setCities] = useState([]);
  const [click, setClick] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = async (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'city') {
      setCity(e.target.value)
    }

    if (e.target.name === 'phoneNumber') {
      setPhun(e.target.value)
    }

    if (e.target.name === 'confirmPassword') {
      if (formData.password !== e.target.value) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    }

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
    try {
      const response = await axios.post('/api/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        const str = response.data
        if (str === "User already exists") {
          setError(true);
          console.log("hi")
        } else {
          console.log("status", response.data)
          dispatch(signupSuccess({ userId: response.data.id }));
          console.log('User signed up successfully');
        }
      } else {
        console.error('Error response up user');
      }
    } catch (error) {
      console.error('Error signing up user:', error);
    }
  };

  return (
    <div className={`h-[100vh] ${anek.className} flex`}>
      <div className={`${styles.bg} w-full sm:w-1/2 h-full`}>
        <div className='flex flex-col'>
          <div className='mt-12 sm:mt-12 ml-12 text-4xl sm:text-5xl text-gray-500'>
            <p> Hello! Joining Us ? </p>
          </div>
          <div className={`ml-16 sm:mt-0 mt-16`}>
            <form onSubmit={handleSubmit} className={` flex flex-col space-y-4 w-[18rem] mt-10`}>
              <div className='flex'>
                <UserRound
                  className='w-4 mt-2 mr-2 text-gray-600'
                />
                <input
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                  className='p-2 outline rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-white sm:text-gray-600 text-sm w-full'
                />
              </div>
              <div className='flex'>
                <Mail
                  className='w-4 mt-2 mr-2 text-white sm:text-gray-600'
                />
                <input
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  className='p-2  rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-white sm:text-gray-600 text-sm w-full'
                />
              </div>
              <div className='flex'>
                <Shield
                  className='w-4 mt-2 mr-2 text-white sm:text-gray-600'
                />
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                  className='p-2 rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-white sm:text-gray-600 text-sm w-full'
                />
              </div>
              <div className='flex flex-col'>
                <div className='flex'>
                  <ShieldEllipsis
                    className='w-4 mt-2 mr-2 text-gray-600'
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="confirm password"
                    onChange={handleChange}
                    className='p-2 rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600 text-sm w-full'
                  />
                </div>
                {
                  check ? <p className='text-xs text-red-400 font-medium mt-1'> bro those passwords don't match </p> : ''
                }
              </div>
              <div className='flex flex-col'>
                <div className='flex'>
                  <Compass
                    className='w-4 mt-2 mr-2 text-gray-600'
                  />
                  <input
                    name="city"
                    placeholder="city"
                    onChange={handleChange}
                    className='p-2  rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600 text-sm w-full'
                    value={city ? city : ''}
                  />
                </div>
                {
                  cities.length > 0 && click === false ? (
                    <div className="rounded-lg border shadow-md transition-all ease-in bg-transparent backdrop-blur-md text-sm p-2">
                      <div>
                        <div>
                          {
                            cities.map(x => {
                              return (
                                <div
                                  className="hover:cursor-pointer bg-white/25 hover:bg-transparent p-1 rounded-md mt-1"
                                  onClick={() => (setCity(x.name), setClick(true))}
                                >
                                  {x.name}, {x.place_formatted}
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  )
                    : ''
                }
              </div>
              <div className='flex flex-col'>
                <div className='flex'>
                  <Phone
                    className='w-4 mt-2 mr-2 text-gray-600'
                  />
                  <input
                    name="phoneNumber"
                    placeholder="phone number"
                    onChange={handleChange}
                    className='p-2 rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600 text-sm w-full'
                  />
                </div>
                {
                  phun.length > 11 ? <p className='text-xs text-red-400 font-medium mt-1'> bro this isn't a valid phone number </p> : ''
                }
              </div>
              <div className='flex'>
                <Cookie
                  className='w-4 mt-2 mr-2 text-gray-600'
                />
                <input
                  name="funFood"
                  placeholder="Which food would describe you the best?"
                  onChange={handleChange}
                  className='p-2 rounded-md transition-all bg-transparent backdrop-blur-md placeholder:text-black/60 h-10 shadow-md text-gray-600 text-sm w-full'
                />
              </div>
              <div className=''>
                <button
                  type="submit"
                  className={`${(phun.length === 11 || phun.length === 10) && check === false ? `` : 'bg-white/60 text-gray-300 hover:cursor-not-allowed'} mt-4 w-full p-2 shadow-md font-medium ${error === true ? `bg-red-500` : `bg-white`} rounded-md text-gray-600`}
                >  {
                    error === true ? <p className='text-white'> User already exists </p> : <p> Sign up </p>
                  } </button>
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
