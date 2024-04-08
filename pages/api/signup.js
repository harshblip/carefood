import { createUser } from "../../prisma/User";

export default async function handler(req, res) {
    // console.log(req.body);
    if (req.method == "POST") {
        const { name, email, password, city, phoneNumber, funFood } = req.body;
        try {
            const user = await createUser(name, email, password, city, phoneNumber, funFood);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Error creating user' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
