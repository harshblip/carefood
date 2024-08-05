import { useSelector } from "react-redux"
import { Comfortaa } from 'next/font/google';
import styles from '../src/app/resturants.module.css'
import DropdownMenu from "../components/Dropdownbtn";
import AuthBtn from "../components/AuthBtn";
import { useEffect, useState } from "react";
import axios from "axios";

const comfortaa = Comfortaa({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '600', '700']
});

export default function resturants() {

    const city = useSelector(state => state.location.city)
    const userName = useSelector(state => state.signup.name)
    const x = useSelector(state => state.location.x);
    const y = useSelector(state => state.location.y);
    const [data, setData] = useState([])
    console.log(x, y)

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`https://foodfire.onrender.com/api/restaurants?lat=${y}&lng=${x}&page_type=DESKTOP_WEB_LISTING`);

                if (response.status === 200) {
                    setData(response.data);
                }
            }
        )()
    }, [])

    const arr = data.data ? data.data.cards : ''
    arr.length > 0 ? arr.map(x => console.log("restos", x.card.card[4].gridElements.infoWithStyle.restaurants)) : ''
    console.log(arr);

    return (
        <header className={comfortaa.className}>
            <figure>
                <div className="flex justify-between p-8 ml-24 mr-24 ">
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
                <div className={`ml-32 mr-32 ${styles.bg}`}>
                    <div className={` w-full p-2 h-32 rounded-md ${styles.bg}`}>
                        <div className="p-4">
                            <p className="text-white font-extrabold text-4xl"> Hey {city} </p>
                        </div>
                    </div>
                </div>
            </figure>
        </header>
    )
}