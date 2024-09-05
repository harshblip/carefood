import { useSelector } from "react-redux"
import { Manrope, Anton } from "next/font/google"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Payment from "../components/payment"
import currencyCovert from "../utils/currencyConvert"
import { useState } from "react"
import { useRouter } from "next/router"

const manrop = Manrope({
    weight: ['400', '500', '700'],
    subsets: ['latin']
})

const anton = Anton({
    weight: ['400'],
    subsets: ['latin']
})

export default function checkout() {
    const amount = useSelector(state => state.restaurants.amount)
    const name = useSelector(state => state.restaurants.restName)
    const orderId = useSelector(state => state.restaurants.orderId)
    const address = useSelector(state => state.restaurants.address)
    const userEmail = useSelector(state => state.signup.email)
    const [timer, setTimer] = useState(3);

    const router = useRouter();

    console.log(orderId);

    const appearance = {
        variables: {
            colorPrimary: '#081420',
            colorBackground: '#b4c6b6',
            colorText: '#ffffff',
        }
    }

    setTimeout(() => {
        if (timer >= 0) {
            setTimer(timer - 1)
        }
        if (timer === 0) {
            router.push('/Landingpage')
            // console.log("xD")
        }
    }, 1000)

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

    return (
        <div className="w-[130vw] h-[100vh] sm:w-full bg-[#b4c6b6]">
            <div className="sm:ml-24 ml-4">
                {userEmail ? <> <div className="flex fixed -ml-4 sm:-ml-24 z-0 my-[20rem] sm:my-[14rem] focus:blur select-none">
                    <p className={`${anton.className} text-start text-7xl sm:text-[12rem] text-[#d3d9d5] `}> PAY</p>
                </div>
                    <div className="flex space-x-4 absolute top-32 left-[25%]">
                        <div className="z-10 p-2 flex flex-col justify-between bg-[#f8f9fa] rounded-md w-[20rem]">
                            <div className={`p-4 ${manrop.className}`}>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex justify-between">
                                        <p className={`text-gray-600 font-bold text-4xl tracking-wide`}> Pay </p>
                                        <p className="text-gray-600 font-bold text-3xl"> <span className="text-xs"> ₹ </span> {amount} <span className="text-xs -ml-1"> .00 </span> </p>
                                    </div>
                                </div>

                                <div className="flex mt-20">
                                    <hr className="border border-gray-600 w-full ml-2 rounded-sm" />
                                    <p className={`tracking-widest text-sm ${manrop.className} -mt-2 ml-2 mr-2 text-gray-600 font-light`}> to </p>
                                    <hr className="border border-gray-600 w-full rounded-sm" />
                                </div>
                                <p className={`text-gray-600 font-bold text-3xl mt-10`}> {name} </p>
                            </div>
                            <div className={`flex flex-col ${manrop.className} space-y-2 p-4`}>
                                <hr
                                    className="border-1 border-gray-300"
                                />
                                <p className="text-gray-600 font-medium text-sm"> {address} </p>
                            </div>
                        </div>
                        <div className="p-2 rounded-md">
                            <Elements
                                stripe={stripePromise}
                                options={{
                                    mode: 'payment',
                                    amount: currencyCovert(amount),
                                    currency: 'usd',
                                    appearance
                                }}
                            >
                                <Payment />
                            </Elements>
                        </div>
                    </div></> : <div className={`w-full flex flex-col justify-center items-center ${kanit.className}`}>
                    <p> You are not authorized to access this page </p>
                    <p> redirecting you back to homepage in {timer} </p>
                </div>
                }
            </div>
        </div>
    )
}