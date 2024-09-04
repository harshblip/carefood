import prisma from "./prisma";

export const updatePaymentStatus = async (restid) => {
    await prisma.order.update({
        where: {
            id: restid
        },
        data: {
            orderStatus: 'paid'
        }
    })
}

export const getPaidOrders = async (email) => {
    const orders = await prisma.order.findMany({
        where: {
            userEmail: email,
            orderStatus: 'paid'
        },
        include: { items: true }
    })

    return orders
}