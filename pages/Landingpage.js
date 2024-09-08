"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DefaultLayout from '../layout/default'
import Image from 'next/image'
import { Raleway, Kanit, Lexend } from 'next/font/google';
import styles from '../src/app/Landingpage.module.css'
import { Map, Keyboard, ArrowUpRight } from 'lucide-react';
import text from '../dumbdata.json'
import { storeCity, storeCoord } from '../slices/locationSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'

const railway = Raleway({
    weight: ['200', '500', '800'],
    subsets: ['latin']
})

const kanit = Kanit({
    weight: ['200', '300'],
    subsets: ['latin']
})

const lexend = Lexend({
    weight: ['200', '300'],
    subsets: ['latin']
})

export default function Landingpage() {

    const [click, setClick] = useState(false);
    const [click2, setClick2] = useState(false);
    const [click3, setClick3] = useState([0, 0, 0]);
    const [warning, setWarning] = useState(true);
    const [select, setSelect] = useState(false);
    const [transition, setTransition] = useState('');
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [written, setWritten] = useState('')
    const [val, setVal] = useState('')
    const [country, setCountry] = useState('')

    const dispatch = useDispatch();
    const router = useRouter();

    function clicked() {
        setClick(prevState => !prevState);
    }

    useEffect(() => {
        if (click) {
            setTransition('slide-out-up');
            setTimeout(() => {
                setTransition('slide-in-up');
            }, 80);
        } else {
            setTransition('slide-out-up');
            setTimeout(() => {
                setTransition('slide-in-up');
            }, 80);
        }
    }, [click]);

    console.log(val)

    async function handleSearch(e) {
        const { value } = e.target;
        if (value === '') {
            setVal('');
        }
        setWritten(value)
        setVal(value)
        if (value !== '') {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_MAPBOX_URL}/suggest?q=${value}&language=en&session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_SECRET}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
            if (response.status === 200) {
                const cities = response.data.suggestions
                setData(cities);
                console.log(data)
            } else {
                console.log("error aagya")
            }
        }
    }

    async function handleSelect(x, y) {
        setVal(x.name)
        setCountry(x.place_formatted)
        setSelect(true)
        dispatch(storeCity({ city: x.name }))
        const response = await axios.get(`${process.env.NEXT_PUBLIC_MAPBOX_URL}/retrieve/${y}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_SECRET}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
        if (response.status === 200) {
            const data = response.data.features;
            data.map(x => {
                dispatch(storeCoord(
                    { x: x.geometry.coordinates[0], y: x.geometry.coordinates[1] }
                ))
                // console.log(x.geometry.coordinates[0], x.geometry.coordinates[1])
            })
            // console.log("data", response.data)
        }
    }
    console.log(val)

    function handleSurf() {
        if (val !== '') {
            const r = country.substring(country.length - 5, country.length)
            if (r !== 'India') {
                setClick2(true)
            } else {
                localStorage.removeItem('restus')
                router.push('/resturants')
            }
        } else {
            setWarning(false);
        }
    }

    function clickfun(i) {
        const newclick = [...click3];
        newclick[i] === 0 ? newclick[i] = 1 : newclick[i] = 0;
        newclick.forEach((x, y) => {
            if (y !== i) {
                newclick[y] = 0
            }
        })
        setClick3(newclick);
        console.log(newclick)
    }


    return (
        <div className='lmlemlem'>
            <div className={`${railway.className} bg h-[100vh] w-[130vw] sm:w-[100vw] flex flex-col`}>
                <DefaultLayout />
                <div className='mr-6 ml-6'>

                    <div className={`flex justify-center mt-8 text-5xl text-center`}>
                        <p className={styles.h1}> Locally Produced <br /> Delivered Direct to <br /> Your Door </p>
                    </div>
                    <div className='hidden sm:visible sm:flex justify-center mt-2 text-gray-600 text-center text-sm'>
                        <p> Browse your favourite food or restaurant near you. add to cart. don&apos;t pay for <br /> any of those items.
                            get it all saved in your account. all of this being <br /> powered by mongodb, redux and next
                        </p>
                    </div>
                    <div className='sm:hidden visible flex justify-center mt-8 text-gray-600 text-center text-sm'>
                        <p className='leading-6'> Browse your favourite food or restaurant near you. add to <br /> cart. don't pay  any of those items.
                            get it all saved in <br /> your account. all of this being powered by <br />mongodb, redux and next
                        </p>
                    </div>
                    <div className='flex justify-center sm:ml-[2rem] sm:mt-0 mt-8 -ml-4'>
                        <div className='flex'>
                            <div className='bg-white h-11 w-10 mt-6 -ml-8 absolute rounded-md'>

                            </div>
                            {
                                click ? <Keyboard
                                    className={`mt-9 h-5 -ml-5 absolute ${transition}`}
                                /> : <Map
                                    className={`mt-9 h-5 -ml-5 absolute ${transition}`}
                                />
                            }
                            <div className='flex'>

                                <div className='flex flex-col w-[16rem]'>
                                    <input
                                        placeholder={warning ? `search any place (only india pls)` : `HEY! Put some value FIRST!`}
                                        className=' rounded-md p-3 mt-6 text-sm focus:outline-none transition-all'
                                        onClick={() => clicked()}
                                        onBlur={() => clicked()}
                                        onChange={(e) => handleSearch(e)}
                                        value={!click2 ? val : 'no city out of india pls'}
                                    />
                                    <div className='flex flex-col transition-all ease-in'>

                                        {
                                            data.length > 0 && written !== '' && !select ? data.map(
                                                (x, i) => <div className="transition-all ease-in flex flex-col mt-4" key={i}>
                                                    {

                                                        x.feature_type === 'place' || x.feature_type === 'locality' ?
                                                            <div>
                                                                <button
                                                                    className="text-start text-sm rounded-md transition-all ease-in"
                                                                    onClick={() => handleSelect(x, x.mapbox_id)}
                                                                >
                                                                    {x.name}, {x.place_formatted}
                                                                </button>
                                                            </div>
                                                            : <></>
                                                    }
                                                </div>
                                            ) : ""
                                        }
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className='p-2 bg-transparent hover:bg-[#e3f3d6] transition-all mt-8 ml-2 sm:ml-0 w-12 sm:w-16 rounded-md absolute'
                                        onClick={() => handleSurf()}
                                    >
                                        Go
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${kanit.className} font-bold sm:flex sm:flex-row flex flex-col`}>
                <div className='bg-[#cefdcc] w-[130vw] sm:w-1/2'>
                    <div className='ml-8 sm:ml-24'>
                        <div className={`p-12 sm:p-12 flex flex-col`}>
                            <p className='text-5xl text-[#063519]'> Who we are and <br /> What we do </p>
                            <p className='text-sm text-gray-600 mt-4'> It also supplies nutrients that help maintain the brain, muscles, bones, nerves, skin, blood circulation, and immune system. </p>
                        </div>
                        <div>
                            <div className='p-8 sm:p-12 -mt-12 sm:mb-0 mb-12'>
                                <div>
                                    {text.map((x, i) => i <= 2 ? <div
                                        className={`flex flex-col p-4 ${click3[i] === 1 ? `bg-[#cefdcc] text-[#2d5c3c]` : `bg-[#80c17e8f] text-white`}   rounded-md hover:bg-[#cefdcc] hover:text-[#2d5c3c] transition-all hover:cursor-pointer mt-6 justify-center`}
                                        onClick={() => (setIndex(x.id), clickfun(i))}
                                        key={i}
                                    >
                                        <div className='flex'>
                                            <div>
                                                <Image
                                                    src={x.dp}
                                                    height={20}
                                                    width={40}
                                                    alt={'an image just so wow'}
                                                    className='rounded-md'
                                                />
                                            </div>
                                            <div className='mt-2 ml-4'>
                                                <p> {x.title} </p>
                                                <p className='font-medium text-sm'> {x.smalltitls} </p>
                                            </div>
                                        </div>
                                    </div> : '')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.bg} w-[130vw] sm:p-0 sm:w-1/2`}>
                    <div className={`${styles.imageclass} p-6 mt-4 sm:p-12 text-4xl sm:-mt-2 sm:ml-20`}>
                        <Image
                            src={text[index].image}
                            height={600}
                            width={620}
                            alt={'an image just so wow'}
                            className={`rounded-md`}
                        />
                    </div>
                </div>
            </div>
            <div className='w-[130vw] sm:w-[100vw]'>
                <div className='mt-20 ml-10 sm:ml-0 sm:mt-0 flex flex-col sm:flex sm:flex-row'>
                    <div className='sm:mr-0 mr-8 sm:p-10'>
                        <div className='sm:p-6'>
                            <Image
                                src='/plants/forest.png'
                                height={0}
                                width={650}
                                className='rounded-xl'
                                alt='forestimage'
                            />
                        </div>
                    </div>
                    <div className='mt-8 sm:ml-0 ml-6'>
                        {
                            text.map((x, i) => i >= 3 ? <div className='flex flex-col' key={i}>
                                <div className='bg-[#f5f5f5] hover:bg-[#729071] mt-4 w-[26rem] sm:w-[24rem] rounded-md transition-all'>
                                    <div className={` hover:text-white flex flex-col p-4  ${lexend.className} hover:cursor-pointer mr-12 ]`}>
                                        <p className='font-normal leading-5 text-sm'> &quot;{x.description}&quot; </p>
                                        <div className='flex space-x-10 mt-6'>
                                            <div>
                                                <Image
                                                    src={x.dp}
                                                    height={0}
                                                    width={30}
                                                    className='absolute rounded-xl mr-12'
                                                    alt='dp'
                                                />
                                            </div>
                                            <div className='flex flex-col -mt-1 mb-4'>
                                                <p className='font-medium text-sm'> {x.name} </p>
                                                <p className='font-thin text-xs'> {x.position} </p>
                                            </div>
                                            <div className='absolute'>
                                                <ArrowUpRight
                                                    className='ml-[19.5rem] sm:ml-[17.6rem] mt-3 w-14 h-14 rounded-full p-3 border-[0.6rem] border-white'
                                                />
                                            </div>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div> : '')
                        }
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
