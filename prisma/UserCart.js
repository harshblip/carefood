import prisma from "./prisma";

export const createOrder = async (items, address, orderStatus, restaurantName, userEmail, orderTime, totalAmt) => {

    await prisma.order.create({
        data: {
            items: { createMany: { data: items } },
            address,
            orderStatus,
            restaurantName,
            user: { connect: { email: userEmail } },
            orderTime,
            totalAmt
        },
    });
}

export const getOrders = async (userEmail) => {
    const orders = await prisma.order.findMany({
        where: {
            userEmail: userEmail,
        },
        include: { items: true },
    });
    return orders;
};

export const deleteOrder = async (id, id2) => {
    await prisma.item.delete({
        where: {
            id: id2
        }
    });
};

export const updateOrder = async (id, id2, newQ) => {
    await prisma.order.update({
        where: {
            id: id
        },
        data: {
            items: {
                update: {
                    where: {
                        id: id2
                    },
                    data: {
                        quantity: newQ
                    }
                }
            }
        }
    })
}
