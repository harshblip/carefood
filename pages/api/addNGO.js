import { registerNGO } from "../../prisma/AddNGO";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            name,
            directorName,
            address,
            email,
            city,
            description,
            workforce,
            phoneNumber
        } = req.body;
console.log(req.body)
        try {
            await registerNGO(
                name,
                directorName,
                address,
                email,
                city,
                description,
                workforce,
                phoneNumber
            );
            res.status(200).json({ message: 'registered successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}