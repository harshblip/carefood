import { createOrder, getOrders, deleteOrder, updateOrder, updateOrderonDelete, updateOrderonInc } from "../../prisma/UserCart";
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
            totalAmt,
            restId
        } = req.body;
        try {
            console.log("restiddd", restId)
            await authMiddleware(req, res);
            await createOrder(items, address, orderStatus, restaurantName, email, orderTime, totalAmt, restId);
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
        const { id, id2, thing, price } = req.query;
        try {
            if (thing === 'item') {
                await deleteOrder(id2);
            }
            await updateOrderonDelete(id, price)
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'PUT') {
        const { id, id2, newQ, price, x } = req.body
        try {
            if (x === 'minus') {
                await updateOrderonDelete(id, price);
            } else {
                await updateOrderonInc(id, price);
            }
            await updateOrder(id, id2, newQ, price);
            res.status(200).json({ message: `Order with id ${id} updated with ${newQ}` })
        } catch (err) {
            console.log("caught errr", err)
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
