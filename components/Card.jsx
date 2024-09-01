import Image from "next/image";
import { Varela_Round, Kanit, Anton } from "next/font/google";
import { BadgePercent, Earth, Hotel, PersonStanding, Star } from "lucide-react";
import { CurrencyDollarIcon, CurrencyRupeeIcon } from "@heroicons/react/solid";

const varela = Varela_Round({
    weight: ['400'],
    subsets: ['latin']
})

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200', '500', '600']
})

const anton = Anton({
    weight: ['400'],
    subsets: ['latin']
})

export default function Card({ id, name, areaName, locality, costforTwo, cuisine, totalRating, totalRatings, discount, veg }) {

    const imgs = ["/buildings/b1.png", "/buildings/b2.png", "/buildings/b3.png", "/buildings/b4.png", "/buildings/b4.png", "/buildings/b5.png", "/buildings/b6.png", "/buildings/b7.png", "/buildings/b8.png"]

    const random = Math.round(Math.random() * 8);
    return (
        <div key={id} className={`${varela.className} bg-white p-2 rounded-lg w-[21rem] h-[8rem] flex space-x-1`}>
            <div className="h-[7rem] w-[7rem] mt-2 flex flex-col justify-around">
                <Image
                    src={imgs[random]}
                    height={0}
                    width={150}
                    alt="restorant image"
                />
                {
                    discount ? <div className="flex text-start ">
                        <BadgePercent
                            className="w-4 text-yellow-400 mb-4"
                        />
                        <p className="text-[9px] text-yellow-400 mt-2 ml-1">
                            {discount?.header} {discount?.subHeader}
                        </p>
                    </div> : ''
                }
            </div>
            <div className="flex flex-col">
                <div className="flex space-x-2 mt-2">
                    <Earth
                        className="w-4 text-gray-500"
                    />
                    <p className="text-gray-600 text-sm mt-[2px] truncate"> {name} </p>
                </div>
                <p className={`${kanit.className} text-xs font-extralight`}> {areaName}, {locality} </p>
                <div className="flex">
                    <div className="flex">
                        <Star
                            className="text-yellow-400 w-3"
                            fill="#facc15"
                        />
                        <p className="text-xs mt-[5px] ml-1"> {totalRating} </p>
                    </div>
                    <div className="h-4 border-r-2  mt-[5px] ml-2">
                    </div>
                    <div className="flex ml-1">
                        <PersonStanding
                            className="w-4 text-emerald-500"
                        />
                        <p className="text-xs mt-[5px]"> {totalRatings} </p>
                    </div>
                    <div className="h-4 border-r-2  mt-[5px] ml-2">
                    </div>
                    <div className="flex ml-1">
                        <CurrencyRupeeIcon
                            className="w-4 text-green-400"
                        />
                        <p className="text-xs mt-[5px] ml-1"> {costforTwo} </p>
                    </div>
                </div>
                <hr
                    className="w-full border-1 mt-1"
                />
                <div className="flex text-gray-600 space-x-2">
                    <p className="text-xs mt-1"> {cuisine[0]} </p>
                    <p className="text-xs mt-1"> {cuisine[1]} </p>
                    <p className="text-xs mt-1"> {cuisine[2]} </p>
                </div>
                {
                    veg ? <div className={`${anton.className} ml-44 absolute flex flex-col text-3xl text-green-300 opacity-50`}>
                        <p> V </p>
                        <p> E </p>
                        <p> G </p>
                    </div> : <div className={`${anton.className} ml-44 justify-end absolute flex flex-col text-3xl text-red-300 opacity-60`}>
                        <p> V </p>
                        <p> E </p>
                        <p> G </p>
                    </div>
                }
            </div>
        </div>
    )
}