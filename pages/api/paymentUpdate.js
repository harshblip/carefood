import { updatePaymentStatus, getPaidOrders } from "../../prisma/CartPayment";
import authMiddleware from "./middleware";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { restid } = req.body;
        try {
            const { message } = await authMiddleware(req, res)
            if (message === 'success') {
                await updatePaymentStatus(restid);
                res.status(200)
            }
        } catch (err) {
            console.log("error in paymentUpdate", err)
            res.status(500)
        }
    }
    if (req.method === 'GET') {
        const { userEmail } = req.query;
        try {
            const { message } = await authMiddleware(req, res)
            if (message === 'success') {
                const orders = await getPaidOrders(userEmail);
                res.status(200).json({ orders });
            }
        } catch (err) {
            res.status(500)
            console.log("error in GET paymentUpdate", err)
        }
    }
}
