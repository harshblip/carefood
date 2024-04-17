import prisma from "./prisma";

export const createOrder = async (items, address, orderStatus, restaurantName, userId, orderTime, totalAmt) => {
    await prisma.order.create({
        data: {
            items: { createMany: { data: items } },
            address,
            orderStatus,
            restaurantName,
            user: { connect: { id: userId } },
            orderTime,
            totalAmt
        },
    });
}

export const getOrders = async (userId) => {
    const orders = await prisma.order.findMany({
        where: {
            userId: userId
        },
        include: { items: true },
    });
    return orders;
};

export const deleteOrder = async (orderId) => {
    await prisma.order.delete({
        where: { id: orderId },
    });
};

