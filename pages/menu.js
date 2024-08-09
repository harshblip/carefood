import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Kanit } from 'next/font/google';
import { Minus, Plus, PlusSquare } from "lucide-react";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200']
})

export default function menu() {
    const restId = useSelector(state => state.location.restId)
    const x = useSelector(state => state.location.x);
    const y = useSelector(state => state.location.y);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [length, setLength] = useState(0);
    const [count, setCount] = useState([]);
    const [mycart, setMyCart] = useState([]);

    console.log(restId, x, y);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=${y}&lng=${x}&&submitAction=ENTER&restaurantId=${restId}`)

                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data.data);
                }
            }
        )()
    }, [])

    useEffect(() => {
        if (data && data.cards) {
            console.log(data.cards);
            const menu = data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;
            setName(data.cards[2].card.card.info.name)
            setAddress(data.cards[2].card.card.info.areaName)

            menu.length > 0 ? menu.map((x, i) => i === 1 ? (setLength(x.card.card.carousel.length), setData2(x.card.card.carousel)) : '') : ''
            // console.log(bio)
        }
    }, [data]);

    useEffect(() => {
        if (length) {
            setCount(Array(length).fill(0));
        }
    }, [length]);


    function cart(i, x, name, price) {
        const newCount = [...count];
        x === 'add' ? newCount[i] = count[i] + 1 : newCount[i] = count[i] - 1;
        setCount(newCount);
        console.log("count", count)
        const obj = {
            name: name,
            price: price,
            quantity: x === 'add' ? count[i] + 1 : count[i] + 1
        }
        const n = mycart.find(x => x.name === name)
        if (n) {
            const a = [...mycart];
            a.map(x => x.name === name ? x === 'add' ? x.quantity = count[i]-1 : x.quantity = count[i] + 1 : '')
            console.log("editcart", a);
        } else {
            setMyCart([...mycart, obj])
        }
    }

    console.log(mycart)

    return (
        <div className={`${kanit.className}`}>
            {
                data2 ? data2.map((x, i) => <div className="flex flex-col">
                    <div className="flex space-x-4">
                        <p> {x.title}, {x.dish.info.price / 100} </p>
                        <div className="flex space-x-2">
                            <Minus onClick={() => cart(i, 'minus', x.title, x.dish.info.price / 100)}
                                className="hover:cursor-pointer"
                            />
                            <p> {count[i]} </p>
                            <Plus onClick={() => cart(i, 'add', x.title, x.dish.info.price / 100)}
                                className="hover:cursor-pointer"
                            />
                        </div>
                    </div>
                </div>) : ''
            }
            <p className="mt-4 font-bold"> {name}, {address} </p>
        </div>
    )
}