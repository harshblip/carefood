
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { items, ngos, email, totalAmt, date } = req.body;
        try {
            const donation = await prisma.donatedfood.create({
                data: {
                    email, // Assuming user email is available in the request
                    totalAmt, // Total number of items donated
                    date,
                    ngos,
                    fooditems: {
                        createMany: {
                            data: items.map((food) => ({
                                name: food.name,
                                quantity: food.quantity,
                                price: food.price,
                            })),
                        },
                    },
                },
            });
            res.status(201).json({ message: 'Donation successful', donation });
        } catch (error) {
            console.error('Error donating:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

