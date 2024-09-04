import { updatePaymentStatus, getPaidOrders } from "../../prisma/CartPayment";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { restid } = req.body;
        try {
            await updatePaymentStatus(restid);
            res.status(200)
        } catch (err) {
            console.log("error in paymentUpdate", err)
            res.status(500)
        }
    }
    if (req.method === 'GET') {
        const { userEmail } = req.body;
        try {
            const orders = await getPaidOrders(userEmail);
            res.status(200).json({ orders });
        } catch (err) {
            res.status(500)
            console.log("error in GET paymentUpdate", err)
        }
    }
}
