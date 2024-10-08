import { Kanit } from "next/font/google"
import { useEffect, useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import axios from "axios";
import { useSelector } from "react-redux";
import currencyConvert from "../utils/currencyConvert";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['300', '500', '600']
})

export default function Payment() {

    const amount = useSelector(state => state.restaurants.amount)
    // console.log("amm", amount)
    const accessToken = useSelector(state => state.signup.accessToken)
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (
            async () => {
                await axios.post('/api/create-payment-intent', { amount: currencyConvert(amount) }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }).then(res => console.log(setClientSecret(res.data.clientSecret))).catch(err => console.log(err))
            }
        )()

    }, [amount])

    async function handleSubmit() {
        setLoading(true);

        if (!stripe || !elements) {
            return
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'https://carefood-kohl.vercel.app/Payment-sucess'
            }
        })

        if (error) {
            setErrorMessage(error)
        }

        setLoading(false)

    }

    return (
        <div className="flex flex-col justify-center p-2 rounded-md bg-[#9eb8a2] h-[22rem]">
            <div className="p-4">
                {
                    !clientSecret || !elements || !stripe ? <p className={`${kanit.className} p-2 text-white text-semibold text-sm`}>  loading... </p> : <> <div>
                        {clientSecret && <PaymentElement
                            className="text-white"
                        />}
                        {
                            errorMessage && <div> {errorMessage} </div>
                        }
                    </div>
                        <div
                            className="bg-[#70956b] rounded-md mt-8 flex justify-center hover:cursor-pointer"
                            onClick={() => handleSubmit()}
                        >
                            <p className={`${kanit.className} p-2 text-white text-semibold text-sm`}>
                                {!loading ? 'Pay' : 'Processing...'}
                            </p>
                        </div> </>
                }

            </div>
        </div>
    )
}