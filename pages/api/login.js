import { loginUser } from "../../prisma/Userin";

export default async function handler(req, res) {
    console.log("ok")
    
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const { user, accessToken, refreshToken, status } = await loginUser(email, password);
            res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Secure; Max-Age=${60 * 60 * 24 * 7}; Path=/`);
            // 7 days
            res.status(200).json({ message: 'Logged in successfully', user, accessToken, refreshToken, status });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
