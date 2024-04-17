import { createOrder } from "../../prisma/UserCart";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { items, address, orderStatus, restaurantName, userId, orderTime, totalAmt } = req.body;
        try { 
            await createOrder(items, address, orderStatus, restaurantName, userId, orderTime, totalAmt);
            res.status(201).json('Items added to cart successfully');
        } catch (error) {
            console.error('Error adding items to cart:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
