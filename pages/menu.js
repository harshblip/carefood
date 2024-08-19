import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Kanit } from 'next/font/google';
import { Minus, Plus } from "lucide-react";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200']
})

export default function menu() {
    const accessToken = useSelector(state => state.signup.accessToken)
    const userEmail = useSelector(state => state.signup.email)
    const restId = useSelector(state => state.location.restId)
    const x = useSelector(state => state.location.x);
    const y = useSelector(state => state.location.y);
    const [data, setData] = useState([]);
    const [count, setCount] = useState([]);
    const [mycart, setMyCart] = useState([]);
    const [menu, setMenu] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [total, setTotal] = useState(0);

    console.log(restId, x, y);

    useEffect(() => {
        setCount(Array(200).fill(0));
    }, [])

    let p = 0, q1 = 0, q2 = 0;
    useEffect(() => {
        (
            async () => {
                console.log("hi")
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SWIGGY_MENU}&lat=${y}&lng=${x}&&submitAction=ENTER&restaurantId=${restId}`)

                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data.data);
                }
            }
        )()
        setCount(Array(200).fill(0));
    }, [])

    useEffect(() => {
        if (data && data.cards) {
            console.log(data.cards);
            setMenu(data.cards[4].groupedCard.cardGroupMap.REGULAR.cards)
            setName(data.cards[2].card.card.info.name)
            setAddress(data.cards[2].card.card.info.areaName)
            // console.log(bio)
        }
        menu.length > 0 ? menu.forEach(x => {
            if (x.card.card.carousel) {
                console.log(x.card.card.carousel.length)
            }
        }) : ''
        menu.length > 0 ? menu.forEach(x => {
            if (x.card.card.itemCards) {
                console.log(x.card.card.itemCards.length)
            }
        }) : ''
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
            a.map(y => y.name === name ? x === 'add' ? y.quantity = y.quantity + 1 : y.quantity = Math.max(0, y.quantity - 1) : '')
            console.log("editcart", a);
        } else {
            setMyCart([...mycart, obj])
        }
    }

    console.log("setCount", count)

    async function addCart() {
        var sum = 0;
        mycart.map(x => { sum = sum + x.quantity * x.price })
        setTotal(sum);
        const currentTime = new Date();
        try {
            const response = await axios.post('/api/addToCart', {
                items: mycart,
                orderTime: currentTime,
                restaurantName: name,
                address: address,
                orderStatus: 'unpaid',
                totalAmt: total,
                email: userEmail,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
            if (response.status === 200) {
                console.log("cart added to user ", userEmail)
            } else {
                console.log("lol response status wrong bro")
            }
        } catch (err) {
            console.log("error response ", err)
        }
    }

    console.log(mycart, total)

    var title = ""
    var q = 0;

    return (
        <div className={`${kanit.className}`}>
            {
                menu.length > 0 ? menu.map((x, i) => <div key={i}>
                    {
                        x.card.card.carousel ? x.card.card.carousel.map((y, j) => {
                            q = q + 1
                            return (
                                <div className="flex flex-col">
                                    {
                                        (x.card.card.title !== title ? <p className="font-bold mt-2"> {title = x.card.card.title} </p> : ''
                                        )
                                    }
                                    <div className="flex">
                                        <p className="mt-2"> {y.title} </p>
                                        <p className="ml-2 mt-2 mr-2"> {y.dish.info.price / 100} </p>
                                        <div className="flex space-x-2">
                                            <Minus onClick={() => cart(j, 'minus', y.title, y.dish.info.price / 100)}
                                                className="hover:cursor-pointer"
                                            />
                                            <p> {count[p + j]} </p>
                                            <Plus onClick={() => cart(j, 'add', y.title, y.dish.info.price / 100)}
                                                className="hover:cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>)
                        }
                        ) : ''
                    }
                </div>) : 'menu length zero brdr'
            }
            {
                p = q
            }
            {
                // console.log("q1", p)
            }
            {
                menu.length > 0 ? menu.map((x, i) => {
                    p = q + 1
                    return (
                        x.card.card.itemCards ? x.card.card.itemCards.map((y, j) => {
                            q = q + 1
                            var ok = j+p;
                            return (
                                <div className="flex flex-col">
                                    {(x.card.card.title !== title ?
                                        <p className="font-bold mt-2"> {title = x.card.card.title} </p> : ''
                                    )}
                                    <div className="flex space-x-2 mt-4">
                                        <p className="mt-2"> {y.card.info.name} </p>
                                        <Minus onClick={() => cart(ok, 'minus', y.card.info.name, y.card.info.price / 100)}
                                            className="hover:cursor-pointer"
                                        />
                                        <p> {count[p + j]} </p>
                                        <Plus onClick={() => cart(ok, 'add', y.card.info.name, y.card.info.price / 100)}
                                            className="hover:cursor-pointer"
                                        />
                                        {/* <p className="ml-2 font-bold"> {x.card.card.title} </p> */}
                                    </div>
                                </div>
                            )
                        }) : ''
                    )
                }) : ''
            }
            {
                p = q
            }
            {
                menu.length > 0 ? menu.map(x => <div>
                    {
                        x.card.card.categories ? x.card.card.categories.map(y => y.itemCards ? y.itemCards.map((z, i) => <div className="flex space-x-4 mt-2">
                            {
                                (z.card.info.category !== title ?
                                    <p className="font-bold"> {title = z.card.info.category} </p> : ''
                                )
                            }
                            <div className="space-x-2">
                                <p> {z.card.info.name} </p>
                                <Minus onClick={() => cart(i + p, 'minus', z.card.info.name, z.card.info.price / 100)}
                                    className="hover:cursor-pointer"
                                />
                                <p> {count[p + i]} daddy </p>
                                <Plus onClick={() => cart(i + p, 'add', z.card.info.name, z.card.info.price / 100)}
                                    className="hover:cursor-pointer"
                                />
                            </div>
                        </div>) : '') : ''
                    }
                </div>) : 'menu length zero brdr'
            }
            <button
                className="bg-transparent p-2 w-24 border rounded-md"
                onClick={() => addCart()}
            > add to cart </button>
            <p className="mt-4 font-bold"> {name}, {address} </p>
        </div>
    )
}