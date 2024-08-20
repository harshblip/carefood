import { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from '../src/app/cart.module.css'
import { Comfortaa, Kanit, Manrope } from "next/font/google";
import { useSelector } from "react-redux";
import axios from "axios";
import { BadgeIndianRupee, Minus, OctagonX, Pin, Plus, PlusCircle } from "lucide-react";

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

export default function Cart() {

    const userEmail = useSelector(state => state.signup.email)
    const [data, setData] = useState([])
    const [click, setClick] = useState([]);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.get('/api/addToCart', {
                        userEmail: userEmail
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
    }, [])

    console.log(data);

    async function deleteOrdur(id, id2, thing) {
        try {
            const response = await axios.delete('/api/addToCart', {
                params: { id, id2, thing }
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
    async function adjustItem(j, data, x, food, q, i, thing) {
        const f = data.orders[i].items
        setClick(Array(data.length).fill(0));
        const r = [...f];
        // if(x === 'add'){
        //     r.name === food 
        // }else {
        //     r.quantity = r.quantity - 1;
        // }
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
                newClick[j] = newClick[j] - 1;
                setClick(newClick);
            } else {
                const newClick = [...click];
                newClick[j] = newClick[j] + 1;
                setClick(newClick);
            }
        }
        r.forEach(y => y.name === food ? x === 'add' ? y.quantity = y.quantity + 1 : y.quantity = y.quantity - 1 : '')
        // setData(duta);
        foodd = food;
        const id = data.orders[i].id
        const id2 = data.orders[i].items[j].id
        const newQ = x === 'add' ? click[j] + 1 || q + 1 : click[j] - 1 || q - 1
        console.log(newQ)
        if (newQ === 0) {
            try {
                const response = await axios.delete('/api/addToCart', {
                    params: { id, id2, thing }
                })

                if (response.status === 200) {
                    console.log("request successfully called");
                } else {
                    console.log("error aagyis", response.status)
                }
            } catch (err) {
                console.log("errrr", err)
            }
            data.orders ? data.orders.map((x, i) => data.orders[i].items.filter(y => y.id === id2)) : ''
        } else {

            try {
                const response = await axios.put('/api/addToCart', {
                    id, id2, newQ
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

    console.log(data);

    return (
        <div className="w-[130vw] h-full sm:w-full bg-[#b4c6b6]">
            <div className="flex flex-col sm:ml-24">
                <Header />
                <div className={`${styles.bg} ${comfortaa.className} text-white ml-8 sm:ml-0 font-bold text-4xl h-32 sm:mr-32 mr-12 `}>
                    <p className={`sm:p-8 p-5`}> Your cart bro </p>
                </div>
                <div className="flex align-middle mt-10 z-10">
                    <hr className="border border-white w-1/2 ml-2 rounded-sm" />
                    <p className={`tracking-widest text-sm ${kanit.className} -mt-2 ml-2 mr-2 text-white font-light`}> CART </p>
                    <hr className="border border-white w-1/2 mr-10 sm:mr-32 rounded-sm" />
                </div>
                <div className={`${manrop.className} flex flex-col mt-12 font-normal mb-32 space-y-4`}>
                    {
                        data.orders ? data.orders.map((x, i) => <div key={i}>
                            <div className=" rounded-md w-[28rem] ml-8 sm:ml-[14rem] sm:w-1/2 bg-[#f8f9fa]">
                                <div className="p-8 text-sm">
                                    {
                                        data.orders[i].items.map((y, j) => <div className="w-full bg-white rounded-md flex justify-between p-4">
                                            <div className="text-gray-600">
                                                {y.name}
                                            </div>
                                            <div className="flex space-x-4">
                                                <div className="flex space-x-2 border border-gray-300 rounded-md text-green-500 font-bold">
                                                    <Minus
                                                        className="w-6  hover:bg-green-300 hover:text-white hover:cursor-pointer text-lg transition-all p-[0.4rem] rounded-md hover:border hover:border-white"
                                                        onClick={() => adjustItem(j, data, 'minus', y.name, y.quantity, i, 'item')}
                                                    />
                                                    {
                                                        !click[j] ? <p> {y.quantity} </p> : <p> {click[j]}  </p>
                                                    }
                                                    <Plus
                                                        className="w-6 hover:bg-green-300 hover:text-white transition-all p-[0.4rem] hover:cursor-pointer rounded-md
                                                    hover:border hover:border-white"
                                                        onClick={() => adjustItem(j, data, 'add', y.name, y.quantity, i, 'item')}
                                                    />
                                                </div>
                                                <div className="h-4 border-r-2  mt-[5px] ml-2">
                                                </div>
                                                <OctagonX
                                                    className="w-5 text-red-400 hover:cursor-pointer"
                                                    onClick={() => deleteOrdur(x.id, y.id, 'item')}
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
                                        <div className="flex space-x-2 ml-1 p-1 mt-2">
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
                                        <div className="flex justify-between text-[#8ac4a7] font-semibold text-end mt-4">
                                            <div className="flex space-x-2 text-sm text-start">
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex">
                                                        <BadgeIndianRupee className="w-5 text-green-400" />
                                                        <p className="text-2xl -mt-1 ml-2"> {x.totalAmt} </p>
                                                    </div>
                                                    <p className="text-[#8ac4a7] font-semibold opacity-40 text-start"> {x.orderTime} </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-x-2 justify-end">
                                                <p className="text-4xl"> {x.restaurantName} </p>
                                                <div className="flex">
                                                    <p className="text-[0.7rem] mt-0"> {x.address} </p>
                                                    <Pin className="w-4 text-emerald-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>) : ''
                    }
                </div>
            </div>
        </div>
    )
}