import { createOrder, getOrders, deleteOrder, updateOrder } from "../../prisma/UserCart";
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
        const { userEmail } = req.query;
        try {
            const orders = await getOrders(userEmail); // Fetch all orders from the database
            res.status(200).json({ orders });
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'DELETE') {
        const { id, id2, thing } = req.query;
        try {
            if (thing === 'item') {
                await deleteOrder(id, id2); // Delete the order by ID
            }
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'PUT') {
        const { id, id2, newQ } = req.body
        try {
            await updateOrder(id, id2, newQ);
            res.status(200).json({ message: `Order with id ${id} updated with ${newQ}` })
        } catch (err) {
            console.log("caught errr", err)
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
