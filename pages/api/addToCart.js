import { createOrder, getOrders, deleteOrder } from "../../prisma/UserCart";
import authMiddleware from "./middleware";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            items,
            address,
            orderStatus,
            restaurantName,
            email,
            orderTime,
            totalAmt
        } = req.body;
        try {
            await authMiddleware(req, res);
            await createOrder(items, address, orderStatus, restaurantName, email, orderTime, totalAmt);
            res.status(201).json('Items added to cart successfully');
        } catch (error) {
            console.error('Error adding items to cart:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        const { userEemail } = req.query;
        try {
            const orders = await getOrders(userEemail); // Fetch all orders from the database
            res.status(200).json({ orders });
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'DELETE') {
        const { orderId } = req.query;
        try {
            await deleteOrder(orderId); // Delete the order by ID
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
