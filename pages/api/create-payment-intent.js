const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function POST(req, res) {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            }
        })
        res.json({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
        console.log("errororr", err)
    }
}