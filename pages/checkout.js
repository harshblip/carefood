import { useSelector } from "react-redux"
import { Manrope } from "next/font/google"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Payment from "../components/payment"

const manrop = Manrope({
    weight: ['400', '500', '700'],
    subsets: ['latin']
})

export default function checkout() {
    const amount = useSelector(state => state.restaurants.amount)
    const name = useSelector(state => state.restaurants.restName)
    const orderId = useSelector(state => state.restaurants.orderId)
    console.log(orderId);

    const appearance = {
        variables: {
            colorPrimary: '#081420',
            colorBackground: '#b4c6b6',
            colorText: '#ffffff',
        }
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

    return (
        <div className="w-[130vw] h-[100vh] sm:w-full bg-[#b4c6b6] flex justify-center items-center ">
            <div className="flex space-x-4">
                <div className="p-2 flex flex-col justify-between bg-[#f8f9fa] rounded-md w-[20rem]">
                    <div className={`p-2 ${manrop.className} space-y-4`}>
                        <p className={`text-gray-600 font-bold text-4xl tracking-wide`}> Pay <span className="text-lg"> {amount} </span> </p>
                        <p className="text-sm">to</p>
                        <p className={`text-gray-600 font-bold text-3xl`}> {name} </p>
                    </div>
                    <div className={`flex flex-col ${manrop.className} space-y-2`}>
                        <hr
                            className="border-1 border-gray-300"
                        />
                        <p className="text-gray-600 font-medium text-sm"> geetanjali nagar, shankar nagar </p>
                    </div>
                </div>
                <div className="p-2 bg-[#9eb8a2] rounded-md">
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode: 'payment',
                            amount: (amount * 100),
                            currency: 'usd',
                            appearance
                        }}
                    >
                        <Payment />
                    </Elements>
                </div>
            </div>
        </div>
    )
}