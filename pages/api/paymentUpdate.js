import { updatePaymentStatus } from "../../prisma/CartPayment";

export default async function PUT(req, res) {
    const { restid } = req.body;

    try {
        await updatePaymentStatus(restid);
        res.status(200)
    } catch (err) {
        console.log("error in paymentUpdate", err)
        res.status(500)
    }
}