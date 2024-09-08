// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginSuccess } from '../slices/signupSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styles from '../src/app/Login.module.css'
import { Anek_Latin } from 'next/font/google';
import Image from 'next/image';
import { Sparkle } from 'lucide-react';

const anek = Anek_Latin({
    weight: ['300', '500', '700'],
    subsets: ['latin']
})

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Error, setError] = useState('')
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            const response = await axios.post('https://carefood-gules.vercel.app/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const user = response.data; // Access response data
                if (user.status) {
                    setError(user.status)
                } else {
                    dispatch(loginSuccess({
                        email: user.user.email,
                        name: user.user.name,
                        accessToken: user.accessToken,
                        isLoggedIn: true
                    }));
                    console.log(user.user.name);
                    router.push('/Landingpage');
                    console.log('User logged in successfully');
                }
            } else {
                console.error('Error logging in user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className={`bg-black h-[100vh] ${anek.className}`}>
            <div className={`${styles.bg}`}></div>
            <div className='flex'>
                <div className='text-white w-full sm:w-1/2 mt-16 sm:mt-0 sm:p-8 flex flex-col'>
                    <div className='text-5xl mt-8 ml-12'>
                        Welcome Back!
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 h-full p-14'>
                        <label>
                            <p className='text-lg'> Email: </p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required
                                className='mt-2 h-8 w-[16rem] sm:w-[18rem] rounded-md p-2 text-black text-sm font-medium outline-none'
                            />
                        </label>
                        <label>
                            <p className='mt-6 text-lg'> Password: </p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => (setPassword(e.target.value), setError(''))} required
                                className='mt-2 h-8 w-[16rem] sm:w-[18rem] rounded-md p-2 text-black text-sm font-medium outline-none'
                            />
                        </label>
                        <div className=' sm:relative'>
                            <p className='text-sm underline'> Don&apos;t have an account ? </p>
                        </div>
                        <button
                            type="submit"
                            className='sm:w-1/2 w-44 border p-2 rounded-md flex justify-center items-center'
                        >{
                                Error ? <div className='flex'> <p className='text-sm mt-4 mr-4'> {Error}</p> <Image
                                    src='/personal/mike.png'
                                    height={0}
                                    width={80}
                                    alt='mike'
                                    className='rounded-md'
                                /></div> : <p> Login </p>
                            }</button>
                    </form>
                </div>
                <div className={`bg-[#42B37C] ${anek.className} text-white rounded-lg flex-col h-[33rem] w-[28rem] ml-32 mt-12 p-8 hidden sm:flex`}>
                    <div className=''>
                        <p className='text-3xl font-medium'> What our <br /> foodies have to say. <br /> “ </p>
                    </div>
                    <div>
                        <p className='mt-4 text-sm font-light'> &quot;Searching and browsing food is easier and fun as ever. <br /> Just put your city and you are good to go!&quot;  </p>
                    </div>
                    <div className='flex flex-col mt-8'>
                        <p className='font-medium'> FNC Alfajer </p>
                        <p className='text-xs font-light'> professional player for FNATIC </p>
                    </div>
                    <div className='flex justify-end -mr-4 -mt-4'>
                        <p className='text-6xl font-bold text-[#2ba16a]'> FNATIC </p>
                    </div>
                    <div className='bg-white rounded-xl text-gray-700 mt-8'>
                        <div className='p-5 flex flex-col'>
                            <div className='flex'>
                                <p className='font-bold'> Get your favourite food discovered <br /> right now! </p>
                                <Sparkle
                                    height={60}
                                    width={60}
                                    className='ml-[19.5rem] text-4xl border-8 border-[#42B37C] -mt-6 rounded-full p-1 absolute'
                                />
                            </div>
                            <p className='text-xs mt-3'> Be among the first individuals  to discover  their <br />favourite food and cherish <br /> their taste buds </p>
                        </div>
                    </div>
                    <div className='flex justify-end -mt-10 mr-6'>
                        <Image
                            src='/personal/p1.jpg'
                            height={0}
                            width={20}
                            alt='profileimg'
                            className="rounded-full border-2 border-white"
                        />
                        <Image
                            src='/personal/p2.jpg'
                            height={0}
                            width={20}
                            alt='profileimg'
                            className="rounded-full border-2 border-white -ml-2"
                        />
                        <Image
                            src='/personal/p3.jpg'
                            height={0}
                            width={20}
                            alt='profileimg'
                            className="rounded-full border-2 border-white -ml-2"
                        />
                        <Image
                            src='/personal/p1.jpg'
                            height={0}
                            width={20}
                            alt='profileimg'
                            className="rounded-full border-2 border-white -ml-2"
                        />
                    </div>
                </div>
            </div>
            <h1>Login</h1>
        </div>
    );
}
