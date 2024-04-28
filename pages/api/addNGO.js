import { registerNGO, getNGOs } from "../../prisma/AddNGO";

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
    } else if (req.method === 'GET') {
        try {
            const ngos = await getNGOs(); // Fetch all registered ngos from the database
            res.status(200).json({ ngos });
        } catch (error) {
            console.error('Error fetching ngos:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}