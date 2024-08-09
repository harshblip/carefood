import Image from "next/image";
import { useSelector } from "react-redux"
import { Comfortaa, Kanit } from 'next/font/google';
import styles from '../src/app/resturants.module.css'
import AuthBtn from "../components/AuthBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ComboboxDemo } from "../components/combubox";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { storeRestId } from "../slices/locationSlice";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200']
})

const comfortaa = Comfortaa({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300']
});

export default function resturants() {

    const dispatch = useDispatch();
    const router = useRouter();

    const city = useSelector(state => state.location.city)
    const userName = useSelector(state => state.signup.name)
    const x = useSelector(state => state.location.x);
    const y = useSelector(state => state.location.y);
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [veg, setVeg] = useState(false);
    const [nonveg, setNonveg] = useState(false);
    const [rating, setRating] = useState(true);
    const [open, setOpen] = useState(true);
    console.log(x, y)
    // data2 final
    // data3 for experiment
    // data for real fetched data

    useEffect(() => {
        const restus = JSON.parse(localStorage.getItem('restus'));
        const citi = localStorage.getItem('city');
        ((restus === null && x > 0 && y > 0) || citi !== city ? async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SWIGGY_API}?lat=${y}&lng=${x}&page_type=DESKTOP_WEB_LISTING`);

            console.log("api called")

            if (response.status === 200) {
                setData(response.data);
                localStorage.setItem('restus', JSON.stringify(response.data));
                localStorage.setItem('city', city);
            }
        } : () => {
            // console.log(citi, city);
            setData(restus)
            setData2(restus);
            setData3(restus);
        })()
    }, [])

    useEffect(() => {
        if (data && data.data && data.data.cards) {
            const arr = data.data.cards;
            if (arr.length > 0) {
                arr.forEach((x, i) => {
                    if (i === 1 && x.card.card.gridElements) {
                        const restaurants = x.card.card.gridElements.infoWithStyle.restaurants;
                        setData(restaurants);
                        setData2(restaurants);
                        setData3(restaurants);
                    }
                });
            }
        }
    }, [data]);


    function check(x) {
        if (x === 'veg') {
            setVeg(prevState => !prevState);
            if (veg === false) {
                if (nonveg === true) {
                    setNonveg(prevState => !prevState);
                    const new2 = data3.filter(x => x.info.veg === true)
                    console.log("here ??")
                    setData2(new2);
                    setData3(data);
                } else {
                    if (data.length > 0 && data2.length > 0 && data3.length > 0) {
                        setData3(data2);
                        const new2 = data2.filter(x => x.info.veg === true)
                        setData2(new2);
                    }
                }
            } else {
                setData2(data3);
            }
        } else {
            setNonveg(prevState => !prevState);
            console.log(veg, nonveg)
            if (nonveg === false) {
                if (veg === true) {
                    console.log(data2)
                    console.log("came almost")
                    setVeg(prevState => !prevState);
                    const new2 = data3.filter(x => x.info.veg !== true)
                    setData2(new2);
                    setData3(data);
                } else {
                    if (data.length > 0 && data2.length > 0 && data3.length > 0) {
                        setData3(data2);
                        const new2 = data2.filter(x => x.info.veg !== true)
                        setData2(new2);
                    }
                }
            } else {
                setData2(data3);
            }
        }
    }

    function handleOpen() {
        setOpen(prevState => !prevState);
        if (open) {
            if (data.length > 0 && data2.length > 0 && data3.length > 0) {
                setData3(data2);
                const new2 = data2.filter(x => x.info.isOpen === true)
                setData2(new2);
            }
        } else {
            setData2(data3);
        }
    }

    function handleRating() {
        setRating(prevState => !prevState);
        console.log(rating)
        if (rating) {
            if (data.length > 0 && data2.length > 0 && data3.length > 0) {
                setData3(data2);
                const new2 = data2.filter(x => x.info.avgRating >= 4.0)
                setData2(new2);
            }
        } else {
            setData2(data3);
        }
    }

    function navi(x) {
        dispatch(storeRestId({
            id: x
        }))
        router.push('/menu')
    }

    // console.log(data2.length > 0 ? data2.filter(x => x.info.isOpen === true) : '')

    return (
        <header className={comfortaa.className}>
            <figure className="flex flex-col ml-24">
                <div className="flex justify-between p-8 ml mr-24 ">
                    <div className={styles.logo}>
                        <a href={`/`} className="text-xl">
                            <span className="tracking-normal text-[#2d5c3c] text-2xl">
                                carefood
                            </span>
                        </a>
                    </div>

                    <div className={`${styles.logo} hidden md:flex space-x-4 md:mr-0`}>
                        <AuthBtn />
                        {
                            userName ? <></> : <button className={`${styles.logo} bg-[#216f3f] p-2 rounded-md text-white h-9 w-20  text-xs`}>Signup</button>
                        }
                    </div>
                </div>
                <div className={`ml-8 mr-32 ${styles.bg}`}>
                    <div className={` w-full p-2 h-32 rounded-md ${styles.bg}`}>
                        <div className="p-4">
                            <p className="text-white font-extrabold text-4xl"> Hey {city} </p>
                        </div>
                    </div>
                </div>
                <div className={`flex space-x-4 mt-8 ml-8 ${kanit.className}`}>
                    <div>
                        <ComboboxDemo />
                    </div>
                    <button
                        className={`border border-gray-300 p-3 rounded-full h-10 w-16 text-xs hover:bg-green-300 ${rating ? `bg-white` : `bg-green-300 text-white font-semibold border-none`} transition-all hover:text-white hover:border-none -mt-2`}
                        onClick={() => handleRating()}
                    > 4.0+ </button>
                    <button
                        className={`border border-gray-300 p-3 rounded-full h-10 w-16 text-xs hover:bg-green-300 ${open ? `bg-white` : `bg-green-300 text-white font-semibold border-none`} transition-all hover:text-white hover:border-none -mt-2`}
                        onClick={() => handleOpen()}
                    > open </button>
                    <div className={`flex space-x-2`}>
                        <Switch
                            id="veg"
                            onClick={() => check('veg')}
                            checked={veg}
                        />
                        <Label htmlFor="airplane-mode" className={`mt-1 ${kanit.className}`}>Veg</Label>
                    </div>
                    <div className="flex space-x-2">
                        <Switch
                            id="non-veg"
                            onClick={() => check('nonveg')}
                            checked={nonveg}
                        />
                        <Label htmlFor="airplane-mode" className={`mt-1 ${kanit.className}`}>Non-veg</Label>
                    </div>
                </div>
                <div className="flex align-middle mt-10">
                    <hr className="border border-gray-400 w-1/2 ml-8" />
                    <p className={`tracking-widest text-xs ${kanit.className} -mt-2 ml-2 mr-2`}> RESTAURANTS </p>
                    <hr className="border border-gray-400 w-1/2 mr-32" />
                </div>
                <div className={styles.grid}>
                    {
                        data2.length > 0 ? data2.map(x => <div>
                            <div
                                className={`p-2 border w-1/2 ml-24 ${kanit.className} hover:cursor-pointer`}
                                onClick={() => navi(x.info.id)}
                            >
                                <div className="flex justify-around">
                                    <p className="text-sm"> {x.info.name} </p>
                                    <p className="text-sm"> {x.info.id} </p>
                                    <p> {x.info.veg ? <p className="text-green-400 font-bold"> green </p> : <p className="text-red-400 font-bold"> red </p>} </p>
                                </div>
                            </div>
                        </div>) : <div className="flex flex-col justify-center ml-[2rem]">
                            <p className={`mt-4 ${kanit.className}`}> refresh page restaurant </p>
                        </div>
                    }
                </div>
            </figure>
        </header>
    )
}