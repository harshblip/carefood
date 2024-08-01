"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import DefaultLayout from '../layout/default'
import Image from 'next/image'
import { Raleway } from 'next/font/google';
import styles from '../src/app/Landingpage.module.css'
import { Map, Keyboard } from 'lucide-react';

const railway = Raleway({
    weight: ['200', '500', '800'],
    subsets: ['latin']
})

export default function Landingpage() {
    
    const [click, setClick] = useState(false);
    const [transition, setTransition] = useState('');
    
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
    return (
        <div className={`${railway.className} bg h-[100vh] w-[100vw] flex flex-col`}>
            <DefaultLayout />
            <div className={`flex justify-center mt-8 text-5xl text-center`}>
                <h1 className={styles.h1}> Locally Produced <br /> Delivered Direct to <br /> Your Door </h1>
            </div>
            <div className='flex justify-center mt-2 text-gray-600 text-center text-sm'>
                <p> Browse your favourite food or restaurant near you. add to cart. don't pay for <br /> any of those items.
                    get it all saved in your account. all of this being <br /> powered by mongodb, redux and next
                </p>
            </div>
            <div className='flex justify-center'>
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
                    <input
                        placeholder='search any place (only india pls)'
                        className='w-[20rem] rounded-md p-3 mt-6 text-sm focus:outline-none'
                        onClick={() => clicked()}
                        onBlur={() => clicked()}
                    />
                    <button className='p-2 bg-transparent hover:bg-[#e3f3d6] transition-all mt-6 ml-4 w-12 rounded-md'>
                        Go
                    </button>
                </div>
            </div>
        </div>
    )
}
