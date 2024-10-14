// components/Signup.js
import React, { useState } from 'react';
import { signupSuccess } from '../slices/signupSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Anek_Latin, Yeseva_One } from 'next/font/google';
import styles from '../src/app/Signup.module.css'
import axios from 'axios';
import { Compass, Cookie, Mail, Phone, Shield, ShieldEllipsis, UserRound } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';

const anek = Anek_Latin({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

const yeseva = Yeseva_One({
  weight: ['400'],
  subsets: ['cyrillic']
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
  const [emailCheck, setEmailCheck] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    setError(false);
    const { name, value } = e.target;
    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailCheck(true)
      } else {
        setEmailCheck(false)
      }
    }
    setFormData({ ...formData, [name]: value });
    if (name === 'city') {
      setCity(value)
    }

    if (name === 'phoneNumber') {
      setPhun(value)
    }

    if (name === 'confirmPassword') {
      if (formData.password !== value) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    }

    if (name === 'city') {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_MAPBOX_URL}/suggest?q=${value}&language=en&session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_SECRET}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)

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

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      const response = await axios.post('/api/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        const str = response.data.status
        console.log(response.data.status)
        if (str === "User already exists") {
          setError(true);
          // console.log("hi")
        } else {
          console.log("status", response)
          dispatch(signupSuccess({ userId: response.data.id }));
          router.push('/Login')
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
      <Head>
        <title> Signup </title>
      </Head>
      <div className={`${styles.bg} sm:p-0 p-8 w-full sm:w-1/2 h-[110%] sm:h-[full] rounded-r-xl`}>
        <div className='flex flex-col justify-center '>
          <div className='mt-16 sm:mt-12 flex justify-center text-5xl sm:text-5xl text-emerald-500'>
            <p className={`${yeseva.className} `}> Join the Flavor!  </p>
          </div>
          <div className={`sm:mt-0 mt-16 flex justify-center sm:-ml-10 -ml-2`}>
            <form className={` flex flex-col space-y-4 w-[20rem] sm:mt-10 font-medium`}>
              <div className='flex items-center'>
                <UserRound
                  className='w-16 -ml-6 sm:ml-0 sm:w-5 sm:mr-2 mt-2 text-emerald-400'
                />
                <input
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                  className='p-2 outline rounded-md transition-all bg-white/50 placeholder:text-base sm:placeholder:text-sm placeholder:font-semibold placeholder:text-emerald-400 h-12 sm:h-10 shadow-md text-emerald-400 font-semibold text-sm w-full shadow-emerald-300'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <Mail
                    className='w-16 -ml-6 sm:ml-0 sm:w-5 sm:mr-2 mt-2 text-emerald-400'
                  />
                  <input
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    className={`p-2 outline rounded-md transition-all bg-white/50 placeholder:text-base sm:placeholder:text-sm placeholder:font-semibold placeholder:text-emerald-400 h-12 sm:h-10 shadow-md text-emerald-400 font-semibold text-sm w-full ${emailCheck ? `shadow-red-400` : `shadow-emerald-300`}`}
                    required
                  />
                </div>
                <div>
                  {
                    emailCheck ? <p className='text-xs bg-red-100 p-1 rounded-md text-red-400 font-medium mt-1'> this isn&apos;t a valid email </p> : ''
                  }
                </div>
              </div>
              <div className='flex items-center'>
                <Shield
                  className='w-16 -ml-6 sm:ml-0 sm:w-5 sm:mr-2 mt-2 text-emerald-400'
                />
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                  className='p-2 outline rounded-md transition-all bg-white/50 placeholder:text-base sm:placeholder:text-sm placeholder:font-semibold placeholder:text-emerald-400 h-12 sm:h-10 shadow-md text-emerald-400 font-semibold text-sm w-full shadow-emerald-300'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <ShieldEllipsis
                    className='w-16 -ml-6 sm:ml-0 sm:w-5 sm:mr-2 mt-2 text-emerald-400'
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="confirm password"
                    onChange={handleChange}
                    className={`p-2 outline rounded-md transition-all bg-white/50 placeholder:text-base sm:placeholder:text-sm placeholder:font-semibold placeholder:text-emerald-400 h-12 sm:h-10 shadow-md text-emerald-400 font-semibold text-sm w-full ${check ? `shadow-red-400` : `shadow-emerald-300`}`}
                    required
                  />
                </div>
                {
                  check ? <p className='text-xs bg-red-100 p-1 rounded-md text-red-400 font-medium mt-1'> bro those passwords don&apos;t match </p> : ''
                }
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <Compass
                    className='w-16 -ml-6 sm:ml-0 sm:w-5 sm:mr-2 mt-2 text-emerald-400'
                  />
                  <input
                    name="city"
                    placeholder="city"
                    onChange={handleChange}
                    className='p-2 outline rounded-md transition-all bg-white/50 placeholder:text-base sm:placeholder:text-sm placeholder:font-semibold placeholder:text-emerald-400 h-12 sm:h-10 shadow-md text-emerald-400 font-semibold text-sm w-full shadow-emerald-300'
                    value={city ? city : ''}
                    required
                  />
                </div>
                {
                  cities.length > 0 && click === false ? (
                    <div className="rounded-lg border shadow-md transition-all ease-in bg-white/70 placeholder:font-medium text-sm p-2">
                      <div>
                        <div>
                          {
                            cities.map((x, i) => {
                              return (
                                x.feature_type === 'place' || x.feature_type === 'locality' ? <div
                                  className="hover:cursor-pointer bg-white/25 hover:bg-transparent p-1 rounded-md mt-1 hover:bg-[#99DDCC] text-gray-600 hover:text-white transition-all"
                                  onClick={() => (setCity(x.name), setClick(true))}
                                  key={i}
                                >
                                  <p className='p-1'> {x.name}, {x.place_formatted} </p>
                                </div> : ''
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
                <div className='flex items-center'>
                  <Phone
                    className='w-16 -ml-6 sm:ml-0 sm:w-5 sm:mr-2 mt-2 text-emerald-400'
                  />
                  <input
                    name="phoneNumber"
                    placeholder="phone number"
                    onChange={handleChange}
                    className={`p-2 outline rounded-md transition-all bg-white/50 placeholder:text-base sm:placeholder:text-sm placeholder:font-semibold placeholder:text-emerald-400 h-12 sm:h-10 shadow-md text-emerald-400 font-semibold text-sm w-full ${phun.length > 11 ? `shadow-red-400` : `shadow-emerald-300`}`}
                    required
                  />
                </div>
                {
                  phun.length > 11 ? <p className='text-xs bg-red-100 p-1 rounded-md text-red-400 font-medium mt-1'> bro this isn&apos;t a valid phone number </p> : ''
                }
              </div>
              <div className='flex items-center'>
                <Cookie
                  className='w-16 -ml-6 sm:ml-0 sm:w-5 sm:mr-2 mt-2 text-emerald-400'
                />
                <input
                  name="funFood"
                  placeholder="Which food would describe you the best?"
                  onChange={handleChange}
                  className='p-2 outline rounded-md transition-all bg-white/50 placeholder:text-base sm:placeholder:text-sm placeholder:font-semibold placeholder:text-emerald-400 h-12 sm:h-10 shadow-md text-emerald-400 font-semibold text-sm w-full shadow-emerald-300'
                  required
                />
              </div>
              <div className=''>
                <button
                  type="submit"
                  disabled={(phun.length === 11 || phun.length === 10) && check === false && emailCheck === false ? false : true}
                  className={`${(phun.length === 11 || phun.length === 10) && check === false && emailCheck === false ? `bg-emerald-400 text-white shadow-emerald-400` : 'bg-white/60 text-gray-300 hover:cursor-not-allowed shadow-none'} mt-2 w-full p-4 sm:p-2 shadow-md font-medium ${error === true ? `bg-red-500 shake` : `bg-white`} rounded-md sm:mt-0 mt-2`}
                  onClick={handleSubmit}
                >  {
                    error === true ? <p className='text-white'> User already exists </p> : <p> Sign up </p>
                  } </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={`${styles.bg1} sm:flex hidden w-1/2 p-4 rounded-l-2xl`}>
        <div className='p-16 mt-28'>
          <Image
            src='/personal/forgithub.png'
            height={0}
            width={800}
            alt='carefood'
          />
        </div>
      </div>
    </div>

  );
};

export default Signup;
