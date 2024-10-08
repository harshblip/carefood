import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Kanit, Anton } from 'next/font/google';
import { BadgeIndianRupee, Bike, Info, Minus, Plus, Star, Utensils } from "lucide-react";
import { CDN_URL } from "../utils/constants";
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Header from "../components/Header";
import styles from '../src/app/menu.module.css'
import { useRouter } from "next/router";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LoadingMenu from "../components/LoadingMenu";

const anton = Anton({
    weight: ['400'],
    subsets: ['latin']
})

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700']
})

export default function Menu() {
    const accessToken = useSelector(state => state.signup.accessToken)
    const userEmail = useSelector(state => state.signup.email)
    const restId = useSelector(state => state.restaurants.restId)
    const x = useSelector(state => state.location.x);
    const y = useSelector(state => state.location.y);
    const [data, setData] = useState([]);
    const [count, setCount] = useState([]);
    const [mycart, setMyCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const sample = [0, 0, 0, 0, 0]
    const [restaurant, setRestaurant] = useState({
        menu: [],
        name: '',
        address: '',
        rating: '',
        ratingnum: '',
        costfor2: '',
        timeTaken: '',
        message: '',
        billTotal: '',
        cuisines: [],
        offers: []
    })
    const [billTotal, setBillTotal] = useState(0);

    console.log(restId, x, y);

    var getMenu = [];
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('menu'))) {
            getMenu = JSON.parse(localStorage.getItem('menu'));
        }
        (
            getMenu.length === 0 ? async () => {
                // console.log("hi")
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SWIGGY_MENU}&lat=${y}&lng=${x}&&submitAction=ENTER&restaurantId=${restId}`)

                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data.data);
                    setLoading(true)
                    localStorage.setItem('menu', JSON.stringify(response.data.data))
                }
            } : () => {
                // console.log("hello")
                setData(getMenu);
            }
        )()
        setCount(Array(400).fill(0));
    }, [])

    useEffect(() => {
        if (data && data.cards) {
            console.log(data.cards);
            const menu = data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
            const info = data.cards[2]?.card?.card?.info
            const offers = data.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
            setRestaurant(prevState => ({
                ...prevState,
                menu: menu,
                name: info?.name,
                address: info?.areaName,
                ratingnum: info?.totalRatingsString,
                rating: info?.avgRating,
                costfor2: info?.costForTwoMessage,
                cuisines: info?.cuisines,
                timeTaken: info?.sla?.slaString,
                message: info?.feeDetails?.message,
                offers: offers
            }))
        }
    }, [data]);

    function cart(i, x, name, price) {
        const newCount = [...count];
        x === 'add' ? newCount[i] = count[i] + 1 : newCount[i] = Math.max(0, count[i] - 1);
        setCount(newCount);
        const obj = {
            name: name,
            price: price,
            quantity: x === 'add' ? count[i] + 1 : count[i] + 1
        }
        const n = mycart.find(x => x.name === name)
        if (n) {
            const a = [...mycart];
            if (x === 'add') {
                setBillTotal(prevTotal => prevTotal + price);
            } else {
                setBillTotal(prevTotal => prevTotal - price);
            }
            a.map(y => y.name === name ? x === 'add' ? y.quantity = y.quantity + 1 : y.quantity = Math.max(0, y.quantity - 1) : '')
        } else {
            setBillTotal(prevTotal => prevTotal + price);
            setMyCart([...mycart, obj])
        }

        const m = mycart.filter(x => x.quantity !== 0)
        setMyCart(prevCart => {
            return prevCart.filter(x => x.quantity !== 0);
        })
        console.log("editcart", m);
    }

    console.log("setCart", mycart)

    const router = useRouter();

    async function addCart() {
        if (!userEmail) {
            router.push('/Login')
        } else {
            var sum = 0;
            mycart.map(x => { sum = sum + x.quantity * x.price })
            console.log("sum", sum)
            console.log("id", restId)
            const time = new Date();
            const currentTime = time.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            try {
                const response = await axios.post('/api/addToCart', {
                    items: mycart,
                    orderTime: currentTime,
                    restaurantName: restaurant.name,
                    address: restaurant.address,
                    orderStatus: 'unpaid',
                    totalAmt: sum,
                    email: userEmail,
                    restId: restId
                },
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                )
                if (response.status === 200) {
                    console.log("cart added to user ", userEmail)
                } else {
                    console.log("lol response status wrong bro")
                }
            } catch (err) {
                console.log("error response ", err)
            }
            router.push('/Cart')
        }
    }

    // console.log(mycart, total)

    var title = ""
    var p = 0
    var q = 0;
    console.log(restaurant.name, ',jhvgvj')
    return (
        <div className={`${kanit.className} flex flex-col bg-[#b4c6b6] w-[160%] sm:w-full`}>
            <Header />
            <div className="flex fixed z-0 my-[20rem] sm:my-[14rem] focus:blur select-none">
                <p className={`${anton.className} text-7xl sm:text-[12rem] text-[#d3d9d5] `}> MENU </p>
            </div>
            <div className="flex mt-8 sm:ml-32 ml-6 z-10">
                <div className={`${!loading ? `blur-[0.8px]` : ''} p-2 flex flex-col space-y-2 text-white`}>
                    <p className={` text-2xl font-semibold`}> {restaurant.name || 'Hold on'} </p>
                    <div className="bg-white text-gray-600 rounded-md shadow w-[26rem] sm:w-[28rem]">
                        <div className="p-4 flex flex-col">
                            <div className="flex">
                                <div className="flex">
                                    <Star
                                        className="text-yellow-400 w-3"
                                        fill="#facc15"
                                    />
                                    <p className="text-sm ml-2 font-semibold"> {restaurant.rating || '5.0'} ({restaurant.ratingnum || '1M+ ratings'}) </p>
                                </div>
                                <div className="h-4 border-r-2  mt-[5px] ml-2">
                                </div>
                                <div>
                                    <p className="text-sm ml-2 font-semibold"> {restaurant.costfor2 || 'pricessless'} </p>
                                </div>
                            </div>
                            <p className="text-sm ml-2 font-semibold text-emerald-400 underline"> {restaurant.cuisines[0]}, {restaurant.cuisines[1] || 'Dessert, Dinner'} </p>
                            <div className="flex mt-1">
                                <svg width="20" height="70" className="mt-2">
                                    <circle cx="10" cy="10" r="5" fill="#adb5bd" />
                                    <line x1="10" y1="10" x2="10" y2="40" stroke="#adb5bd" strokeWidth="2" />
                                    <circle cx="10" cy="40" r="5" fill="#adb5bd" />
                                </svg>
                                <div className="flex flex-col">
                                    <div className="flex font-medium text-sm">
                                        <p className="ml-2 mt-2"> Outlet </p>
                                        <p className="ml-4 mt-2 font-light"> {restaurant.address || 'Site C, Lotus'} </p>
                                    </div>
                                    <div className="font-medium text-sm mt-2 ml-2">
                                        <p> {restaurant.timeTaken.toLocaleLowerCase() || 'ready-to-eat'} </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {restaurant.message ? <> <hr className="border border-gray-200 rounded-sm -mt-8 mb-3" />
                                    <div className="flex space-x-2 items-center">
                                        <Bike
                                            className="w-4 text-gray-600 ml-1"
                                        />
                                        <p className="text-sm font-light"> {restaurant.message || 'Im peak bronze 3 in Valorant'} </p>
                                    </div></> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="mt-8 font-semibold text-xl"> Deals for you </p>
                    </div>
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full sm:max-w-sm sm:mr-0 mr-24"
                    >
                        <CarouselContent>
                            {
                                restaurant.offers ? restaurant.offers.map((x, i) => (
                                    <CarouselItem key={i} className="basis-1/2 sm:basis-1/3">
                                        <div className="p-1">
                                            <Card className="hover:bg-white hover:text-gray-600 hover:cursor-pointer transition-all">
                                                <CardContent className="flex sm:aspect-square items-center justify-center p-4">
                                                    <span className="font-semibold text-sm">{x.info.header}</span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                )) : ''
                            }
                        </CarouselContent>
                        {
                            restaurant.offers.length ? <div className="sm:flex hidden">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div> : ''
                        }
                    </Carousel>
                </div>
            </div>

            <div className="w-full mt-12 flex flex-col z-10">
                <div className="flex justify-center items-center space-x-2">
                    <hr className="border-2 border-white w-1/4 ml-8 rounded-sm" />
                    <Utensils
                        className="w-4 text-white"
                    />
                    <p className="text-sm text-white font-light tracking-wider"> MENU </p>
                    <Utensils
                        className="w-4 text-white"
                    />
                    <hr className="border-2 border-white w-1/4 mr-8 rounded-sm" />
                </div>

                <div>

                    {
                        restaurant.menu.length > 0 ? restaurant.menu.map((x, i) => <div key={i}>
                            <Carousel
                                opts={{
                                    align: "start"
                                }}
                                className="max-w-xl sm:max-w-4xl ml-6 sm:ml-32 mb-4"
                            >
                                <CarouselContent>
                                    {
                                        x.card.card.carousel ? x.card.card.carousel.map((y, j) => {
                                            q = q + 1
                                            return (
                                                <div className="flex flex-col sm:mt-12" key={j}>
                                                    {
                                                        (x.card.card.title !== title ? <div className="absolute flex space-x-2 items-center">
                                                            <p className="font-medium text-xl text-white mt-0 ml-8"> {title = x.card.card.title} </p>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <Info
                                                                            className="w-4 text-white mt-1"
                                                                        />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="absolute w-[14rem] mt-1 ml-2">
                                                                        <p className={`text-white text-sm`}>slide to the left to see more</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div> : ''
                                                        )
                                                    }
                                                    <div>
                                                        <CarouselItem key={j} className="basis-1/4 sm:basis-1/3 sm:w-32 mt-12 mr-8 sm:mr-24 rounded-md">
                                                            <div>
                                                                <Card className="hover:bg-transparent hover:text-white hover:cursor-pointer transition-all text-white w-[12rem] h-[13rem] ">
                                                                    <CardContent className="flex flex-col justify-center text-start p-4">
                                                                        <div className="flex flex-col items-center ">
                                                                            {
                                                                                !y.dish.info.imageId ? <img
                                                                                    src='/food/food-img.png'
                                                                                    className="w-24 h-24 object-cover rounded-md"
                                                                                    alt='fooditem-image'
                                                                                /> : <img
                                                                                    src={CDN_URL + y.dish.info.imageId}
                                                                                    className="w-24 h-24 object-cover rounded-md"
                                                                                />
                                                                            }

                                                                            <div className="w-full flex justify-center truncate">
                                                                                <p className="text-sm font-semibold mt-2"> {y.title} </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center absolute bottom-0 -ml-2">
                                                                            <BadgeIndianRupee
                                                                                className="w-4 text-white -mt-6 mr-1"
                                                                            />
                                                                            <p className="mb-6 mr-2 text-base"> {y.dish.info.price ? Math.round(y.dish.info.price / 100) : Math.round(y.dish.info.defaultPrice / 100)} </p>
                                                                        </div>
                                                                        {
                                                                            count[p + j] > 0 ? <div className="text-xs text-white font-medium absolute bottom-0 mb-6 ml-16 border w-[5.5rem] rounded-md"><div className="flex space-x-3 ml-3 items-center">
                                                                                <Minus onClick={() => cart(j, 'minus', y.title, y.dish.info.price ? Math.round(y.dish.info.price / 100) : Math.round(y.dish.info.defaultPrice / 100))}
                                                                                    className="hover:cursor-pointer w-4"
                                                                                />
                                                                                <p className="text-sm text-white font-semibold"> {count[p + j]} </p>
                                                                                <Plus onClick={() => cart(j, 'add', y.title, y.dish.info.price ? Math.round(y.dish.info.price / 100) : Math.round(y.dish.info.defaultPrice / 100))}
                                                                                    className="hover:cursor-pointer w-4"
                                                                                />
                                                                            </div></div> : <button
                                                                                className="rounded-md bg-white text-gray-600 absolute bottom-0 mb-5 ml-14 font-medium w-24 text-xs"
                                                                                onClick={() => cart(j, 'add', y.title, y.dish.info.price ? Math.round(y.dish.info.price / 100) : Math.round(y.dish.info.defaultPrice / 100))}
                                                                            > <p className="p-2"> Add to cart </p> </button>
                                                                        }
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                        </CarouselItem>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        ) : ''
                                    }
                                </CarouselContent>
                            </Carousel>
                        </div>) : <>
                            {
                                sample.map((x, i) => <LoadingMenu key={i} />)
                            }
                        </>
                    }
                </div>
                <div className="hidden">
                    {
                        p = q
                    }
                </div>
                <div className="sm:-mt-44 -mt-[12rem]">
                    {
                        restaurant.menu.length > 0 ? restaurant.menu.map((x, i) => {
                            p = q + 1
                            return <div key={i}>
                                <Carousel
                                    opts={{
                                        align: "start"
                                    }}
                                    className="max-w-xl sm:max-w-4xl ml-6 sm:ml-32 mb-4"
                                >
                                    <CarouselContent>
                                        {x.card.card.itemCards ? x.card.card.itemCards.map((y, j) => {
                                            q = q + 1
                                            var ok = j + p;
                                            return (
                                                <div className="flex flex-col" key={j}>
                                                    {
                                                        (x.card.card.title !== title ? <div className="absolute flex space-x-2 items-center">
                                                            <p className="font-medium text-xl text-white mt-0 ml-8"> {title = x.card.card.title} </p>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <Info
                                                                            className="w-4 text-white mt-1"
                                                                        />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="absolute w-[14rem] mt-1 ml-2">
                                                                        <p className={`text-white text-sm`}>slide to the left to see more</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div> : ''
                                                        )
                                                    }
                                                    <CarouselItem key={j} className="basis-1/4 sm:basis-1/3 sm:w-32 mt-12 mr-4 sm:mr-24 rounded-md">
                                                        <div>
                                                            <Card className="hover:bg-transparent hover:text-white hover:cursor-pointer transition-all text-white w-[12rem] h-[13rem] ">
                                                                <CardContent className="flex flex-col text-start p-4">
                                                                    <div className="flex flex-col items-center">
                                                                        {
                                                                            !y.card.info.imageId ? <img
                                                                                src='/food/food-img.png'
                                                                                className="w-24 h-24 object-cover rounded-md"
                                                                                alt='fooditem-image'
                                                                            /> : <img
                                                                                src={CDN_URL + y.card.info.imageId}
                                                                                className="w-24 h-24 object-cover rounded-md"
                                                                            />
                                                                        }
                                                                        <div className="w-full flex justify-center truncate">
                                                                            <p className="text-sm font-semibold mt-2"> {y.card.info.name} </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center absolute bottom-0 -ml-2">
                                                                        <BadgeIndianRupee
                                                                            className="w-4 text-white -mt-6 mr-1"
                                                                        />
                                                                        <p className="mb-6 mr-2 text-base"> {y.card.info.price ? Math.round(y.card.info.price / 100) : Math.round(y.card.info.defaultPrice / 100)} </p>
                                                                    </div>
                                                                    {
                                                                        count[ok] > 0 ?
                                                                            <div className="text-xs text-white font-medium absolute bottom-0 mb-6 ml-16 border w-[5.5rem] rounded-md">
                                                                                <div className="flex space-x-3 ml-3 items-center">
                                                                                    <Minus onClick={() => cart(ok, 'minus', y.card.info.name, y.card.info.price ? y.card.info.price / 100 : y.card.info.defaultPrice / 100)}
                                                                                        className="hover:cursor-pointer w-4"
                                                                                    />
                                                                                    <p className="text-sm text-white font-semibold"> {count[p + j]} </p>
                                                                                    <Plus onClick={() => cart(ok, 'add', y.card.info.name, y.card.info.price ? Math.round(y.card.info.price / 100) : Math.round(y.card.info.defaultPrice / 100))}
                                                                                        className="hover:cursor-pointer w-4"
                                                                                    />
                                                                                </div>
                                                                            </div> : <button
                                                                                className="rounded-md bg-white text-gray-600 absolute bottom-0 mb-5 ml-14 font-medium w-24 text-xs"
                                                                                onClick={() => cart(ok, 'add', y.card.info.name, y.card.info.price ? Math.round(y.card.info.price / 100) : Math.round(y.card.info.defaultPrice / 100))}
                                                                            > <p className="p-2"> Add to cart </p> </button>
                                                                    }
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    </CarouselItem>
                                                </div>
                                            )
                                        }) : ''
                                        }
                                    </CarouselContent>
                                </Carousel>
                            </div>
                        }) : <>
                            {
                                sample.map((x, i) => <LoadingMenu key={i} />)
                            }
                        </>
                    }
                </div>
            </div>
            <div className="hidden absolute">
                {
                    p = q
                }
            </div>

            {
                restaurant.menu.length > 0 ? restaurant.menu.map((x, e) => <div key={e}>
                    {
                        x.card.card.categories ? x.card.card.categories.map((y, j) => {
                            p = q + 1
                            return (
                                <div key={j}>
                                    <Carousel
                                        opts={{
                                            align: "start"
                                        }}
                                        className="max-w-xl sm:max-w-4xl ml-6 sm:ml-32 mb-4"
                                    >
                                        <CarouselContent>
                                            {y.itemCards ? y.itemCards.map((z, i) => {
                                                q = q + 1
                                                var ok = i + p;
                                                return (
                                                    <div key={i}>
                                                        {
                                                            (y.title !== title ? <div className="absolute flex space-x-2 items-center">
                                                                <p className="font-medium text-xl text-white mt-0 ml-8"> {title = y.title} </p>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Info
                                                                                className="w-4 text-white mt-1"
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="absolute w-[14rem] mt-1 ml-2">
                                                                            <p className={`text-white text-sm`}>slide to the left to see more</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div> : ''
                                                            )
                                                        }
                                                        <CarouselItem key={i} className="basis-1/4 sm:basis-1/3 sm:w-32 mt-12 mr-4 sm:mr-24 rounded-md">
                                                            <div>
                                                                <Card className="hover:bg-transparent hover:text-white hover:cursor-pointer transition-all text-white w-[12rem] h-[13rem] ">
                                                                    <CardContent className="flex flex-col text-start p-4">
                                                                        <div className="flex flex-col items-center">
                                                                            {
                                                                                !z.card.info.imageId ? <img
                                                                                    src='/food/food-img.png'
                                                                                    className="w-24 h-24 object-cover rounded-md"
                                                                                    alt='fooditem-image'
                                                                                /> : <img
                                                                                    src={CDN_URL + z.card.info.imageId}
                                                                                    className="w-24 h-24 object-cover rounded-md"
                                                                                />
                                                                            }
                                                                            <div className="w-full flex justify-center truncate">
                                                                                <p className="text-sm font-semibold mt-2"> {z.card.info.name} </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center absolute bottom-0 -ml-2">
                                                                            <BadgeIndianRupee
                                                                                className="w-4 text-white -mt-6 mr-1"
                                                                            />
                                                                            <p className="mb-6 mr-2 text-base"> {z.card.info.price ? Math.round(z.card.info.price / 100) : Math.round(z.card.info.defaultPrice / 100)} </p>
                                                                        </div>
                                                                        {
                                                                            count[ok] > 0 ? <div className="text-xs text-white font-medium absolute bottom-0 mb-6 ml-16 border w-[5.5rem] rounded-md"><div className="flex space-x-3 ml-3 items-center">
                                                                                <Minus onClick={() => cart(ok, 'minus', z.card.info.name, z.card.info.price ? Math.round(z.card.info.price / 100) : Math.round(z.card.info.defaultPrice / 100))}
                                                                                    className="hover:cursor-pointer w-4"
                                                                                />
                                                                                <p> {count[p + i]} </p>
                                                                                <Plus onClick={() => cart(ok, 'add', z.card.info.name, z.card.info.price ? Math.round(z.card.info.price / 100) : Math.round(z.card.info.defaultPrice / 100))}
                                                                                    className="hover:cursor-pointer w-4"
                                                                                />
                                                                            </div></div> : <button
                                                                                className="rounded-md bg-white text-gray-600 absolute bottom-0 mb-5 ml-14 font-medium w-24 text-xs"
                                                                                onClick={() => cart(ok, 'add', z.card.info.name, z.card.info.price ? Math.round(z.card.info.price / 100) : Math.round(z.card.info.defaultPrice / 100))}
                                                                            > <p className="p-2"> Add to cart </p> </button>
                                                                        }
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                        </CarouselItem>
                                                    </div>
                                                )
                                            }) : ''}
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                            )
                        }) : ''
                    }
                </div>) : <>
                    {
                        sample.map((x, i) => <LoadingMenu key={i} />)
                    }
                </>
            }

            {
                mycart.length ? <button
                    className={`w-1/2 sm:w-[20rem] h-14 sm:h-11 fixed bottom-0 right-[25%] sm:right-[35%] mb-2 rounded-md bg-emerald-500 flex p-1 justify-between z-10 ${styles.slideup} `}
                    onClick={() => addCart()}
                > <p className="text-white font-semibold text-lg sm:text-sm p-2"> Add to cart </p> <p className="text-white font-semibold text-lg sm:text-sm p-2"> ₹{billTotal} </p> </button> : ''
            }
        </div>
    )
}