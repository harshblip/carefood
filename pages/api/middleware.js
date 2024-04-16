import { checkUserByEmail } from "../../prisma/User";

const checkUser = async (req, res, next) => {
    const { email } = req.body;
    console.log("hi", email);
    if (req.method === 'POST') {
        try {
            const userExists = await checkUserByEmail(email);
            if (userExists) {
                console.log("exists");
                res.status(200).json({ redirectTo: '/cart' });
            } else {
                next();
            }
        } catch (error) {
            console.error('Error checking user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default checkUser;
