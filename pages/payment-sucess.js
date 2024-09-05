import { Kanit } from "next/font/google"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['300', '500', '600']
})

export default function PaymentSucess() {

    const restid = useSelector(state => state.restaurants.orderId)
    const accessToken = useSelector(state => state.signup.accessToken)
    console.log(restid)
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.put('/api/paymentUpdate', { restid }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    if (response.status === 200) {
                        console.log("everything went well")
                    } else {
                        console.log(response.data)
                    }
                } catch (err) {
                    console.log("error in payment-sucess", err)
                }
            }
        )()
    }, [])

    const [timer, setTimer] = useState(3);
    const router = useRouter()
    setTimeout(() => {
        if (timer >= 0) {
            setTimer(timer - 1)
        }
    }, 1000)

    if (timer === 0) {
        router.push('/cart')
    }

    return (
        <div className={`text-white text-semibold flex flex-col bg-[#b4c6b6] h-[100vh] justify-center items-center ${kanit.className}`}>
            <p className="text-2xl"> you just got served ! </p>
            <div>
                redirecting you in {timer}
            </div>
        </div>
    )
}