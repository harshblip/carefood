"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DefaultLayout from '../layout/default'
import Image from 'next/image'
import { Raleway } from 'next/font/google';
import styles from '../src/app/Landingpage.module.css'
import { Map, Keyboard } from 'lucide-react';
import text from '../dumbdata.json'
import { storeCity, storeCoord } from '../slices/locationSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const railway = Raleway({
    weight: ['200', '500', '800'],
    subsets: ['latin']
})

export default function Landingpage() {

    const [click, setClick] = useState(false);
    const [transition, setTransition] = useState('');
    const [data, setData] = useState([]);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [written, setWritten] = useState('')
    const [val, setVal] = useState('')

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
        if (value !== '') {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_MAPBOX_URL}/suggest?q=${value}&language=en&session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_SECRET}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
            if (response.status === 200) {
                const cities = response.data.suggestions
                setData(cities);
                // console.log(data)
            } else {
                console.log("error aagya")
            }
        }
    }

    async function handleSelect(x, y) {
        setVal(x.name)
        dispatch(storeCity({ city: x.name }))
        const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/retrieve/${y}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_SECRET}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
        if (response.status === 200) {
            const data = response.data.features;
            data.map(x => {
                setX(x.geometry.coordinates[0]);
                dispatch(storeCoord(
                    { x: x.geometry.coordinates[0], y: x.geometry.coordinates[1] }
                ))
                setY(x.geometry.coordinates[1]);
                // console.log(x.geometry.coordinates[0], x.geometry.coordinates[1])
            })
            // console.log("data", response.data)
        }
    }
    console.log(val)

    function handleSurf() {
        if (val !== '') {
            router.push('/resturants')
        }
    }

    return (
        <div>
            <div className={`${railway.className} bg h-[100vh] w-[100vw] flex flex-col`}>
                <DefaultLayout />
                <div className='mr-6 ml-6'>

                    <div className={`flex justify-center mt-8 text-5xl text-center`}>
                        <h1 className={styles.h1}> Locally Produced <br /> Delivered Direct to <br /> Your Door </h1>
                    </div>
                    <div className='flex justify-center mt-2 text-gray-600 text-center text-sm'>
                        <p> Browse your favourite food or restaurant near you. add to cart. don't pay for <br /> any of those items.
                            get it all saved in your account. all of this being <br /> powered by mongodb, redux and next
                        </p>
                    </div>
                    <div className='flex justify-center ml-[3rem]'>
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

                                <div className='flex flex-col'>
                                    <input
                                        placeholder='search any place (only india pls)'
                                        className='w-[18rem] rounded-md p-3 mt-6 text-sm focus:outline-none'
                                        onClick={() => clicked()}
                                        onBlur={() => clicked()}
                                        onChange={(e) => handleSearch(e)}
                                        contentEditable={val}
                                    />
                                    {
                                        data.length > 0 && written !== '' && val === '' ? data.map(
                                            (x, i) => <div className="-ml-6 mt-1" key={i}>
                                                {
                                                    x.feature_type === 'place' || x.feature_type === 'locality' ?
                                                        <>
                                                            <button
                                                                className=""
                                                                onClick={() => handleSelect(x, x.mapbox_id)}
                                                            >
                                                                {x.name}, {x.place_formatted}
                                                            </button>
                                                        </>
                                                        : <></>
                                                }
                                            </div>
                                        ) : ""
                                    }
                                </div>
                                <div>
                                    <button
                                        className='p-2 bg-transparent hover:bg-[#e3f3d6] transition-all mt-8 ml-0 w-12 sm:w-16 rounded-md'
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
            <div className='flex justify-around'>
                <div>
                    <div className={`${railway.className} p-12`}>
                        <p className='text-5xl'> Who we are and <br /> What we do </p>
                    </div>
                    <div>
                        {text.map(x => <p> {x.title} </p>)}
                    </div>
                </div>
                <div className='p-12 text-4xl mt-24'>
                    dyanmic content on click
                </div>
            </div>
        </div>
    )
}
