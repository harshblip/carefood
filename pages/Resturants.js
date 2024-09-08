import { useSelector } from "react-redux"
import { Comfortaa, Kanit, Anton } from 'next/font/google';
import styles from '../src/app/resturants.module.css'
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ComboboxDemo } from "../components/combubox";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { storeRestId } from "../slices/restaurantSlice";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['300', '500', '600']
})

const comfortaa = Comfortaa({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300']
});

const anton = Anton({
    weight: ['400'],
    subsets: ['latin']
})

export default function Resturants() {

    const dispatch = useDispatch();
    const router = useRouter();

    const city = useSelector(state => state.location.city)
    const x = useSelector(state => state.location.x);
    const y = useSelector(state => state.location.y);
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [veg, setVeg] = useState(false);
    const [nonveg, setNonveg] = useState(false);
    const [rating, setRating] = useState(true);
    const [open, setOpen] = useState(true);
    const [preference, setPreference] = useState('')
    console.log(x, y)
    // data2 final
    // data3 for experiment
    // data for real fetched data

    useEffect(() => {
        console.log("api called")
        const restus = JSON.parse(localStorage.getItem('restus'));
        const citi = localStorage.getItem('city');
        ((restus === null && x > 0 && y > 0) || citi !== city ? async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SWIGGY_API}?lat=${y}&lng=${x}&page_type=DESKTOP_WEB_LISTING`);

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

    useEffect(() => {
        const newArr = [...data2];
        if (preference === 'rating') {
            newArr.sort((a, b) => {
                var n1 = a.info.avgRatingString;
                var n2 = parseFloat(n1);
                var m1 = b.info.avgRatingString
                var m2 = parseFloat(m1);

                if (n2 < m2) return 1;
                if (n2 > m2) return -1;

                return 0
            });
        } else if (preference === 'cost for two') {
            newArr.sort((a, b) => {
                var n1 = a.info.costForTwo;
                var n2 = parseInt(n1.substr(1, 4));
                var m1 = b.info.costForTwo;
                var m2 = parseInt(m1.substr(1, 4));

                if (n2 > m2) return 1;
                if (n2 < m2) return -1;

                return 0
            });
        }
        setData2(newArr)
        console.log(preference)
    }, [preference])

    function check(x) {
        if (x === 'veg') {
            setVeg(prevState => !prevState);
            if (veg === false) {
                if (nonveg === true) {
                    setNonveg(prevState => !prevState);
                    const new2 = data3.filter(x => x.info.veg === true)
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

    // data.communication.swiggyNotPresent.swiggyNotPresent

    function navi(x) {
        dispatch(storeRestId({
            id: x
        }))
        localStorage.removeItem('menu');
        router.push('/Menu')
    }

    const isPresent = data?.data?.communication?.swiggyNotPresent?.swiggyNotPresent
    console.log(isPresent)
    // console.log(data2.length > 0 ? data2.filter(x => x.info.isOpen === true) : '')

    return (
        <>

            <header className={`${comfortaa.className} w-[130vw] h-full sm:w-full bg-[#b4c6b6] `}>
                <div className="flex fixed z-0 my-[20rem] sm:my-[14rem] focus:blur select-none">
                    <p className={`${anton.className} text-7xl sm:text-[12rem] text-[#d3d9d5] `}> RESTAURANTS </p>
                </div>
                <figure className="flex flex-col sm:ml-24">
                    <Header />
                    <div className={`ml-8 mr-6 sm:mr-32 ${styles.bg} z-10`}>
                        <div className={` w-full p-2 h-24 sm:h-32 rounded-md ${styles.bg}`}>
                            <div className="sm:p-4">
                                <p className={`text-white font-bold text-2xl sm:text-4xl `}> Hey {city} </p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex space-x-4 mt-8 ml-4 sm:ml-8 ${kanit.className} z-10`}>
                        <div
                            className="sm:flex hidden transition-none"
                        >
                            <ComboboxDemo
                                setPreference={setPreference}
                            />
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
                            <Label htmlFor="airplane-mode" className={`mt-1 ${kanit.className} text-white font-bold`}>Veg</Label>
                        </div>
                        <div className="flex space-x-2">
                            <Switch
                                id="non-veg"
                                onClick={() => check('nonveg')}
                                checked={nonveg}
                            />
                            <Label htmlFor="airplane-mode" className={`mt-1 ${kanit.className} text-white font-bold`}>Non-veg</Label>
                        </div>
                    </div>
                    <div className="flex align-middle mt-10 z-10">
                        <hr className="border-2 border-white w-1/2 ml-8 rounded-sm" />
                        <p className={`tracking-widest text-sm ${kanit.className} -mt-2 ml-2 mr-2 text-white font-light`}> RESTAURANTS </p>
                        <hr className="border-2 border-white w-1/2 mr-10 sm:mr-32 rounded-sm" />
                    </div>
                    <div className={`${styles.grid} z-10`}>
                        {
                            !isPresent ? data2.map((x, i) => <div key={i}>
                                <div
                                    className={`p-2 -ml-16 sm:ml-24 hover:cursor-pointer`}
                                    onClick={() => navi(x.info.id)}
                                >
                                    <Card
                                        id={x.info.name}
                                        name={x.info.name}
                                        areaName={x.info.areaName}
                                        locality={x.info.locality}
                                        costforTwo={x.info.costForTwo}
                                        cuisine={x.info.cuisines}
                                        totalRating={x.info.avgRatingString}
                                        totalRatings={x.info.totalRatingsString}
                                        discount={x.info.aggregatedDiscountInfoV3}
                                        veg={x.info.veg}
                                    />
                                </div>
                            </div>) : <div className="flex justify-center mt-[3rem] -ml-8 sm:ml-[10rem] space-x-10 sm:w-[150%] p-2">
                                <Image
                                    src='/personal/no-swiggies.jpg'
                                    height={0}
                                    width={150}
                                    alt='no restaurants found'
                                    className="mb-24 rounded-md"
                                />
                                <p className={`${kanit.className} text-white font-semibold text-xl mt-10 -mr-12`}> There are no swiggies available at your location </p>
                            </div>
                        }
                    </div>
                </figure>
            </header>
            <div className="absolute bg-white z-50">
                <Footer />
            </div>
        </>
    )
}
