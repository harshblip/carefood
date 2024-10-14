import Header from "../components/Header";
import { Anton, Comfortaa, Kanit, Manrope } from "next/font/google";
import styles from '../src/app/myorders.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BadgeIndianRupee, Pin } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

const anton = Anton({
    weight: ['400'],
    subsets: ['latin']
})

const comfortaa = Comfortaa({
    subsets: ['latin'],
    display: 'swap',
    weight: ['700']
});

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['300', '500', '600']
})

const manrop = Manrope({
    weight: ['500', '600'],
    subsets: ['latin']
})

export default function Myorders() {
    const [data, setData] = useState([])
    const userEmail = useSelector(state => state.signup.email)
    const accessToken = useSelector(state => state.signup.accessToken)
    const router = useRouter();
    console.log(userEmail)
    useEffect(() => {
        if (!userEmail) {
            router.push('/Landingpage')
        }
        else {
            (
                async () => {
                    try {
                        const response = await axios.get('/api/paymentUpdate', {
                            params: {
                                userEmail: userEmail
                            },
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        })
                        if (response.status === 200) {
                            setData(response.data);
                            console.log(response.data)
                            console.log("data aagya", response.data)
                        } else {
                            console.log("error in response myorders.js", response.data)
                        }
                    } catch (err) {
                        console.log("error in myorders api", err)
                    }
                }
            )()
        }
    }, [])

    return (
        <div className="w-[130vw] h-full sm:w-full bg-[#b4c6b6]">
            <Head>
                <title> My Orders </title>
            </Head>
            <div className="flex flex-col ml-4 sm:ml-24 z-10">
                <Header />
                <div className="flex fixed -ml-4 sm:-ml-24 z-0 my-[20rem] sm:my-[14rem] focus:blur select-none">
                    <p className={`${anton.className} text-7xl sm:text-[12rem] text-[#d3d9d5] `}> ORDERS </p>
                </div>
                <div className={`${styles.bg} ${comfortaa.className} text-white ml-8 sm:ml-0 font-bold text-4xl h-32 sm:mr-32 mr-12 z-10`}>
                    <p className={`sm:p-8 p-5`}> Your cart bro </p>
                </div>
                <div className="flex align-middle mt-10 z-10">
                    <hr className="border border-white w-1/2 ml-2 rounded-sm" />
                    <p className={`tracking-widest text-sm ${kanit.className} -mt-2 ml-2 mr-2 text-white font-light`}> MY/ORDERS </p>
                    <hr className="border border-white w-1/2 mr-10 sm:mr-32 rounded-sm" />
                </div>
                <div className="z-10 -ml-4 mr-8 sm:mr-0 sm:ml-24 mt-6 mb-8 flex flex-col space-y-8">
                    {
                        data.orders ? data.orders.map((x, i) => <div key={i}>
                            <div className={` ${manrop.className} font-medium rounded-md w-[28rem] ml-8 sm:ml-[10rem] sm:w-1/2 bg-[#f8f9fa] ${styles.cardbg} `}>
                                <div className="bg-white/60">
                                    <div className="p-8 text-sm">
                                        {
                                            data.orders[i].items.map((y, j) => <div className="w-full bg-white/30 rounded-md flex justify-between p-4" key={j}>
                                                <div className="text-gray-600">
                                                    {y.name}
                                                </div>
                                                <div className="flex space-x-4 items-center">
                                                    <p className="text-gray-600 font-semibold"> {y.quantity}x </p>
                                                    <div className="h-4 border-r-2 mt-[2px] ml-2">
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <BadgeIndianRupee className="w-4 text-green-400" />
                                                        <p className="font-semibold font-base text-green-400"> {Math.round(y.price)} </p>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        }
                                        <div className="flex flex-col">
                                            <div className="flex justify-between text-[#8ac4a7] font-semibold mt-4">
                                                <div className="flex flex-col justify-between w-full">
                                                    <div>
                                                        <div className="flex space-y-2 justify-between w-full">
                                                            <div className="flex mt-2">
                                                                <BadgeIndianRupee className="w-5 text-green-400" />
                                                                <p className="text-2xl -mt-1 ml-2"> {x.totalAmt} </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-right text-2xl -mt-2"> {x.restaurantName} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2 justify-between">
                                                        <p className="text-[#8ac4a7] font-semibold opacity-40 text-start"> {x.orderTime} </p>
                                                        <div className="flex">
                                                            <p className="text-[0.7rem] mt-0"> {x.address} </p>
                                                            <Pin className="w-4 text-emerald-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) : <>
                            <div className="z-10 -ml-20 sm:ml-32 mt-2 mb-16 flex sm:flex-row flex-col sm:space-x-4 space-y-4 items-center">
                                <Image
                                    src='/personal/shiba.png'
                                    height={0}
                                    width={250}
                                    alt='nothing in the cart'
                                />
                                <p className={`${anton.className} text-2xl sm:text-4xl font-semibold text-[#f1faee]`}> You got <span className="text-red-400"> zero</span> active orders </p>   
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}