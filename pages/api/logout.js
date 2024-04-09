import { deleteTokenByUserEmail } from "../../prisma/Userout";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body();
            await deleteTokenByUserEmail(email);
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

