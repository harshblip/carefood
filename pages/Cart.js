import { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from '../src/app/cart.module.css'
import { Comfortaa, Kanit, Manrope, Anton } from "next/font/google";
import { useSelector } from "react-redux";
import axios from "axios";
import { BadgeIndianRupee, CircleMinus, Minus, OctagonX, Pin, Plus, PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { storeRestId, storeOrder } from "../slices/restaurantSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

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
    weight: ['400', '600'],
    subsets: ['latin']
})

const anton = Anton({
    weight: ['400'],
    subsets: ['latin']
})

export default function Cart() {
    const dispatch = useDispatch();
    const router = useRouter()

    const userEmail = useSelector(state => state.signup.email)
    const accessToken = useSelector(state => state.signup.accessToken)

    console.log(userEmail)
    const [data, setData] = useState([])
    const [click, setClick] = useState([]);

    useEffect(() => {
        if (userEmail) {
            (
                async () => {
                    try {
                        const response = await axios.get('/api/addToCart', {
                            params: {
                                userEmail: userEmail
                            },
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        })
                        if (response.status === 200) {
                            setData(response.data);
                            console.log("data aagya", response.status)
                        } else {
                            console.log("error response code brdr")
                        }
                    } catch (err) {
                        console.log("errrr", err)
                    }
                }
            )()
        }
    }, [data])

    console.log(data);

    // data.orders ?  : ''

    async function deleteOrdur(id, id2, thing, price, quant) {
        console.log(quant, price)
        try {
            const response = await axios.delete('/api/addToCart', {
                params: { id, id2, thing, price, quant },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (response.status === 200) {
                console.log("request successfully called");
            } else {
                console.log("error aagyis", response.status)
            }
        } catch (err) {
            console.log("errrr", err)
        }
    }

    var foodd = "";
    async function adjustItem(j, data, x, food, q, i, thing, price) {
        const f = data.orders[i].items
        setClick(Array(data.length).fill(0));
        const r = [...f];
        if (click === 0 || foodd != food) {
            if (x === 'minus') {
                const newClick = [...click];
                newClick[j] = q - 1;
                setClick(newClick);
            } else {
                const newClick = [...click];
                newClick[j] = q + 1;
                setClick(newClick);
            }
        } else {
            if (x === 'minus') {
                const newClick = [...click];
                newClick[j] = Math.max(0, newClick[j] - 1);
                setClick(newClick);
            } else {
                const newClick = [...click];
                newClick[j] = newClick[j] + 1;
                setClick(newClick);
            }
        }
        r.forEach(y => y.name === food ? x === 'add' ? y.quantity = y.quantity + 1 : y.quantity = Math.max(0, y.quantity - 1) : '')
        // setData(duta);
        foodd = food;
        const id = data.orders[i].id
        const id2 = data.orders[i].items[j].id
        const newQ = x === 'add' ? click[j] + 1 || q + 1 : Math.max(0, click[j] - 1) || q - 1
        console.log(newQ)
        if (newQ === 0) {
            try {
                const response = await axios.delete('/api/addToCart', {
                    params: { id, id2, thing, price },
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                if (response.status === 200) {
                    console.log("request successfully called");
                } else {
                    console.log("error aagyis", response.status)
                }
            } catch (err) {
                console.log("errrr", err)
            }
            try {
                const response = await axios.put('/api/addToCart', {
                    id, price, x
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                if (response.status === 200) {
                    console.log("request successfully called");
                } else {
                    console.log("error aagyis", response.status)
                }
            } catch (err) {
                console.log("errrr", err)
            }
        } else {
            try {
                const response = await axios.put('/api/addToCart', {
                    id, id2, newQ, price, x
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                if (response.status === 200) {
                    console.log("updated quantity in the backend")
                } else {
                    console.log("xD", response.status)
                }
            } catch (err) {
                console.log("catch block", err)
            }
        }
    }

    function gotoRestu(x) {
        console.log("x", x)
        localStorage.removeItem('menu')
        dispatch(storeRestId({
            id: x
        }))
        router.push('/Menu')
    }

    const [lmao, setLmao] = useState([])

    useEffect(() => {
        if (data && data.orders) {
            setLmao(Array(data.orders.length).fill(false));
        }
    }, [])

    function checkout(i) {
        lmao[i] = true;
        dispatch(storeOrder({
            id: data.orders ? data.orders[i].id : 0,
            amm: data.orders ? data.orders[i].totalAmt : 0,
            name: data.orders ? data.orders[i].restaurantName : '',
            orders: data.orders ? data.orders[i].items : ''
        }))
        dispatch(storeRestId({
            address: data.orders ? data.orders[i].address : ''
        }))

        console.log(data.orders[i].totalAmt)

        router.push('/Checkout')
    }

    console.log(data.orders?.length);

    return (
        <div className="w-[130vw] h-full sm:w-full bg-[#b4c6b6]">
            <Head>
                <title> Your cart </title>
            </Head>
            <div className="flex flex-col ml-4 sm:ml-24 z-10">
                <Header />
                <div className="flex fixed -ml-4 sm:-ml-24 z-0 my-[20rem] sm:my-[14rem] focus:blur select-none">
                    <p className={`${anton.className} text-7xl sm:text-[12rem] text-[#d3d9d5] `}> CART</p>
                </div>
                <div className={`${styles.bg} ${comfortaa.className} text-white ml-8 sm:ml-0 font-bold text-4xl h-32 sm:mr-32 mr-12 z-10`}>
                    <p className={`sm:p-8 p-5`}> Your cart bro </p>
                </div>
                <div className="flex align-middle mt-10 z-10">
                    <hr className="border border-white w-1/2 ml-2 rounded-sm" />
                    <p className={`tracking-widest text-sm ${kanit.className} -mt-2 ml-2 mr-2 text-white font-light`}> CART </p>
                    <hr className="border border-white w-1/2 mr-10 sm:mr-32 rounded-sm" />
                </div>
                {
                    data.orders && data.orders.length > 0 ? <div className="flex sm:flex-row flex-col z-10">
                        <div className="border-gray-400 rounded-md mt-6 sm:ml-0 ml-2">
                            <div className="p-4 flex flex-col space-y-4 bg-[#efefef] rounded-md w-[15rem] float-start hover:cursor-pointer">
                                <p className={`${manrop.className} font-semibold text-gray-600 text-sm`}> restaurants </p>
                                {
                                    data.orders ? data.orders.map((x, i) => <div className="bg-white rounded-md mt-4 flex flex-col" key={i}>
                                        <div className={`${manrop.className} p-2 text-gray-600 font-semibold flex justify-between `}>
                                            <div>
                                                <p className="text-xs mt-1"> {x.restaurantName} </p>
                                            </div>

                                            <div
                                                className=" bg-red-400 rounded-full h-6 w-6 flex justify-center hover:cursor-pointer mt-1"
                                                onClick={() => deleteOrdur(x.id, x.id, 'cart')}
                                            >
                                                <CircleMinus
                                                    className="text-white w-3"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={`mt-1 mr-4 mb-2 ml-2 rounded-md text-sm bg-[#cdb4db] text-white ${manrop.className} flex justify-center`}
                                            onClick={() => checkout(i)}
                                        >
                                            <p className="p-2 text-xs"> {lmao[i] ? 'lessgoooo' : 'buy this ?'} </p>
                                        </div>
                                    </div>) : ''
                                }
                            </div>
                        </div>
                        <div className={`${manrop.className} -ml-6 w-full flex flex-col mt-6 font-normal mb-32 space-y-4`}>
                            {
                                data.orders ? data.orders.map((x, i) => <div key={i}>
                                    <div className=" rounded-md w-[28rem] ml-8 sm:ml-[10rem] sm:w-1/2 bg-[#f8f9fa]">
                                        <div className="p-8 text-sm">
                                            {
                                                data.orders[i].items.map((y, j) => <div className="w-full bg-white rounded-md flex justify-between p-4" key={i}>
                                                    <div className="text-gray-600">
                                                        {y.name}
                                                    </div>
                                                    <div className="flex space-x-4">
                                                        <div className="flex space-x-2 border border-gray-300 rounded-md text-green-500 font-bold h-6">
                                                            <Minus
                                                                className="w-6  hover:bg-green-300 hover:text-white hover:cursor-pointer text-lg transition-all p-[0.4rem] rounded-md hover:border hover:border-white"
                                                                onClick={() => adjustItem(j, data, 'minus', y.name, y.quantity, i, 'item', Math.round(y.price))}
                                                            />
                                                            {
                                                                !click[j] ? <p> {y.quantity} </p> : <p> {click[j]}  </p>
                                                            }
                                                            <Plus
                                                                className="w-6 hover:bg-green-300 hover:text-white transition-all p-[0.4rem] hover:cursor-pointer rounded-md
                                                        hover:border hover:border-white"
                                                                onClick={() => adjustItem(j, data, 'add', y.name, y.quantity, i, 'item', Math.round(y.price))}
                                                            />
                                                        </div>
                                                        <div className="h-4 border-r-2  mt-[5px] ml-2">
                                                        </div>
                                                        <OctagonX
                                                            className="w-5 text-red-400 hover:cursor-pointer"
                                                            onClick={() => deleteOrdur(x.id, y.id, 'item', Math.round(y.price), y.quantity)}
                                                        />
                                                        <div className="h-4 border-r-2  mt-[5px] ml-2">
                                                        </div>
                                                        <p> {Math.round(y.price)} </p>
                                                    </div>
                                                </div>
                                                )
                                            }
                                            <div className="mt-4">
                                                <hr
                                                    className="w-full border-dashed border-2"
                                                />
                                                <div className="flex space-x-2 ml-1 p-1 mt-2 hover:cursor-pointer"
                                                    onClick={() => gotoRestu(x.restId)}
                                                >
                                                    <PlusCircle
                                                        className="w-4 text-gray-400"
                                                    />
                                                    <p className="text-gray-400 text-sm mt-[2px]"> Add more items </p>
                                                </div>
                                            </div>
                                            <hr
                                                className="w-full border-dashed border-2 mt-2"
                                            />
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
                                </div>) : ''
                            }
                        </div>
                    </div> : <>
                        <div className="z-10 -ml-20 sm:ml-32 mt-8 mb-16 flex sm:flex-row flex-col sm:space-x-4 space-y-4 items-center">
                            <Image
                                src='/personal/shiba.png'
                                height={0}
                                width={250}
                                alt='nothing in the cart'
                            />
                            <p className={`${anton.className} text-2xl sm:text-4xl font-semibold text-[#f1faee]`}> <Link href='/Menu' className="text-emerald-500 underline"> Go</Link> to menu page to add some items </p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}